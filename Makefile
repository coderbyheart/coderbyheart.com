.DEFAULT_GOAL := help
.PHONY: help deploy development build underline layout assets

help: ## (default), display the list of make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Helpers

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi

clean:
	rm -rf build

# Content

build/content.json: guard-CONTENTFUL_SPACE guard-CONTENTFUL_KEY
	@mkdir -p $(dir $@)
	node_modules/.bin/cswg sync -s $(CONTENTFUL_SPACE) -t $(CONTENTFUL_KEY) > $@

# Stylesheets

build/css/%.min.css: build/css/%.css
	node_modules/.bin/uglifycss $< > $@

build/css/%.css: src/scss/%.scss
	@mkdir -p $(dir $@)
	node_modules/.bin/node-sass $< $@

# HTML

build/templates: src/**/*.html node_modules/@coderbyheart/underline/templates/*.html node_modules/@coderbyheart/underline/templates/**/*.html
	@mkdir -p $@
	cp -r node_modules/@coderbyheart/underline/templates/* $@
	cp -r src/* $@

build/fonts:
	@mkdir -p $@
	cp node_modules/@coderbyheart/underline/dist/fonts/* $@

assets:
	cp assets/* build/

build/js/underline.min.js: node_modules/@coderbyheart/underline/dist/underline.min.js
	@mkdir -p $(dir $@)
	cp $< $@

underline: build/css/underline.min.css build/fonts build/templates build/js/underline.min.js

# MAIN

VERSION ?= $(shell npm view @coderbyheart/coderbyheart.com version)
ENVIRONMENT ?= development

build: build/content.json layout assets ## Build for production environment

layout: build/templates underline guard-CONTENTFUL_LOCALE
ifeq ($(ENVIRONMENT),production)
	node_modules/.bin/cswg build -c build/content.json -v $(VERSION) -l $(CONTENTFUL_LOCALE) -e $(ENVIRONMENT) -t build/templates -m
else
	node_modules/.bin/cswg build -c build/content.json -v $(VERSION) -l $(CONTENTFUL_LOCALE) -e $(ENVIRONMENT) -t build/templates
endif

# DEPLOY

AWS_BUCKET ?= "coderbyheart.com"
AWS_REGION ?= "eu-central-1"
S3_CFG := /tmp/.s3cfg-$(AWS_BUCKET)

deploy: guard-AWS_ACCESS_KEY_ID guard-AWS_SECRET_ACCESS_KEY ## Deploy to AWS S3
	# Create s3cmd config
	@echo $(S3_CFG)
	@echo "[default]" > $(S3_CFG)
	@echo "access_key = $(AWS_ACCESS_KEY_ID)" >> $(S3_CFG)
	@echo "secret_key = $(AWS_SECRET_ACCESS_KEY)" >> $(S3_CFG)
	@echo "bucket_location = $(AWS_REGION)" >> $(S3_CFG)

	# Create bucket if not exists
	@if [[ `s3cmd -c $(S3_CFG) ls | grep s3://$(AWS_BUCKET) | wc -l` -eq 1 ]]; then \
		echo "Bucket exists"; \
	else \
		s3cmd -c $(S3_CFG) mb s3://$(AWS_BUCKET); \
		s3cmd -c $(S3_CFG) ws-create s3://$(AWS_BUCKET)/ --ws-index=index.html --ws-error=404.html; \
	fi

	# Upload
	s3cmd -c $(S3_CFG) \
		sync -P -M --no-mime-magic --delete-removed ./build/ s3://$(AWS_BUCKET)/
	# Expires 10 minutes for html files
	s3cmd -c $(S3_CFG) \
		modify --recursive \
		--add-header=Cache-Control:public,max-age=600 \
		--remove-header=Expires \
		--add-header=x-amz-meta-version:$(VERSION) \
		--exclude "*" --include "*.html" --include "*.xml" --include "*.txt" \
		s3://$(AWS_BUCKET)/

	# Expires 1 year for everything else
	s3cmd -c $(S3_CFG) \
		modify --recursive \
		--add-header=Cache-Control:public,max-age=31536000 \
		--remove-header=Expires \
		--add-header=x-amz-meta-version:$(VERSION) \
		--exclude "*.html" --exclude "*.xml" --exclude "*.txt" \
		s3://$(AWS_BUCKET)/
