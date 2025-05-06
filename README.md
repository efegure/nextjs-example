This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage with docker

docker compose -f docker-compose.dev.yaml up --build

## For seeding db with data(open another terminal while docker is running):

docker-compose -f docker-compose.dev.yaml exec nextjs yarn seed

## .env file example:

APP_PORT=...
DATABASE_USER=...
DATABASE_PASSWORD=...
DATABASE_NAME=...
DATABASE_URL=...
