# 🛍️ Mi Tienda Virtual - Sistema de Gestión de Ropa

Un sistema profesional y completo para administrar tu negocio de ropa vendido por TikTok Live.

## ✨ Características

✅ **Registro e inicio de sesión** - Cada usuario tiene su propia cuenta y datos protegidos
✅ **Gestión de inventario** - Agrega prendas con foto, precio y cantidad
✅ **Registro de ventas** - Registra cada venta que haces en tus Live
✅ **Análisis automático** - Ve qué prendas se venden más y cuáles menos
✅ **Dashboard en tiempo real** - Métricas de hoy, total vendido, etc.
✅ **Finanzas inteligentes** - Automático divide ganancias (60% para ti, 40% para invertir)
✅ **Reportes detallados** - Analiza qué días venden más, bajo stock, etc.
✅ **Base de datos real** - Todo se guarda permanentemente en MongoDB

## 🚀 Instalación rápida (3 pasos)

### 1. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

### 2. Configurar MongoDB

Tienes 2 opciones:

**Opción A: Usar MongoDB local (más fácil)**
```bash
# Descargar e instalar MongoDB Community
# https://www.mongodb.com/try/download/community

# Una vez instalado, ejecutar el servidor
mongod
```

**Opción B: Usar MongoDB Cloud (gratis)**
1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratis
3. Crear un cluster
4. Copiar la connection string
5. Reemplazar en `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tienda-virtual
   ```

### 3. Ejecutar la aplicación

**Terminal 1: Backend**
```bash
cd backend
npm start
# Verás: 🚀 Servidor corriendo en puerto 5000
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
# Verás: VITE v4.2.0 ready in... 
#       http://localhost:3000
```

Abre http://localhost:3000 en tu navegador 🎉

## 📖 Cómo usar

### 1. Crear tu cuenta
- Haz clic en "Regístrate"
- Llena tus datos
- Listo, tu cuenta está lista

### 2. Agregar tus prendas
- Ve a "Inventario"
- Haz clic en "Agregar nueva prenda"
- Completa: nombre, precio, cantidad, emoji (representación)
- Guarda

### 3. Registrar ventas
- Ve a "Ventas"
- Selecciona qué prenda vendiste
- Indica cuántas unidades
- Selecciona la fecha (por defecto hoy)
- Guarda

### 4. Revisar tus datos
- **Dashboard**: Ve en tiempo real qué vendiste hoy
- **Finanzas**: Automático calcula tu ganancia (60%) e inversión (40%)
- **Reportes**: Analiza tendencias, qué prendas venden más, bajo stock

## 💰 Cómo funciona el sistema financiero

```
100% Dinero que entra en TikTok Live
  ├─ 60% = Tu ganancia (para vivir)
  └─ 40% = Para reinvertir (comprar más prendas)
```

**Ejemplo:**
- Vendes $1000 en el mes
- Tu ganancia: $600 (es tuya)
- Para reinvertir: $400 (compra más prendas)

## 📁 Estructura del proyecto

```
tienda-virtual/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── models.js          # Modelos de BD
│   ├── package.json       # Dependencias
│   └── .env               # Configuración
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # App principal
│   │   ├── api.js         # Cliente HTTP
│   │   ├── components/    # Componentes React
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventario.jsx
│   │   │   ├── Ventas.jsx
│   │   │   ├── Finanzas.jsx
│   │   │   └── Reportes.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md              # Esta documentación
```

## 🛡️ Seguridad

- Las contraseñas están encriptadas (bcrypt)
- Cada usuario solo ve sus propios datos
- Las transacciones usan tokens JWT
- Las conexiones están protegidas

## 📱 Acceder desde el teléfono

Si ejecutas la aplicación en tu computadora:

1. Abre terminal y ejecuta:
```bash
ipconfig  # En Windows
ifconfig  # En Mac/Linux
```

2. Busca tu IP local (algo como 192.168.x.x)

3. En tu teléfono, accede a:
```
http://192.168.x.x:3000
```

## 🐳 Desplegar a producción (servidor online)

Cuando quieras que tu aplicación esté siempre disponible online:

### Opción 1: Usar Heroku (más fácil)
```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create mi-tienda-virtual
git push heroku main
```

### Opción 2: Usar Render.com (recomendado)
1. Ir a https://render.com
2. Conectar tu GitHub
3. Crear nuevo servicio Web
4. Desplegar automático

### Opción 3: Usar un VPS ($5-10/mes)
- DigitalOcean
- Linode
- AWS Lightsail

## ⚙️ Variables de entorno (.env)

```
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tienda-virtual
JWT_SECRET=tu-secreto-super-seguro-cambiar-esto
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Cambiar JWT_SECRET a algo único y seguro en producción.

## 🆘 Solucionar problemas

### Puerto 5000 ya está en uso
```bash
# Cambiar a otro puerto en backend/.env
PORT=3001

# O matar el proceso que lo usa
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000    # Windows
```

### MongoDB no conecta
- Asegúrate de tener MongoDB corriendo: `mongod`
- O usa MongoDB Cloud y actualiza MONGODB_URI

### Frontend no se conecta al backend
- Backend debe estar corriendo en puerto 5000
- Frontend debe estar en puerto 3000
- Revisa que CORS esté habilitado

### Error: "Cannot find module"
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

## 📞 Soporte

Si tienes problemas:
1. Revisa la terminal donde corre el servidor
2. Abre la consola del navegador (F12)
3. Lee los mensajes de error

## 📄 Licencia

Este proyecto es tuyo para usarlo como quieras.

---

**¡Hecha! 🚀 Tu sistema de tienda virtual está listo para usar.**
