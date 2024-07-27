#!/bin/bash

echo Remember to make sure terraform as applied before running this script

npm run build
aws s3 rm s3://amassador-amassadinho.petersonv.click --recursive
aws s3 cp --recursive ./dist s3://amassador-amassadinho.petersonv.click
aws cloudfront create-invalidation --distribution-id E2BM8XOLWRIBJ6 --paths "/*"
