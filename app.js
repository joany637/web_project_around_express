const express = require('express');
const users = require('./users.json');
const cards = require('./cards.json');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/cards', (req, res) => {
  res.send(cards);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u._id === req.params.id);

  if (!user) {
    return res.status(404).send({
      message: 'ID de usuario no encontrado'
    });
  }

  return res.send(user);
});

app.get('/cards/:id', (req, res) => {
  const card = cards.find((c) => c._id === req.params.id);

  if (!card) {
    return res.status(404).send({
      message: 'ID de tarjeta no encontrado'
    });
  }

  return res.send(card);
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Recurso solicitado no encontrado'
  });
});
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'users.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;

  console.log(JSON.parse(data));
});