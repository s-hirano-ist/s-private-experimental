# build
FROM node:20.17.0-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install
COPY . .
RUN pnpm run storybook:build

# run
FROM httpd:2.4.62 AS runner
COPY --from=builder /app/.storybook-static /usr/local/apache2/htdocs/
