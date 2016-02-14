#! /usr/bin/env bash

# Set abort on error
set -e

# Build site
rm -rf "${TARGET_DIR:-_site}"/*
jekyll build -d "${TARGET_DIR:-_site}" --config _config.yml

