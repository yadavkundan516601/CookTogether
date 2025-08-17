# CookTogether

A simple community recipe platform.

## Backend (server)

- Tech: Node.js, Express, Sequelize, SQLite
- Start:
  1. Create `.env` in `server/` using the keys from `.env.example` and set `JWT_SECRET`
  2. Install deps: `cd server && npm i`
  3. Seed sample data: `npm run seed`
  4. Run dev: `npm run dev`

## API

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/recipes?query=chicken&page=1&limit=10`
- POST `/api/v1/recipes`
- GET `/api/v1/recipes/:id`
- POST `/api/v1/recipes/:id/rate`
- POST `/api/v1/recipes/:id/save`
- GET `/api/v1/users/me/saved`
- GET `/api/v1/users/me/recipes`

Auth required for create/rate/save and user endpoints. Use `Authorization: Bearer <token>`.

## Frontend (client)

- Tech: React + Vite, plain CSS
- Start:
  1. Install deps: `cd client && npm i`
  2. Run dev: `npm run dev` (default `http://localhost:5173`)
  3. API proxy: `/api` → `http://localhost:4000` (configure in `client/vite.config.ts`)

## Challenges and decisions
- Search in SQLite with ingredients as JSON: used substring match on JSON-serialized array for simplicity. For scale, consider FTS tables or normalized ingredient table.
- Token blacklist (logout) omitted to keep auth simple per requirements; can be added with Redis or TTL lists.
- Images: URL-based only; added skeleton loading + emoji placeholder to handle slow/missing images. File uploads can be added later.
- UI: community skew 40–65 → emphasized clarity, larger tap targets, strong contrast, and a dark mode toggle.

## Screenshots

### Web (Light)
![Home - Light](/images/home.png)
![Detail - Light](/images/details.png)
![Add Recipe - Light](/images/add-reciepie.png)