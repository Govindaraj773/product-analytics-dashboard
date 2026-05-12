# Product Analytics Dashboard

This project is developed as part of the Dyne Infotech Machine Test Assignment.

The application provides product analytics and insights using uploaded CSV/Excel product data.

---

# Live Demo

Frontend (Vercel):  
https://product-analytics-dashboard-gray.vercel.app/

Backend API (Render):  
https://product-analytics-dashboard-e9jy.onrender.com

GitHub Repository:  
https://github.com/Govindaraj773/product-analytics-dashboard.git

---

# Features

- Upload CSV/Excel files
- Display products in table format
- Search products by name
- Pagination support
- Product analytics charts
- Category-wise product analysis
- Discount distribution visualization
- Responsive dashboard UI
- REST API integration

---

## Frontend Technologies

- React.js
- Material UI (MUI)
- Recharts
- Axios

## Backend Technologies

- Node.js
- Express.js

## Database

- PostgreSQL

## Deployment

- Vercel (Frontend)
- Render (Backend & PostgreSQL)

---

# Project Structure

```text
product-analytics-dashboard/
│
├── frontend   → React application
│
└── backend    → Node.js + Express API
```

---

# Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

---

# Run Backend Locally

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

## Frontend `.env`

```env
VITE_API_URL=https://product-analytics-dashboard-e9jy.onrender.com
```

## Backend `.env`

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

---

# Main Functionalities

- File upload and processing
- REST API integration
- Analytics dashboard
- Search and filtering
- Data visualization using charts

---

# Author

Govindaraj Cholappagol
