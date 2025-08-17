# CookTogether Server

Backend for the Community Recipe Platform. Mirrors patterns from `voosh_music_api` (validators, centralized error/response, dynamic routing).

## Stack
- Node.js + Express
- Sequelize ORM + SQLite storage
- JWT auth, bcrypt password hashing
- Joi validation

## Getting Started
1. Create `.env` (keys below)
2. Install deps: `npm i`
3. Seed DB with sample data: `npm run seed`
4. Start server: `npm run start` (default `http://localhost:4000`)

### Environment variables
- `PORT` (default 4000)
- `DB_FILE` (default `cooktogether.sqlite`)
- `JWT_SECRET` (required)
- `API_PREFIX` (default `/api/v1`)
- `CORS_ORIGIN` (default `*`)

## Folder structure
- `src/app.js` Express app, CORS, JSON body, routes, error handler
- `src/server.js` DB sync and HTTP server start
- `src/routes/` dynamic route loader and route files
- `src/controllers/` request handlers
- `src/services/` business logic
- `src/middlewares/` `authMiddleware`, `validate`, `errorHandler`
- `src/validators/` Joi schemas
- `src/db/` Sequelize instance, models, associations
- `src/utilities/` `ApiError`, `ApiResponse`, `jwtUtils`, `bcryptUtils`
- `seed/seed.js` reset DB and insert sample users/recipes

## Conventions
- Centralized response shape via `ApiResponse`:
  - `{ status, data, message, error }`
- Errors thrown as `ApiError` and handled centrally by `errorHandler`
- Auth via `Authorization: Bearer <token>`
- Route-level validation via `validate(schema)` using Joi

## Data models (simplified)
- `User`: `user_id`, `name`, `email`, `password`, `created_at`, `is_active`
- `Recipe`: `recipe_id`, `author_id`, `title`, `description`, `image_url`, `prep_time`, `cook_time`, `ingredients[]`, `instructions[]`, `average_rating`, `total_ratings`, `created_at`
- `Rating`: per-user per-recipe unique rating `1..5`
- `SavedRecipe`: many-to-many between users and recipes (unique per pair)

## Endpoints
Base prefix: `${API_PREFIX}` (default `/api/v1`)

### Health
- GET `/health`
  - Returns `{ status: "ok" }`

### Auth
- POST `/auth/register`
  - Body: `{ name, email, password }`
  - 201 on success
- POST `/auth/login`
  - Body: `{ email, password }`
  - 200 with `{ token }`

### Recipes
- GET `/recipes`
  - Query: `query` (matches title OR ingredients), `page` (default 1), `limit` (default 10, max 50)
  - Sorted by `average_rating DESC, created_at DESC`
  - Response: `{ recipes: [...], total }`
- POST `/recipes` (auth)
  - Body: `{ title, description?, image_url?, prep_time?, cook_time?, ingredients[], instructions[] }`
  - 201 with created recipe
- GET `/recipes/:id`
  - 200 with recipe
- POST `/recipes/:id/rate` (auth)
  - Body: `{ rating: 1..5 }`
  - Upserts user’s rating, updates `average_rating` and `total_ratings`
- POST `/recipes/:id/save` (auth)
  - Toggles bookmark; returns `{ saved: true|false }`

### Users
- GET `/users/me/saved` (auth)
  - User’s bookmarked recipes
- GET `/users/me/recipes` (auth)
  - Recipes authored by current user

## Search & Pagination
- `query` searches title and ingredients. Ingredients are stored as JSON array; search does a substring match on the serialized value.
- Pagination via `page` and `limit`; response includes `total` for client pagination.

## Sample requests
Login and fetch recipes:
```bash
curl -s -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  --data '{"email":"alice@example.com","password":"password123"}'

curl -s http://localhost:4000/api/v1/recipes?query=chicken&page=1&limit=10
```
Create, rate, and save a recipe:
```bash
TOKEN=... # from login
curl -s -X POST http://localhost:4000/api/v1/recipes \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  --data '{"title":"Paneer Tikka","ingredients":["paneer","yogurt"],"instructions":["Marinate","Grill"]}'

curl -s -X POST http://localhost:4000/api/v1/recipes/<id>/rate \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  --data '{"rating":5}'

curl -s -X POST http://localhost:4000/api/v1/recipes/<id>/save \
  -H "Authorization: Bearer $TOKEN"
```

## Seeding
- `npm run seed` resets schema and inserts:
  - Users: Alice, Bob (password: `password123`)
  - Recipes: Classic Chicken Curry, Creamy Tomato Pasta

## Notes
- Image handling is URL-based for now; can be extended to file uploads later
- CORS is open (`*`) by default to simplify local testing