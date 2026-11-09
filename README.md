# KOA Game Server

A Node.js backend prototype for a multiplayer strategy game. It combines an Express API, PostgreSQL persistence through Prisma, and Socket.IO events for alliance chat and player notifications.

The [KOA Game Client](https://github.com/King1121-sudo/koa-client) provides the companion React interface.

**Status:** Early prototype. Game modules and routes are implemented, with known dependency and authentication issues to resolve before the complete client/server flow can run.

## Features

- Player registration, password hashing, and JWT login routes.
- Player profiles, buildings, troop training, and alliance membership routes.
- Generated 100 × 100 terrain map with resource tiles.
- Distance-based troop marches and battle resolution.
- Alliance chat rooms and player notifications through Socket.IO.
- Prisma models for players, buildings, troops, marches, alliances, and membership.

## Stack

JavaScript · Node.js · Express 5 · PostgreSQL · Prisma 5 · Socket.IO 4 · JSON Web Tokens

## Local development

Use a current Node.js LTS release, npm, and a local PostgreSQL database dedicated to this prototype.

```bash
git clone https://github.com/King1121-sudo/koa-mmo-server.git
cd koa-mmo-server
npm ci
```

Create a `.env` file in the repository root:

```dotenv
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/koa_game?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
```

Replace the database credentials and secret with your local values. `.env` is excluded by `.gitignore`.

The current source imports `bcryptjs`, while `package.json` declares `bcrypt`. A local workaround is:

```bash
npm install bcryptjs
```

This command changes your local dependency manifests. The repository still needs a dependency fix. It also needs the JWT claim mismatch corrected: `authController.js` signs `playerId`, while `middleware/auth.js` reads `decoded.id`. Align those names before using authenticated routes.

Generate the Prisma client, apply the checked-in migration to your dedicated local database, and start the server:

```bash
npx prisma generate
npx prisma migrate deploy
node src/server.js
```

The server listens on `http://localhost:3000`. `GET /` returns `KOA MMO Server Running`. There is currently no `npm start` or `npm run dev` script.

## API overview

| Route group | Purpose |
| --- | --- |
| `/auth` | Registration and login |
| `/player` | Player profiles |
| `/building` | Building creation and upgrades |
| `/troop` | Troop training and queries |
| `/map` | World map |
| `/march` | March creation and queries |
| `/alliance` | Alliance creation, membership, and members |
| `/battle` | Battle endpoints |

`POST /auth/register` and `POST /auth/login` accept `username` and `password` as JSON. Login returns a token; authenticated routes expect `Authorization: Bearer <token>` after the JWT claim issue is fixed.

## Project structure

- `src/server.js` — Express, HTTP server, route groups, and sockets.
- `src/controllers/` and `src/routes/` — API request handling.
- `src/game/` — world map, marches, battles, and resource logic.
- `src/services/` — player, troop, and battle helpers.
- `src/sockets/` — alliance rooms and player notifications.
- `prisma/` — PostgreSQL schema and migrations.

## Current limitations

- Dependency and JWT claim mismatches block a clean authenticated setup.
- Socket room joins do not verify player identity or alliance membership; CORS allows all origins. Additional authorization and validation are needed before deployment.
- March completion uses in-process timers, so scheduled work does not survive a server restart. The generated world map is held in memory.
- No automated test suite is included; `npm test` is a placeholder that exits with failure.
- The companion client uses fixed local URLs, alliance ID `1`, and attack troop values. A complete playable game requires further integration work.

## Related project

[KOA Game Client](https://github.com/King1121-sudo/koa-client) implements the React map, attack controls, alliance chat, and notifications.
