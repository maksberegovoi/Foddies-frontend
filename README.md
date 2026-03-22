# 🍔 Foodies Frontend

Сучасний веб-додаток на базі React Router 7, побудований з використанням архітектури, орієнтованої на типи, та автоматизацію API-запитів.

---

## 🛠 Технологічний Стек

| Категорія | Технологія |
|-----------|------------|
| Framework | React Router v7 (Framework Mode) |
| Build Tool | Vite + TypeScript |
| API Management | Orval (генерація React Query хуків) |
| Networking | Axios з кастомним інстансом |
| State & Fetching | TanStack React Query v5 |
| UI & Styling | Tailwind CSS v4, Shadcn UI |
| Infrastructure | Docker (Multi-stage builds) |

---

## 🚀 Швидкий старт

### 1. Встановлення залежностей
npm install

### 2. Налаштування середовища
Створіть файл .env у корені проєкту та вкажіть актуальний URL бекенду:
VITE_BASE_API_URL=https://foddies-backend.onrender.com/api/v1

### 3. Запуск розробки
npm run dev

---

## 📡 Робота з API (Orval & React Query)

Проєкт використовує Orval для автоматичної генерації типізованих хуків безпосередньо зі Swagger-схеми бекенду.
Оновлення API: npm run generate-api


---

## 🧹 Стандарти розробки (Quality Control)

При спробі зробити git commit автоматично запускаються:
1. ESLint — перевірка якості та стилю коду.
2. Prettier — автоматичне форматування коду.
3. Typecheck — перевірка цілісності типів TypeScript.

---

## 🐳 Deployment (Docker)

Збірка образу:
docker build -t foodies-frontend .

Запуск контейнера:
docker run -p 3000:3000 foodies-frontend

---

## ⚠️ Обробка помилок

Реалізовано глобальний ErrorBoundary у root.tsx:
- 404 Not Found: Відображає спеціальну сторінку NotFoundPage.
- 500 Server Error: Відображає повідомлення про помилку на сервері.