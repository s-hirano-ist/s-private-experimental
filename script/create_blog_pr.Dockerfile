FROM node:20.17.0-alpine

RUN apk update && apk add --no-cache git curl jq openssh

COPY package.json pnpm-lock.yaml pr-blog.ts create_blog_pr.sh biome.json .npmrc .env /

RUN chmod +x /create_blog_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}
ENV POSTGRES_URL=${POSTGRES_URL}

ENTRYPOINT ["sh", "/create_blog_pr.sh"]
