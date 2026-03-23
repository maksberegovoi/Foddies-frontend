# 🍔 Foodies - Recipe Sharing Platform (Frontend)

Welcome to the frontend repository of **Foodies** — a modern, full-stack recipe sharing platform. This application allows users to discover new recipes, manage their personal profiles, follow other culinary enthusiasts, and curate their own collection of favorite dishes.

🌍 **Live Demo:** [https://foddies-frontend.onrender.com](https://foddies-frontend.onrender.com)  
⚙️ **Backend Repository:** [Foddies-backend](https://github.com/maksberegovoi/Foddies-backend)  
🔗 **Deployed API:** [https://foddies-backend.onrender.com](https://foddies-backend.onrender.com)


## ✨ Key Features

* **Recipe Catalog:** Browse a wide variety of recipes created by the community.
* **Advanced Filtering:** Two powerful filters to easily find the perfect meal.
* **User Authentication & Profiles:** Secure login, registration, and personalized user pages.
* **Social Interactions:** Follow and unfollow other users to keep up with their culinary creations.
* **Favorites System:** Save recipes to your favorites for quick access, or remove them at any time.
* **Recipe Creation:** Craft, publish, and manage your own unique recipes.



## 🛠️ Tech Stack

This project is built with a modern frontend ecosystem to ensure high performance, type safety, and a great developer experience.

**Core:**
* **React 19** & **React Router 7** (Routing)
* **TypeScript**
* **Vite** (Bundler)

**State Management & Data Fetching:**
* **TanStack React Query v5** (Server state handling)
* **Axios** (HTTP client)
* **Orval** (Automated API client generation based on OpenAPI/Swagger)

**Styling & UI Components:**
* **Tailwind CSS v4**
* **Shadcn UI** & **Base UI** (Accessible component primitives)
* **Lucide React** (Icons)
* **Sonner** (Toast notifications)
* **Embla Carousel** (Sliders)

**Forms & Validation:**
* **React Hook Form**
* **Zod** (Schema validation)

## 📂 Project Highlights
TanStack Query + Orval: Fully automated data fetching layer with auto-generated hooks.

React Router 7: Leveraging the latest routing features and performance optimizations.

Tailwind CSS v4: Modern styling with zero-runtime CSS.

Shadcn UI: Accessible and customizable UI components.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/maksberegovoi/Foddies-frontend.git
```

### 2. Install dependencies
Install the required packages using npm:
```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory and add the following variable:

Фрагмент кода
VITE_BASE_API_URL=http://localhost:3000/api/v1
Note: To connect to the production backend directly, use: https://foddies-backend.onrender.com/api/v1

### 4. Generate API Client
This project uses Orval to automatically generate type-safe React Query hooks from the backend OpenAPI specification. Run this command to sync the frontend with the API:

Bash
```
npm run generate-api
```

### 5. Start the development server
Run the following command to start the app:

Bash
```
npm run dev
```


## 📝 License
This project is MIT licensed.
