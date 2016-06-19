.DEFAULT_GOAL := help
.PHONY: help build

build: build/css/styles.min.css build/js/script.min.js build/index.html build/favicon.ico build/robots.txt build/images ## Build for production environment

build/js:
	mkdir -p build/js

build/js/script.js: package.json build/js js/*.js
	./node_modules/.bin/browserify js/script.js -o $@

build/js/script.min.js: build/js/script.js
	./node_modules/.bin/uglifyjs build/js/script.js -o $@

build/css:
	mkdir -p build/css

build/css/styles.css: scss/*.scss build/fonts
	./node_modules/.bin/node-sass scss/styles.scss $@

build/fonts: node_modules/font-awesome/fonts/*.*
	mkdir -p build/fonts
	cp -u node_modules/font-awesome/fonts/*.* build/fonts/

build/css/styles.min.css: build/css build/css/styles.css
ifeq ($(ENVIRONMENT),development)
	cp -u build/css/styles.css $@
else
	./node_modules/.bin/uglifycss build/css/styles.css > $@
endif

build/index.html: index.html
	cp -u index.html build/

build/robots.txt: robots.txt
	cp robots.txt build/

build/images: images/*.*
	mkdir -p build/images
	cp -u -r images/* build/images/

build/favicon.ico: favicon.ico
	cp -u favicon.ico build/

help: ## (default), display the list of make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
