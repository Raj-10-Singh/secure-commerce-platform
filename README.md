🛒 SmartMart — AI-Driven Personalized Shopping Platform 

A production-ready e-commerce backend built with Node.js and Express.js, focused on secure authentication, role-based authorization, and scalable REST API design. This backend is designed to serve real-world web and mobile e-commerce applications.

## 🚀 Live Demo
🔗 https://secure-commerce-platform.onrender.com/

## 📌 Problem Statement
Many beginner level e-commerce backends lack proper security practices, authorization layers, and scalable architecture.  
This project was built to demonstrate how a real-world backend should handle authentication, user roles, product management, and order processing in a clean and maintainable way.


## 🏗️ Architecture Overview
The project follows the **MVC (Model–View–Controller)** architecture:
- **Models**: MongoDB schemas using Mongoose
- **Controllers**: Business logic and request handling
- **Routes**: RESTful API endpoints
- **Middleware**: Authentication, authorization, and error handling

This separation ensures scalability, maintainability, and clean code organization.



## 🚀 Features
- Secure user authentication using JWT
- Password hashing with bcrypt
- Role-based authorization (Admin & Customer)
- Product CRUD APIs
- Order creation and management
- Image uploads using Multer
- Cookie-based session handling
- RESTful APIs ready for frontend or mobile integration


## 🌐 Sample API Endpoints
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – User login with JWT  
- `GET /api/products` – Fetch all products  
- `POST /api/products` – Add product (Admin only)  
- `POST /api/orders` – Place an order  


## 🧰 Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Multer
- Cookie-parser
- dotenv


## ⚙️ Setup Instructions
1. Clone the repository  
2. Install dependencies  
3. Configure environment variables  
- Create a `.env` file based on `.env.example`
- Add MongoDB URI and JWT secret
4. Run the development server


## 🔐 Security Considerations
- Passwords are hashed using bcrypt before storage
- JWT is used for stateless authentication
- Protected routes are secured using middleware
- Role-based access control restricts admin-only operations


## 🔮 Future Enhancements
- Payment gateway integration (Razorpay / Stripe)
- Product recommendation system
- API rate limiting and validation
- Dockerized deployment
- Admin analytics dashboard


## 👤 Author
Developed and maintained by **Raj Singh** as a backend-focused project to strengthen real-world API development, security practices, and system design skills.


