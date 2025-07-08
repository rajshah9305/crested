# Cerebras Studio – AI Creative Platform

Cerebras Studio is a modern, full-stack AI creative platform that empowers users to generate text, code, analyze documents, and craft stories using specialized AI studios. The platform features a beautiful, professional UI and a robust backend, making it ideal for creative professionals, developers, and enterprises.

## Features
- **Text Generation Studio**: Create compelling content and copy.
- **Code Generation Studio**: Generate and optimize code.
- **Document AI Studio**: Analyze and process documents.
- **Creative Writing Studio**: Craft stories, scripts, and creative content.
- **Project Management**: Organize and track your creative projects.
- **Analytics Dashboard**: Visualize usage, performance, and growth.
- **API Key Management**: Securely manage your API keys.
- **Responsive Design**: Works seamlessly on desktop and mobile.

## Tech Stack
- **Frontend**: React (TypeScript, Wouter, Framer Motion, Tailwind CSS)
- **Backend**: Vercel Serverless Functions (Node.js/TypeScript)
- **Database**: Drizzle ORM (PostgreSQL or in-memory for dev)

## Getting Started (Local)

### 1. Clone the Repository
```bash
git clone https://github.com/rajshah9305/crested.git
cd crested
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment (Optional)
- By default, the app uses in-memory storage for development.
- To use PostgreSQL, set the `DATABASE_URL` environment variable in a `.env` file:
  ```env
  DATABASE_URL=postgres://user:password@host:port/dbname
  ```

### 4. Run the Development Server
```bash
npm run dev
```
- The app will be available at [http://localhost:5001](http://localhost:5001)

### 5. Build for Production
```bash
npm run build
npm run start
```

## Deploying to Vercel

1. **Push your code to GitHub.**
2. **Go to [vercel.com](https://vercel.com) and import your GitHub repo.**
3. **Set the project root to `/client` for the frontend.**
4. **Vercel will automatically detect the `/api` directory for serverless functions.**
5. **Set up environment variables (e.g., `DATABASE_URL`) in the Vercel dashboard if needed.**
6. **Add a `vercel.json` file for custom rewrites (already included).**
7. **Deploy!**

- All frontend routes are handled by the React app.
- All backend API routes are handled by Vercel serverless functions in `/api`.

## Usage
- Open your browser and navigate to your Vercel deployment URL.
- Configure your API key via the UI to access AI features.
- Explore the studios, create projects, and view analytics.

## Troubleshooting
- If you see an error like `EADDRINUSE: address already in use`, another process is using the port. Either stop that process or change the port in `server/index.ts` (for local dev only).
- If you see a `TypeError [ERR_INVALID_ARG_TYPE]` related to `path.resolve`, ensure all necessary files (like `client/index.html`) exist and that you are running the server from the project root.

## Folder Structure
- `client/` – Frontend React app
- `api/` – Vercel serverless backend endpoints
- `server/` – Legacy backend logic and storage (shared logic is imported by serverless functions)
- `shared/` – Shared types and schema

## License
MIT 