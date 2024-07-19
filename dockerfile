FROM node:18-slim AS base

# 1. Install dependencies only when needed
FROM base AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm install

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
RUN yarn run build

ENV NODE_ENV=production

RUN addgroup --gid 1003 --system nodejs
RUN adduser --system --uid 1003 vitejs

USER vitejs:nodejs

EXPOSE 4173

ENV PORT 4173
ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "run", "preview"]