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
- Run `docker compose up -d` (Only the first time you start the project)

This command create a local volumen in root project to save data.

**Important**: If you don't need Postgres from Docker, set your configuration into `.env`

Run `yarn db:seed` to create database schema in your Postgres database and create initial data

Run `yarn dev`

If your want to create build production, run `yarn build`

**Important**: If you want to re create database schema, run `yarn prisma:db`

## My process

### Built with

- Node
- Typescript
- Express
- Prisma
- bcryptjs
- jsonwebtoken
- winston

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

- Join cities to create different routes
- Same origin and destination with different routes (Sierra or Costa for example)
- Add round trips

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkedIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
