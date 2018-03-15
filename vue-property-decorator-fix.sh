#!/usr/bin/env bash

DIR=`pwd` 
cd ..
git clone https://github.com/kaorun343/vue-property-decorator
cd vue-property-decorator
npm install
npm build
cp -rf lib/* $DIR/node_modules/
