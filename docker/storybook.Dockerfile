# build
FROM node:22.11.0-alpine@sha256:f265794478aa0b1a23d85a492c8311ed795bc527c3fe7e43453b3c872dcd71a3 AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install
COPY . .
RUN pnpm run storybook:build

# run
FROM httpd:2.4.62@sha256:6bdbdf5ac16ac3d6ef543a693fd5dfafae2428b4b0cdc52a480166603a069136 AS runner
COPY --from=builder /app/.storybook-static /usr/local/apache2/htdocs/
