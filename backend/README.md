# 🌸 Sakhi Backend API

This directory hosts the Node.js / Express backend service powering Sakhi's real-time AI endpoints, therapist counseling sessions, and safety dispatching.

---

## 📌 Architecture & Modules

- **`server.js`**: Core Express REST API server with Google Gemini AI integration (`@google/genai`).
  - `POST /api/therapist`: Dr. Maya AI counseling therapist (gentle somatic grounding, validation, and mental wellness).
  - `POST /api/companion`: Sakhi Sisterhood companion chatbot (period questions, safety advice, daily check-ins).
  - `GET /api/health`: Health status probe for monitoring.
- **`server.ts`**: TypeScript alternative server configuration with typed request/response handlers.
- **`api/`**: Serverless edge handler functions for Vercel/Netlify cloud deployments.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3001`.
