# Trip Tempo Server

...

## Installation

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-triptempo-server.git
```

Install dependencies

```bash
yarn
```

Clone `.env.template` file and rename to `.env`.

Replace your environment variables in `.env` file

## Running the app

If you need local Postgres database

- Install docker
- Run `docker compose up -d` This command create a local volumen in root project to save data.

**Important**: If you don't need Postgres from Docker, set your configuration into `.env`

Run `npx prisma migrate dev --name init` to create a migrations and schema in your Postgres database

Run `npx prisma db push` to create tables and relationships

Run `yarn dev`

If your want to create build production, run `yarn build`

## My process

### Built with

- Node
- Typescript
- Express
- Prisma

### What I learned

- Environment variables
- Single Page Application + Frontend Router
- Serve differents files
- Configure routes and controllers
- DTOs pattern
- Repository Pattern
- Clean Architecture
- Use cases
- Autentication using tokens
- Pagination
- Error handlers

## Development Features

- Clean Architecture

## Improves

-

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
