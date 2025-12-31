# Spur – AI-Powered Customer Support Chat

Spur ChatBot is a full-stack AI-powered customer support chat application built for an e-commerce brand use case.  
It features a modern chat UI, session-based conversations, Redis caching, PostgreSQL persistence, and pluggable LLM support.

Test it live : [Spur-Task/Vercel](https://spur-task.vercel.app/)

---

## Tech Stack

### Frontend

- **SvelteKit**
- **TypeScript**
- **Vite**
- **CSS (custom styles)**
- **Fetch API**

### Backend

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Redis**
- **Zod** (request validation)
- **Rate Limiting middleware**

### LLM Integration

- **Google Gemini API** (via REST)
- Pluggable design to swap LLM providers

---

## Project Structure

```
spur/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── routes/        # Express routes
│   │   │   ├── services/      # LLM + chat logic
│   │   │   ├── redis/         # Redis client & cache helpers
│   │   │   ├── config/        # Prompts, rate limiter, env config
│   │   │   ├── db/            # Prisma client
│   │   │   └── server.ts      # App entry point
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # Chat UI components
│       │   │   └── store/       # Svelte stores
│       │   ├── routes/
│       │   │   └── +page.svelte
│       │   └── app.html
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Features

- Real-time chat UI
- Session-based conversations
- Redis-backed message caching
- Persistent chat history in PostgreSQL
- Rate-limited API
- Configurable system prompt for AI behavior
- Clean separation between UI, API, and LLM logic

---

## Environment Variables

### Backend

```
PORT=4000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
LLM_API_KEY=your_gemini_api_key
```

### Frontend

```
VITE_API_BASE_URL=http://localhost:4000
```

---

## Running Locally (Without Docker)

### 1. Backend

```bash
cd apps/backend
yarn install
yarn prisma migrate dev
yarn dev
```

Backend runs on:  
`http://localhost:4000`

---

### 2. Frontend

```bash
cd apps/frontend
yarn install
yarn dev
```

Frontend runs on:  
`http://localhost:5173`

---

## Running with Docker

```bash
docker-compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Redis
- PostgreSQL

---

## API Overview

### POST `/chat/message`

Send a chat message and receive an AI response.

**Request**

```json
{
  "message": "Hello",
  "sessionId": "optional-session-id"
}
```

**Response**

```json
{
  "reply": "Hi there! How can I help?",
  "sessionId": "session-id"
}
```

---

## AI Behavior

The AI personality and behavior are controlled via a system prompt defined in:

```
apps/backend/src/config/support_prompt.ts
```

This allows easy customization of tone, policies, and brand voice.

---

## Future Improvements

- Streaming responses
- Authenticated user sessions
- Admin dashboard
- Chat analytics
- Multi-LLM fallback support

---

## License

MIT
