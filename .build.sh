#! /usr/bin/env bash

# Set abort on error
set -e

# Install deps
bundle install --path .bundle

# Build site
rm -rf "${TARGET_DIR:-_site}"/*
bundle exec jekyll build -d "${TARGET_DIR:-_site}" --config _config.yml

