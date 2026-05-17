# Frontend Guard - Convention Analyzer

Frontend Guard is a powerful backend service that automatically analyzes frontend codebases for coding convention violations. By leveraging Abstract Syntax Trees (AST) and in-memory virtual file systems, it can efficiently pull repositories directly from GitHub and statically analyze the code for bad practices (e.g., leaving `console.log` statements in production code) without writing files to disk.

## Features

- **Direct GitHub Integration**: Ingests repositories directly via GitHub API.
- **In-Memory File System**: Uses `memfs` for lightning-fast, secure file operations without cluttering the local disk.
- **AST-Based Analysis**: Uses Babel to parse JavaScript/TypeScript files into ASTs for accurate code inspection.
- **Extensible Rule Engine**: Easily add new rules to enforce project-specific or standard conventions.
- **Express API**: Exposes the analysis engine through a RESTful API.

## Prerequisites

- **Node.js**: v20 or higher recommended.
- **npm**: v9 or higher.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "Frontend Guard/Backend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the development server (uses `nodemon` and `ts-node` for automatic restarts on file changes):

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Documentation

### Analyze Repository

Analyzes a specified GitHub repository for convention violations.

**Endpoint:** `/api/analyze`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body

| Field | Type   | Description | Example |
|-------|--------|-------------|---------|
| `url` | string | The full GitHub URL or `owner/repo` string. | `"https://github.com/arshad657/Product-Sourcing-Frontend-New"` |

#### Example Request

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/arshad657/Product-Sourcing-Frontend-New"}'
```

#### Example Response (Success)

```json
{
  "success": true,
  "owner": "arshad657",
  "repo": "Product-Sourcing-Frontend-New",
  "branch": "main",
  "violations": [
    {
      "file": "/repo/src/AdminPanel/AddProduct/ImageUploader.jsx",
      "line": 50,
      "column": 2,
      "message": "Avoid using console.log"
    }
  ]
}
```

#### Error Responses

- **400 Bad Request**: Missing URL or invalid URL format.
  ```json
  { "error": "Missing url parameter" }
  ```
- **500 Internal Server Error**: Failed to fetch or analyze the repository (e.g., repo doesn't exist or is private without token).
  ```json
  { "error": "Request failed with status code 404" }
  ```

## Project Structure (MVC Architecture)

- **`src/models/`**: Core logic including repository ingestion, AST parsing, and rule execution.
- **`src/controllers/`**: HTTP controllers that handle incoming requests and map them to model operations.
- **`src/routes/`**: Express route definitions mapping URLs to controller actions.
- **`src/rules/`**: Custom AST rules (like `no-console-log`).
- **`src/index.ts`**: The application entry point that initializes the Express server.
