# Wise-Style Developer Documentation Portal (Scalar)

This repository contains a full developer portal with narrative guides and an interactive OpenAPI reference built with **Scalar**.

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:5073` (or the port shown in your terminal).

---

## Commands

- `npm run dev` — Start the local development server with hot-reloading.
- `npm run build` — Build static production bundle into `./dist`.
- `npm run preview` — Preview the built static output locally.

---

## Directory Structure

```text
.
├── package.json         # Project dependencies & scripts
├── scalar.config.json   # Navigation & Scalar configuration
├── openapi.yaml         # OpenAPI spec with Auth schemes
├── README.md            # Quickstart instructions
└── guides/              # Markdown guides
    ├── index.md
    ├── getting-started.md
    ├── authentication.md
    └── webhooks.md
```
# api_developer_doc
