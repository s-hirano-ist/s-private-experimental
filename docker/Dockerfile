# build stage
FROM node:20.18.0-alpine@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9 AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only package.json, pnpm-lock.yaml, and prisma schema for installing dependencies
COPY package.json pnpm-lock.yaml prisma ./

# Install dependencies
RUN pnpm install

# Copy rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# run stage
FROM node:20.18.0-alpine@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9 AS runner

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the built application and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/prisma ./prisma

# FIXME: disable when dynamicParams enabled
COPY --from=builder /app/s-contents ./s-contents

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Expose port 3000
EXPOSE 3000

# Command to start the application
CMD ["pnpm", "start"]
