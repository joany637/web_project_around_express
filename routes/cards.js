const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/cards.json');

// GET /cards
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({
        message: 'Error del servidor',
      });
    }

    const cards = JSON.parse(data);
    res.send(cards);
  });
});

// GET /cards/:id
router.get('/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({
        message: 'Error del servidor',
      });
    }

    const cards = JSON.parse(data);
    const card = cards.find((c) => c._id === req.params.id);

    if (!card) {
      return res.status(404).send({
        message: 'ID de tarjeta no encontrado',
      });
    }

    res.send(card);
  });
});

module.exports = router;