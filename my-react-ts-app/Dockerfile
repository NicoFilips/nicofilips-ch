# Build stage
FROM node:24.18.0-alpine AS build

RUN npm install -g pnpm@10

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage
FROM node:24.18.0-alpine AS production

RUN npm install -g pnpm@10

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

USER appuser

EXPOSE 3000

CMD ["pnpm", "run", "preview", "--host", "--port", "3000"]
