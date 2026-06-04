# 🍳 Recipe Book SaaS Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D5.0-brightgreen)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### A Production-Ready Full-Stack Recipe Management Platform

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [📖 About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [🗄️ Database Seeding](#️-database-seeding)
- [🐳 Docker Setup](#-docker-setup)
- [📡 API Documentation](#-api-documentation)
- [🔒 Security Features](#-security-features)
- [📈 Performance Optimizations](#-performance-optimizations)
- [🚢 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Authors](#-authors)

---

## 📖 About The Project

**Recipe Book SaaS** is a complete, production-ready recipe management platform that allows users to discover, create, share, and manage recipes. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application features user authentication, social interactions, analytics dashboard, and an admin panel.

### Why I Built This

I created this project to demonstrate my full-stack development capabilities and to provide a real-world solution for food enthusiasts. This platform showcases:

- **Professional-grade code architecture**
- **Enterprise-level security practices**
- **Scalable database design**
- **Modern UI/UX principles**
- **DevOps best practices**

### Business Value

- 📈 **For Users**: Discover new recipes, save favorites, share creations
- 👨‍🍳 **For Content Creators**: Build audience, track engagement, monetize content
- 🏢 **For Businesses**: Recipe management, user analytics, content moderation

---

## ✨ Key Features

### 👤 Authentication & Authorization
| Feature | Description |
|---------|-------------|
| JWT Authentication | Access and refresh token system |
| Email Verification | Verify user email addresses |
| Password Reset | Forgot password functionality |
| Role-Based Access | User and Admin roles |
| Secure Cookies | HTTP-only cookie storage |
| Session Management | Redis-based session handling |

### 📝 Recipe Management
| Feature | Description |
|---------|-------------|
| CRUD Operations | Create, read, update, delete recipes |
| Rich Text Editor | Formatted recipe instructions |
| Image Upload | Multiple image upload with Cloudinary |
| Categories & Tags | Organize recipes effectively |
| Draft System | Save recipes as drafts |
| Nutritional Info | Track calories, protein, carbs, etc. |

### ❤️ Social Features
| Feature | Description |
|---------|-------------|
| Likes | Like and unlike recipes |
| Bookmarks | Save favorite recipes |
| Comments | Comment and reply system |
| Sharing | Share recipes on social media |
| Notifications | Real-time activity notifications |

### 📊 Analytics Dashboard
| Feature | Description |
|---------|-------------|
| Personal Stats | Recipe views, likes, engagement |
| Activity Timeline | Track user activity |
| Performance Charts | Visual recipe analytics |
| Growth Metrics | Track audience growth |

### 🔧 Admin Panel
| Feature | Description |
|---------|-------------|
| User Management | Activate/deactivate users |
| Recipe Moderation | Approve/reject recipes |
| Category Management | Create/edit categories |
| System Analytics | Platform-wide statistics |
| Report Handling | Manage user reports |

### 🎨 UI/UX Features
| Feature | Description |
|---------|-------------|
| Dark Mode | Light/Dark theme toggle |
| Responsive Design | Mobile-first approach |
| Smooth Animations | Framer Motion animations |
| Loading Skeletons | Improved perceived performance |
| Toast Notifications | Real-time feedback |

---

## 🛠️ Tech Stack

### Backend
```yaml
Runtime: Node.js 18+
Framework: Express.js 4.x
Database: MongoDB 5.0+
ODM: Mongoose 7.x
Caching: Redis 7.x
Authentication: JWT (jsonwebtoken)
File Storage: Cloudinary
Email Service: Nodemailer
Validation: express-validator
Security: helmet, cors, xss-clean
```
### Frontend
```yaml
Framework: React 18
Build Tool: Vite 5.x
State Management: Redux Toolkit 1.9
UI Library: Tailwind CSS 3.x
Animations: Framer Motion 10.x
Charts: Recharts 2.x
HTTP Client: Axios 1.x
Data Fetching: TanStack Query 5.x
Icons: Lucide React
Forms: React Hook Form
```

### 📁 Project Structure
```text
recipe-book-saas/
│
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── models/           # Mongoose models
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Custom middleware
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   └── app.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Redux store
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utilities
│   │   ├── styles/           # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
### 🔒 Security Features
```yaml
Authentication:
  - JWT with short expiration (15 minutes)
  - Refresh token rotation
  - HTTP-only cookies
  - Password hashing (bcrypt, 12 rounds)

Authorization:
  - Role-based access control (RBAC)
  - Route protection middleware
  - Resource ownership verification

Input Validation:
  - express-validator for request validation
  - MongoDB query sanitization
  - XSS prevention
  - SQL injection protection

Network Security:
  - Helmet.js for security headers
  - CORS with allowed origins
  - Rate limiting per IP/user
  - Request size limits
```
