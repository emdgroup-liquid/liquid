#!/usr/bin/env bash

for i in dist/css/*.css;do cat $i >> dist/css/liquid.css;done
