# ☕ Bunaster App – README
Aplicación Full Stack (React + Node.js + MongoDB)

## 💡 Descripción breve
Bunaster App es una aplicación full stack donde los usuarios pueden registrarse, iniciar sesión y publicar variedades de café.  
Incluye autenticación con JWT, manejo de roles (cliente / admin) y un CRUD completo de variedades.

## 📦 Tecnologías
- Frontend: React, Vite, Context API, React Router  
- Backend: Node.js, Express, MongoDB, Mongoose  
- Auth: JWT + Bcrypt  
- Styling: CSS personalizado estilo Bunaster  

## 🚀 Cómo levantar el proyecto

### 1️⃣ Backend
1. Entrar a `/server`
2. Instalar dependencias:
   ```
   npm install
   ```
3. Crear archivo `.env` con:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/bunaster
   SECRET_KEY=miclaveultrasecreta
   ```
4. Ejecutar backend:
   ```
   npm start
   ```

Corre en: http://localhost:5000

### 2️⃣ Frontend
1. Entrar a `/client`
2. Instalar dependencias:
   ```
   npm install
   ```
3. Levantar el frontend:
   ```
   npm run dev
   ```

Abre en: http://localhost:5173

## 🔐 Funcionalidades principales
- Login y registro con JWT  
- Protección de rutas  
- Roles:
  - Cliente: CRUD de sus propias variedades  
  - Admin: CRUD completo  
- Panel admin  
- Modales para crear/editar/eliminar  
- Consumo de API REST desde React

## 🌐 Consumo de API REST
Ejemplo:
```
fetch("http://localhost:5000/api/variedades", {
  headers: { "Authorization": `Bearer ${token}` }
});
```

