FROM node:20.17.0-alpine@sha256:2d07db07a2df6830718ae2a47db6fedce6745f5bcd174c398f2acdda90a11c03

RUN apk update && apk add --no-cache git curl jq openssh

COPY package.json pnpm-lock.yaml pr-mypage.ts create_mypage_pr.sh biome.json .npmrc .env /

RUN chmod +x /create_mypage_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}
ENV POSTGRES_URL=${POSTGRES_URL}

ENTRYPOINT ["sh", "/create_mypage_pr.sh"]
