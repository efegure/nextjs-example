# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn install --production

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma
RUN yarn build

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./
COPY --from=builder /app/.next ./
COPY --from=builder /app/public ./
COPY --from=builder /app/prisma ./

ENV NODE_ENV production
EXPOSE 3000
CMD ["yarn", "start"]