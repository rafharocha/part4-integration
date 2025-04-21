# Tax Document Processing API (Part 4)

https://part4-integration.vercel.app

A Node.js/TypeScript API for semantic search (RAG) and AI classification (KAG) of tax documents, integrated with Supabase and OpenAI.

## 🔍 Features

- **Document Search**: Semantic similarity using Supabase pgvector
- **Document Classification**: AI-powered categorization (W-2, 1099, etc.)
- **JWT Authentication**: Secure endpoints with role-based access
- **Real-time Processing**: Webhook integration with N8N workflows

## 🛠 Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase (PostgreSQL + pgvector)
- **AI Models**: OpenAI Embeddings, Custom classification
- **Deployment**: Vercel (Serverless Functions)
- **Testing**: Jest, Supertest

## 📦 Project Structure
tax-api-part4/
├── src/
│ ├── app.ts # Express configuration
│ ├── server.ts # Entry point
│ ├── routes/ # API endpoints
│ │ ├── search.ts # RAG implementation
│ │ ├── classify.ts # KAG classification
│ ├── services/
│ │ ├── supabase.ts # DB client
│ │ ├── embedding.ts # OpenAI embeddings
│ ├── types/ # Type declarations
├── tests/ # Integration tests
├── docs/
│ ├── swagger.yaml # OpenAPI 3.0 spec
│ ├── postman.json # Postman collection
├── .env.example # Environment template
├── package.json
└── tsconfig.json


## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- OpenAI API key

### Installation
```bash
git clone https://github.com/rafharocha/part4-integration.git
cd tax-api-part4
npm install
cp .env.example .env

##Configuration
##Edit 
.env:
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
OPENAI_KEY=sk-your-key
JWT_SECRET=your-random-secret