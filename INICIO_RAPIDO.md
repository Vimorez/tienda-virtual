# 🚀 GUÍA RÁPIDA DE INICIO - Mi Tienda Virtual

## ¿Qué necesitas?

- **Node.js** (descargar de nodejs.org)
- **MongoDB** (descargar de mongodb.com o usar versión en la nube - gratis)
- **Tu computadora** (Windows, Mac o Linux)

## Paso 1: Descargar e instalar Node.js

1. Ve a https://nodejs.org
2. Descarga la versión "LTS" (es la estable)
3. Instala normalmente
4. Abre terminal/cmd y escribe:
   ```
   node --version
   npm --version
   ```
   Debe mostrar números de versión

## Paso 2: Descargar e instalar MongoDB

### OPCIÓN A (Fácil - Recomendado para principiantes):
1. Ve a https://www.mongodb.com/try/download/community
2. Descarga e instala normalmente
3. Después de instalar, abre terminal y escribe:
   ```
   mongod
   ```
   Debe mostrar "waiting for connections on port 27017"

### OPCIÓN B (Más fácil - En la nube):
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratis
3. Crea un cluster gratis
4. Copia la "Connection string"
5. Abre el archivo: `tienda-virtual/backend/.env`
6. Reemplaza la línea:
   ```
   MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/tienda-virtual
   ```

## Paso 3: Instalar dependencias

Abre terminal en la carpeta `tienda-virtual` y escribe:

```bash
# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

(Esto tarda unos 2-3 minutos la primera vez)

## Paso 4: Ejecutar la aplicación

**ABRIR 2 TERMINALES**

### Terminal 1 - Backend:
```bash
cd tienda-virtual/backend
npm start
```

Debe mostrar:
```
🚀 Servidor corriendo en puerto 5000
```

### Terminal 2 - Frontend:
```bash
cd tienda-virtual/frontend
npm run dev
```

Debe mostrar algo como:
```
VITE v4.2.0  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## Paso 5: Acceder a tu tienda

Abre en el navegador:
```
http://localhost:3000
```

¡Listo! Tu tienda está en funcionamiento 🎉

---

## Primeros pasos en la aplicación

1. **Registrate** - Crea tu cuenta con tu email
2. **Agrega prendas** - Ve a "Inventario" y agrega tus prendas
3. **Registra ventas** - Cuando vendas, ve a "Ventas" y registra
4. **Mira reportes** - En el Dashboard y Reportes ves todo analizado

---

## 💡 Tips

- La contraseña debe tener al menos 6 caracteres
- Usa emojis para representar tus prendas (👕👖👗👔...)
- Puedes registrar ventas de días anteriores
- El sistema automáticamente calcula tus ganancias

---

## ❌ Problemas comunes

### "Port 5000 already in use"
La computadora ya está usando ese puerto. Abre `backend/.env` y cambia:
```
PORT=3001
```

### "Cannot connect to MongoDB"
- Si usas MongoDB local, asegúrate de tener `mongod` corriendo
- Si usas MongoDB Cloud, revisa que el MONGODB_URI esté correcto

### "Frontend no carga"
Asegúrate de que:
1. Backend está corriendo en puerto 5000
2. Frontend está corriendo en puerto 3000
3. En la terminal del frontend debe decir "ready in XXX ms"

### Error en terminal: "npm command not found"
Node.js no está instalado correctamente. Reinstálalo desde nodejs.org

---

## 📱 Usar desde el celular

En tu computadora, abre terminal y escribe:
```bash
ipconfig      # En Windows
ifconfig      # En Mac/Linux
```

Busca algo como "192.168.x.x" - esa es tu IP local.

En tu celular (en la misma red WiFi), abre:
```
http://192.168.x.x:3000
```

---

## 🎯 Próximos pasos

Una vez que todo funcione:

1. **Personaliza los colores** - Edita `frontend/src/components/App.css`
2. **Cambia los porcentajes** - 60/40 está en `Finanzas.jsx`
3. **Agrega más funciones** - El código está bien documentado
4. **Despliega online** - Cuando estés listo, puedo ayudarte

---

¡Felicidades! Ya tienes tu sistema de tienda virtual profesional funcionando 🚀

Si necesitas ayuda, revisa el README.md completo en la carpeta.
