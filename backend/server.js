const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Prenda, Venta, User } = require('./models');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda-virtual', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log('Error conectando MongoDB:', err));

// Middleware de autenticación
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-super-seguro');
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// ============ AUTH ============

app.post('/api/auth/registro', async (req, res) => {
  try {
    const { nombre, email, password, negocioNombre } = req.body;
    
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ error: 'Email ya registrado' });
    
    const passwordEncriptado = await bcrypt.hash(password, 10);
    const usuario = new User({ nombre, email, password: passwordEncriptado, negocioNombre });
    await usuario.save();
    
    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET || 'tu-secreto-super-seguro');
    res.json({ token, usuario: { id: usuario._id, nombre, email, negocioNombre } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) return res.status(400).json({ error: 'Contraseña incorrecta' });
    
    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET || 'tu-secreto-super-seguro');
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email, negocioNombre: usuario.negocioNombre } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PRENDAS ============

app.post('/api/prendas', verificarToken, async (req, res) => {
  try {
    const { nombre, precio, descripcion, foto, colores } = req.body;
    const prenda = new Prenda({
      userId: req.userId,
      nombre, precio, descripcion, foto, colores
    });
    await prenda.save();
    res.json(prenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDITAR prenda
app.put('/api/prendas/:id', verificarToken, async (req, res) => {
  try {
    const { nombre, precio, descripcion, foto, colores } = req.body;
    
    const prenda = await Prenda.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, descripcion, foto, colores },
      { new: true }
    );
    
    if (!prenda) return res.status(404).json({ error: 'Prenda no encontrada' });
    
    if (prenda.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'No tienes permisos para editar esta prenda' });
    }
    
    res.json(prenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/prendas', verificarToken, async (req, res) => {
  try {
    const prendas = await Prenda.find({ userId: req.userId });
    res.json(prendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/prendas/:id', verificarToken, async (req, res) => {
  try {
    await Prenda.deleteOne({ _id: req.params.id, userId: req.userId });
    await Venta.deleteMany({ prendaId: req.params.id });
    res.json({ mensaje: 'Prenda eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ VENTAS ============

app.post('/api/ventas', verificarToken, async (req, res) => {
  try {
    const { prendaId, cantidad, color, fecha } = req.body;
    
    const prenda = await Prenda.findOne({ _id: prendaId, userId: req.userId });
    if (!prenda) return res.status(404).json({ error: 'Prenda no encontrada' });
    
    // Buscar el color en la prenda
    const colorObj = prenda.colores.find(c => c.nombre === color);
    if (!colorObj) return res.status(400).json({ error: 'Color no encontrado' });
    if (colorObj.cantidad < cantidad) return res.status(400).json({ error: 'Stock insuficiente en este color' });
    
    // Restar del color específico
    colorObj.cantidad -= cantidad;
    colorObj.vendidas += cantidad;
    prenda.vendidas += cantidad;
    await prenda.save();
    
    const venta = new Venta({
      userId: req.userId,
      prendaId,
      prendaNombre: prenda.nombre,
      color,
      precio: prenda.precio,
      cantidad,
      total: prenda.precio * cantidad,
      fecha: fecha ? new Date(fecha) : new Date()
    });
    await venta.save();
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ventas', verificarToken, async (req, res) => {
  try {
    const ventas = await Venta.find({ userId: req.userId }).sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ REPORTES ============

app.get('/api/reportes/dashboard', verificarToken, async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(mañana.getDate() + 1);

    const ventasHoy = await Venta.find({
      userId: req.userId,
      fecha: { $gte: hoy, $lt: mañana }
    });

    const totalHoy = ventasHoy.reduce((sum, v) => sum + v.total, 0);
    const prendasHoy = ventasHoy.reduce((sum, v) => sum + v.cantidad, 0);

    const totalVentas = await Venta.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const prendas = await Prenda.find({ userId: req.userId });
    const totalInventario = prendas.reduce((sum, p) => sum + p.colores.reduce((s, c) => s + c.cantidad, 0), 0);
    const masPerfecta = prendas.reduce((max, p) => p.vendidas > (max?.vendidas || 0) ? p : max, null);

    res.json({
      vendidoHoy: totalHoy,
      prendasHoy,
      totalInventario,
      masPerfecta,
      totalVentasAllTime: totalVentas[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes/ventas-por-dia', verificarToken, async (req, res) => {
  try {
    const ventasPorDia = await Venta.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$fecha' } },
          total: { $sum: '$total' }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);
    res.json(ventasPorDia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes/prendas-vendidas', verificarToken, async (req, res) => {
  try {
    const prendas = await Prenda.find({ userId: req.userId })
      .sort({ vendidas: -1 });
    res.json(prendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes/finanzas', verificarToken, async (req, res) => {
  try {
    const ventasTotal = await Venta.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const totalVentas = ventasTotal[0]?.total || 0;
    const ganancia = totalVentas * 0.6;
    const inversion = totalVentas * 0.4;

    const prendas = await Prenda.find({ userId: req.userId });
    const costoInventario = prendas.reduce((sum, p) => sum + (p.colores.reduce((s, c) => s + (c.cantidad * p.precio * 0.3), 0)), 0);

    res.json({
      totalVentas,
      ganancia: Math.round(ganancia),
      inversion: Math.round(inversion),
      costoInventario: Math.round(costoInventario)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});