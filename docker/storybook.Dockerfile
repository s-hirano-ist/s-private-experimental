# build
FROM node:20.18.0-alpine@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9 AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install
COPY . .
RUN pnpm run storybook:build

# run
FROM httpd:2.4.62@sha256:7204bce27072f97f244337ebe93c1dfc93d358d103beefc4107ee359d74d9148 AS runner
COPY --from=builder /app/.storybook-static /usr/local/apache2/htdocs/
