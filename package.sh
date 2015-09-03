#!/bin/bash

rm -r tmp
mkdir tmp
cp main.js tmp
cp story_time.js tmp
cp jquery.js tmp
cp manifest.json tmp
zip -r -X story_time.zip tmp
rm -r tmp
