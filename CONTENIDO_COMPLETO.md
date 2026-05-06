# 📦 CONTENIDO COMPLETO DE TU SISTEMA DE TIENDA VIRTUAL

## 📁 Estructura del proyecto

```
tienda-virtual/
│
├── backend/                    # Servidor Node.js + Express
│   ├── server.js              # API principal con todas las rutas
│   ├── models.js              # Modelos de base de datos (Prendas, Ventas, Usuarios)
│   ├── package.json           # Dependencias del backend
│   └── .env                   # Configuración (puerto, DB, etc)
│
├── frontend/                   # Interfaz React + Vite
│   ├── src/
│   │   ├── App.jsx            # Componente principal de React
│   │   ├── api.js             # Cliente HTTP (conexión con backend)
│   │   ├── main.jsx           # Punto de entrada
│   │   ├── index.css          # Estilos globales
│   │   └── components/
│   │       ├── Auth.jsx       # Pantalla de login/registro
│   │       ├── Auth.css       # Estilos de autenticación
│   │       ├── App.jsx        # Layout principal (sidebar + contenido)
│   │       ├── App.css        # Estilos del layout
│   │       ├── Dashboard.jsx  # Métricas en tiempo real
│   │       ├── Inventario.jsx # Gestión de prendas
│   │       ├── Ventas.jsx     # Registro de ventas
│   │       ├── Finanzas.jsx   # Análisis financiero (60/40)
│   │       └── Reportes.jsx   # Análisis de datos
│   ├── index.html             # Página HTML principal
│   ├── package.json           # Dependencias del frontend
│   └── vite.config.js         # Configuración de Vite
│
├── package.json               # Archivo raíz del proyecto
└── README.md                  # Documentación completa

INICIO_RAPIDO.md              # Guía de instalación en español
```

## 🔧 Que hace cada archivo

### BACKEND

**server.js** (330 líneas)
- ✅ Servidor Express en puerto 5000
- ✅ Conexión a MongoDB
- ✅ Rutas de autenticación (login/registro)
- ✅ CRUD de prendas (crear, leer, eliminar)
- ✅ CRUD de ventas
- ✅ Reportes y análisis
- ✅ Cálculo automático de finanzas

**models.js** (40 líneas)
- ✅ Esquema de Prendas (nombre, precio, cantidad, emoji, etc)
- ✅ Esquema de Ventas (qué se vendió, cuándo, cuánto)
- ✅ Esquema de Usuarios (datos de tu cuenta)

**package.json**
- express: El framework web
- mongoose: Para conectar con MongoDB
- bcryptjs: Para encriptar contraseñas
- jsonwebtoken: Para autenticación segura
- cors: Para permitir acceso desde frontend

**.env**
- PORT: Puerto del servidor (5000)
- MONGODB_URI: Conexión a base de datos
- JWT_SECRET: Clave secreta de seguridad

### FRONTEND

**App.jsx** (Principal)
- ✅ Gestiona el estado global
- ✅ Carga datos del backend
- ✅ Muestra/oculta secciones

**Auth.jsx**
- ✅ Formulario de registro
- ✅ Formulario de login
- ✅ Validaciones
- ✅ Guarda token en localStorage

**components/Dashboard.jsx**
- ✅ Muestra ventas de hoy
- ✅ Prendas vendidas hoy
- ✅ Prenda más vendida
- ✅ Tips para mejorar ventas

**components/Inventario.jsx**
- ✅ Agregar nuevas prendas
- ✅ Ver todas tus prendas
- ✅ Mostrar foto/emoji
- ✅ Eliminar prendas

**components/Ventas.jsx**
- ✅ Formulario para registrar venta
- ✅ Selector de prenda
- ✅ Cantidad vendida
- ✅ Fecha de venta
- ✅ Lista de últimas ventas

**components/Finanzas.jsx**
- ✅ Cálculo automático (60% ganancia, 40% inversión)
- ✅ Total vendido
- ✅ Desglose visual
- ✅ Explicación de cómo funciona

**components/Reportes.jsx**
- ✅ Ventas por día
- ✅ Top 5 prendas más vendidas
- ✅ Prendas con bajo stock
- ✅ Mejor día para vender

**api.js**
- ✅ Cliente axios configurado
- ✅ Automáticamente agrega token JWT a peticiones

## 🎯 Funcionalidades principales

### 🔐 Autenticación
- Registro de nuevos usuarios
- Login con email y contraseña
- Contraseñas encriptadas
- Tokens JWT para sesiones seguras
- Sesión persiste aunque cierres la app

### 👕 Inventario
- Agregar prendas ilimitadas
- Nombre, precio, cantidad, descripción
- Emoji para representar (👕👖👗...)
- Ver todas las prendas
- Eliminar prendas
- Eliminar automáticamente ventas relacionadas

### 💰 Ventas
- Registrar cada venta rápido
- Selector de prenda (solo muestra disponibles)
- Cantidad vendida
- Fecha (hoy por defecto, pero puedes cambiar)
- Automáticamente resta del inventario
- Lista de últimas ventas

### 📊 Dashboard
- Vendido hoy
- Prendas vendidas hoy
- Total en inventario
- Prenda más vendida
- Total vendido todos los tiempos
- Tips personalizados

### 💵 Finanzas (AUTOMÁTICO)
- 60% = Tu ganancia (para vivir)
- 40% = Para reinvertir (comprar más prendas)
- Cálculo automático de ambos
- Costo estimado del inventario
- Explicación clara de cómo funciona

### 📈 Reportes
- Ventas de últimos 30 días
- Gráfico visual de ventas
- Top 5 prendas más vendidas
- Alertas de bajo stock (≤3 unidades)
- Mejor día para vender
- Análisis completo

## 🔐 Seguridad

✅ Contraseñas encriptadas con bcrypt
✅ Autenticación JWT
✅ Cada usuario solo ve sus datos
✅ CORS configurado
✅ Validación en servidor
✅ Listo para HTTPS en producción

## 📱 Compatibilidad

✅ Funciona en computadora (Windows, Mac, Linux)
✅ Funciona en navegadores (Chrome, Firefox, Safari, Edge)
✅ Responsive (funciona en celular)
✅ Se puede acceder desde cualquier dispositivo en la misma red

## 🚀 Cómo se ejecuta

### Arquitectura de capas:

```
USUARIO FINAL
     ↓
[FRONTEND - React/Vite en puerto 3000]
     ↓ HTTP/JSON
[BACKEND - Express/Node en puerto 5000]
     ↓ Conexión
[BASE DE DATOS - MongoDB]
```

### Flujo de una venta:

1. Usuario hace clic en "Registrar venta"
2. Frontend envía POST a `http://localhost:5000/api/ventas`
3. Backend valida:
   - ✓ Usuario autenticado?
   - ✓ ¿Existe esa prenda?
   - ✓ ¿Hay suficiente stock?
4. Si todo OK:
   - Crea documento en colección "ventas"
   - Reduce cantidad de prenda en inventario
   - Aumenta contador "vendidas" de esa prenda
   - Retorna confirmación al frontend
5. Frontend actualiza la lista de ventas
6. Todo se guarda permanentemente en MongoDB

## 📦 Dependencias

### Backend (5 paquetes)
- express: Framework web
- mongoose: ODM para MongoDB
- cors: Permitir peticiones desde frontend
- bcryptjs: Encriptación de contraseñas
- jsonwebtoken: Autenticación

### Frontend (4 paquetes)
- react: Interfaz de usuario
- react-dom: Renderizar React en navegador
- axios: Cliente HTTP
- recharts: Gráficos (opcional, listo para usar)

Dependencias de desarrollo: vite, nodemon para desarrollo rápido

## 💾 Base de datos

MongoDB almacena:

**Colección: users**
```javascript
{
  _id: ObjectId,
  nombre: "Fa",
  email: "fa@example.com",
  password: "...encriptada...",
  negocioNombre: "Mi Tienda de Ropa",
  creadoEn: Date
}
```

**Colección: prendas**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  nombre: "Camiseta básica",
  precio: 150,
  cantidad: 10,
  vendidas: 3,
  emoji: "👕",
  descripcion: "Negra, talla M-XL",
  creadoEn: Date
}
```

**Colección: ventas**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  prendaId: ObjectId,
  prendaNombre: "Camiseta básica",
  emoji: "👕",
  precio: 150,
  cantidad: 2,
  total: 300,
  fecha: Date,
  creadoEn: Date
}
```

## 🎨 Estilos

- Colores modernos: Morado y azul
- Responsive (funciona en cualquier tamaño)
- Dark mode ready
- Botones interactivos
- Transiciones suaves

## 🚀 Cómo desplegar a internet

Cuando quieras que el sistema esté online 24/7:

1. **Heroku** (más fácil, pero se va a dormir)
2. **Render.com** (recomendado, gratis con límites)
3. **DigitalOcean** ($5/mes, más control)
4. **AWS/Google Cloud** (más profesional)

## 📖 Documentación incluida

- **README.md**: Documentación completa en inglés
- **INICIO_RAPIDO.md**: Guía de instalación en español
- **Código comentado**: Cada función tiene explicación
- **Este archivo**: Descripción de todo

---

¡Tu sistema está listo para usar! 🎉

Todos los archivos están creados y listos para instalar.
Solo necesitas:
1. Node.js
2. MongoDB
3. Ejecutar: npm install (en backend y frontend)
4. Ejecutar: npm start (en backend) + npm run dev (en frontend)

¡A vender! 🛍️
