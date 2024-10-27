#!/bin/sh

# TODO: validation of tags and error handling
# https://github.com/s-hirano-ist/s-private/pull/532/files#r1818017319
# https://github.com/s-hirano-ist/s-private/issues/537

if [ -z "$1" ]; then
  echo "使い方: $0 <タグ>"
  exit 1
fi

TAG=$1

docker build -t s0hirano/s-private:$TAG -f docker/Dockerfile .
docker push s0hirano/s-private:$TAG
