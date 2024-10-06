# build
FROM node:20.17.0-alpine@sha256:2d07db07a2df6830718ae2a47db6fedce6745f5bcd174c398f2acdda90a11c03 AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install
COPY . .
RUN pnpm run storybook:build

# run
FROM httpd:2.4.62@sha256:7204bce27072f97f244337ebe93c1dfc93d358d103beefc4107ee359d74d9148 AS runner
COPY --from=builder /app/.storybook-static /usr/local/apache2/htdocs/
