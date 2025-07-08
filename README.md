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
- **Backend**: Node.js, Express, TypeScript
- **Database**: Drizzle ORM (PostgreSQL or in-memory for dev)

## Getting Started

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

## Usage
- Open your browser and navigate to [http://localhost:5001](http://localhost:5001)
- Configure your API key via the UI to access AI features.
- Explore the studios, create projects, and view analytics.

## Troubleshooting
- If you see an error like `EADDRINUSE: address already in use`, another process is using the port. Either stop that process or change the port in `server/index.ts`.
- If you see a `TypeError [ERR_INVALID_ARG_TYPE]` related to `path.resolve`, ensure all necessary files (like `client/index.html`) exist and that you are running the server from the project root.

## Folder Structure
- `client/` – Frontend React app
- `server/` – Backend API and storage
- `shared/` – Shared types and schema

## License
MIT 