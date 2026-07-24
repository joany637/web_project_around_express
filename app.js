const express = require('express');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});