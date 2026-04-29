# DevTrack - Project Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for project tracking and team management.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Protected Routes**: Client-side route protection based on authentication
- **Responsive Design**: Modern UI built with React
- **RESTful API**: Clean backend API for all operations

## 📋 Tech Stack

### Frontend
- React.js
- React Router (for navigation)
- Axios (for HTTP requests)
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- JWT (JSON Web Tokens)
- bcryptjs (password hashing)
- CORS

## 📁 Project Structure

```
devtrack/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (Login, Dashboard)
│   │   ├── services/      # API service calls
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── server/                # Node/Express backend
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware (auth, role)
    ├── models/            # Mongoose schemas
    ├── routes/            # API routes
    ├── server.js
    └── package.json
```

## ⚙️ Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas URI)

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend Setup

```bash
cd client
npm install
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd server
npm start
# or
node server.js
```
Server runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

- `POST /login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### User Routes (`/api/users`)
- `GET /` - Get all users (requires authentication)
- `GET /:id` - Get user by ID (requires authentication)
- `PUT /:id` - Update user (requires authentication)
- `DELETE /:id` - Delete user (requires authentication + admin role)

## 🔐 Authentication

- Passwords are hashed using bcryptjs before storage
- JWT tokens are issued on successful login
- Include token in Authorization header: `Bearer <token>`
- Tokens expire after 1 day

## 🛡️ Middleware

- **authMiddleware**: Validates JWT tokens and protects routes
- **roleMiddleware**: Restricts access based on user role (admin/user)

## 📝 Environment Variables

### Server (.env)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/devtrack
JWT_SECRET=your_super_secret_key
PORT=5000
```

## 🚀 Deployment

### Backend
- Deploy to Heroku, Railway, or Render
- Update MongoDB connection string for production
- Set environment variables on hosting platform

### Frontend
- Build the project: `npm run build`
- Deploy to Vercel, Netlify, or GitHub Pages
- Update API base URL to production backend URL

## 🐛 Troubleshooting

- **MongoDB Connection Error**: Check `MONGO_URI` in `.env`
- **JWT Errors**: Ensure `JWT_SECRET` matches between frontend and backend
- **CORS Issues**: CORS is enabled in `server.js`
- **Port Already in Use**: Change PORT in `.env` or kill the process using the port

## 📦 Dependencies

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

### Frontend
- react
- react-router-dom
- axios

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

DevTrack Team

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: Make sure to update the MongoDB URI and JWT_SECRET before running the application in production.
