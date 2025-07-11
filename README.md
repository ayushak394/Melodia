# 🎵 Melodia: Music Streaming Web App

[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF0087?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**Melodia** is a full-stack music streaming web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can sign up, listen to music, create playlists, and receive email notifications. Admins can upload songs and manage content, while developers can control admin access using a built-in role management system.

## 🚀 Features

- 🔐 User registration and login with JWT-based authentication  
- 🛡️ Role-based access control: Admins vs. Normal Users  
- ▶️ Audio playback with play/pause controls  
- 🎵 Playlist creation, editing, and deletion  
- 🧑‍💼 Admin panel for uploading songs  
- 🛠️ Developer dashboard to manage admin permissions  
- ☁️ Cloudinary-based image and song upload support  
- 📬 Email notifications via EmailJS (e.g., admin approval confirmation, OTP authentication)  
- 💻 Responsive UI built with Tailwind CSS  
- 🎞️ Animations powered by Framer Motion

## ⚙️ Installation

### ✅ Prerequisites

- Node.js (LTS version)
- MongoDB (Local or Atlas Cloud)

## 🛠 Setup Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ayushak394/Melodia.git
cd melodia
```

### 2️⃣ Install Dependencies

```bash
npm install
cd client
npm install
cd ..
```

### 3️⃣ Configure Environment Variables
#### Create a .env file in the server directory:

```bash
MONGODB_URI=your_mongo_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

DEV_SECRET=optional_secret_for_dev_features

EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID_ADMIN_APPROVED=your_admin_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_PRIVATE_KEY=your_emailjs_private_key

```

#### Create a .env file in the client directory:

```bash
REACT_APP_API_URL=http://localhost:4000
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID_2=your_template_id_2
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4️⃣ Start the Application

#### Start the backend server
```bash
cd server
node server.js
```
#### Start the frontend development server:
```bash
cd client
npm start
```

## 🛠 Tech Stack

🎯 Frontend: React, Tailwind CSS, Framer Motion

🧠 Backend: Node.js, Express.js

💾 Database: MongoDB (Compass/Atlas)

🔐 Auth: JWT

☁️ Image & Audio Uploads: Cloudinary

📬 Email Notifications: EmailJS

## 🌐 Live Demo

🔗 [View Melodia Live](https://melodia-brown.vercel.app/)

## 📜 License

This project is for learning and portfolio-building purposes. Contributions, forks, and feature requests are welcome.
