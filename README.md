# Frontend Developer Task – PrimeTrade

This project is a full-stack web application built as part of the Frontend Developer assignment. It includes a React-based frontend, a Node.js backend, JWT-based authentication, image upload functionality, and a dashboard with CRUD operations.

---

## 🚀 Tech Stack

### Frontend
- React.js
- Axios
- React Icons
- Tailwind CSS 

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (for handling file uploads)
- Cloudinary (for image storage)

### Deployment
- Frontend: Vercel
- Backend: Render

### Tools
- Postman (API testing)
- GitHub (version control)

---

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- User Registration
- User Login
- User Logout
- Protected routes using authentication middleware
- JWT stored securely in HTTP-only cookies

---

## 📊 Dashboard & CRUD Functionality

The dashboard allows authenticated users to manage content with full CRUD operations.

**Features include:**
- Create entity with image upload
- View all entities
- Update entity details and image
- Delete entity
- Access restricted to authenticated users only

**Entity Used:** Blog (with image upload support)

---

## 🖼️ Image Upload Handling

- Images are uploaded using **Multer** on the backend
- Uploaded images are stored securely on **Cloudinary**
- Only the image URL is stored in the database
- Images are displayed dynamically on the frontend

---

## 🎨 UI Enhancements

- Used **React Icons** for better visual clarity and improved user experience
- Icons are used across buttons, navigation, and dashboard actions

---

## 🔗 API Documentation

A Postman collection is included in the repository to test all backend APIs.

**Includes:**
- Authentication APIs (Register, Login, Logout)
- CRUD APIs
- Image upload APIs
