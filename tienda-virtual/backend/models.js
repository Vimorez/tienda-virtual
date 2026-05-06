const mongoose = require('mongoose');

// Esquema de Prendas
const prendaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: String,
  foto: { type: String },
  colores: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      vendidas: { type: Number, default: 0 }
    }
  ],
  vendidas: { type: Number, default: 0 },
  creadoEn: { type: Date, default: Date.now }
});

// Esquema de Ventas
const ventaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prenda', required: true },
  prendaNombre: String,
  color: String,
  precio: Number,
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  creadoEn: { type: Date, default: Date.now }
});

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  negocioNombre: String,
  creadoEn: { type: Date, default: Date.now }
});

module.exports = {
  Prenda: mongoose.model('Prenda', prendaSchema),
  Venta: mongoose.model('Venta', ventaSchema),
  User: mongoose.model('User', userSchema)
};