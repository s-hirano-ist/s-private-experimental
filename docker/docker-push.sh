if [ -z "$1" ]; then
  echo "usage: $0 <tag>"
  exit 1
fi

if ! echo "$1" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "error: Tags must have a format of x.x.x.（e.g.: 1.0.0）"
  exit 1
fi

if ! docker info > /dev/null 2>&1; then
  echo "error: No docker deamon ready."
  exit 1
fi

if ! docker info | grep -q "Username
: s0hirano"; then
  echo "error: You are not logged in to Docker Hub. Please run 'docker login.'"
  exit 1
fi

TAG=$1

echo "Start building image..."
 docker build -t s0hirano/s-private:$TAG -f docker/Dockerfile . || {
  echo "error: Failed to build image."
  exit 1
}

echo "Start pushing image..."
 docker push s0hirano/s-private:$TAG || {
  echo "error: Failed to push image."
  exit 1
}

echo "success: Successfully pushed image s0hirano/s-private:${TAG}."
