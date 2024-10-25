#!/bin/sh

if [ -z "$1" ]; then
  echo "使い方: $0 <タグ>"
  exit 1
fi

TAG=$1

docker build -t s0hirano/s-private:$TAG -f docker/Dockerfile .
docker push s0hirano/s-private:$TAG
