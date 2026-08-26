const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

// Middleware temporal de autorización
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

// Rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});