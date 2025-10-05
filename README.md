RecipeBook

Overview

RecipeBook is a full-stack web application for creating, managing, and browsing recipes. Built with Next.js, TypeScript, GraphQL, and Prisma.

This Web app allows users to organize their recipes, store ingredients and preparation steps, and fetch them easily via a GraphQL API.

Features
	•	Add, update, and delete recipes
	•	Search recipes by name or ingredient
	•	Persistent storage powered by Prisma and a database backend
	•	Next.js frontend for fast, modern UI
	•	GraphQL API for flexible queries and mutations
	•	Configured with TypeScript, ESLint, and PostCSS for clean, maintainable code

Tech Stack
	•	Frontend: Next.js (React + TypeScript)
	•	Backend: GraphQL API
	•	Database: Prisma ORM
	•	Build Tools: Babel, PostCSS
	•	Deployment Ready: Easily deployable on Vercel, Netlify, or Node.js environments

Installation & Setup
1.	Clone the repository: 
git clone https://github.com/your-username/recipebook.git
2.	Install dependencies:
npm install
3.	Set up environment variables:
Create a .env file in the root directory and configure your database connection and any required secrets. Example:
DATABASE_URL="postgresql://user:password@localhost:5432/recipebook"
4. Run Database migrations
npx prisma migrate dev
5. Start the Development Server:
npm run dev