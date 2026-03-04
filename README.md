# 📘 Posts & Comments – Frontend

Frontend application built with **Angular** to manage Posts and Comments.
This project consumes a REST API built with NestJS.

---

## 🚀 Tech Stack

| Technology | Description |
|---|---|
| Angular (Standalone Components) | Main framework |
| TypeScript | Typed JavaScript |
| RxJS | Reactive programming |
| Angular Signals | State management |
| SweetAlert2 | Alert dialogs |
| TailwindCSS | Utility-first styling |
| REST API | NestJS backend integration |

---

## 📂 Project Structure

```
src/app/
├── core/
│   ├── interceptors/
│   ├── services/
│   └── utils/
├── shared/
│   ├── components/
│   ├── pipes/
│   └── directives/
├── features/
│   └── posts/
│       ├── pages/
│       ├── components/
│       └── services/
└── app.routes.ts
```

- **`features/`** → Domain-specific modules (Posts)
- **`shared/`** → Reusable components (Table, Pagination, etc.)
- **`core/`** → Global services, interceptors and utilities
- Standalone components architecture (no NgModules)

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mariaalexaBR/posts-comments-frontend.git
cd posts-comments-frontend/angular-comments-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Requisitos previos

Asegúrate de tener instalado:

- **Node.js** v18 o superior → [https://nodejs.org](https://nodejs.org)
- **Angular CLI**

Verificar Node y npm:

```bash
node -v
npm -v
```

Instalar Angular CLI de forma global:

```bash
npm install -g @angular/cli
```

Verificar la instalación de Angular CLI:

```bash
ng version
```

### 4️⃣ Levantar el servidor de desarrollo

```bash
ng serve
```

App will run on: **http://localhost:4200**

---

## 🌐 API Configuration

This frontend expects the backend API running at:

```
http://localhost:3000/api
```

> Make sure the NestJS backend is up and running before launching the frontend.

---

## 👩‍💻 Author

Developed by **Alexandra Brenes**
