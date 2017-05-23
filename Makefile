.DEFAULT_GOAL := help
.PHONY: help deploy development build underline layout

help: ## (default), display the list of make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Helpers

guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi

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

# JavaScript

build/js/%.min.js: build/js/%.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/uglifyjs $< -o $@

build/js/%.js: src/js/%.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/browserify $< -o $@ -t [ babelify ]

# HTML

build/templates: src/**/*.html node_modules/@coderbyheart/underline/templates/*.html node_modules/@coderbyheart/underline/templates/**/*.html
	@mkdir -p $@
	cp -r node_modules/@coderbyheart/underline/templates/* $@
	cp -r src/* $@

build/fonts:
	@mkdir -p $@
	cp node_modules/@coderbyheart/underline/dist/fonts/* $@

build/js/coderbyheart.min.js: build/js/coderbyheart.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/uglifyjs $< -o $@

build/coderbyheart.js: src/coderbyheart.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/browserify $< -o $@ -t [ babelify ]

underline: build/css/underline.min.css build/js/coderbyheart.min.js build/fonts build/templates

# DEPLOY

clean:
	rm -rf build

# MAIN

VERSION ?= $(shell node -e "process.stdout.write(require('./package.json').version)")
DEPLOY_TIME ?= $(shell date +%s)
ENVIRONMENT ?= development

build: build/content.json layout build/js/coderbyheart.min.js guard-CONTENTFUL_LOCALE ## Build for production environment

layout: build/templates underline
ifeq ($(ENVIRONMENT),production)
	node_modules/.bin/cswg build -c build/content.json -v $(VERSION) -l $(CONTENTFUL_LOCALE) -e $(ENVIRONMENT) -t build/templates -m
else
	node_modules/.bin/cswg build -c build/content.json -v $(VERSION) -l $(CONTENTFUL_LOCALE) -e $(ENVIRONMENT) -t build/templates
endif
