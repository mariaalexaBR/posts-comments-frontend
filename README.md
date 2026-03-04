# 📘 Posts & Comments – Frontend

Aplicación frontend desarrollada con **Angular** para la gestión de Posts y Comments.
Este proyecto consume una API REST desarrollada con NestJS.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Descripción |
|---|---|
| Angular (Standalone Components) | Framework principal |
| TypeScript | JavaScript tipado |
| RxJS | Programación reactiva |
| Angular Signals | Manejo de estado |
| SweetAlert2 | Alertas y diálogos |
| TailwindCSS | Estilos utilitarios |
| REST API | Integración con backend NestJS |

---

## 📂 Estructura del proyecto

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

- **`features/`** → Módulos por dominio (Posts)
- **`shared/`** → Componentes reutilizables (Table, Pagination, etc.)
- **`core/`** → Servicios globales, interceptors y utilidades
- Arquitectura de componentes standalone (sin NgModules)

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/mariaalexaBR/posts-comments-frontend.git
cd posts-comments-frontend/angular-comments-frontend
```

### 2️⃣ Instalar dependencias

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

La aplicación estará disponible en: **http://localhost:4200**

---

## 🌐 Configuración de la API

Este frontend espera el backend corriendo en:

```
http://localhost:3000/api
```

> Asegúrate de que el backend NestJS esté levantado antes de iniciar el frontend.

---

## 👩‍💻 Autora

Desarrollado por **Alexandra Brenes**
