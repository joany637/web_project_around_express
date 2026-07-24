const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

// GET /users
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({
        message: 'Error del servidor',
      });
    }

    const users = JSON.parse(data);
    res.send(users);
  });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({
        message: 'Error del servidor',
      });
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (!user) {
      return res.status(404).send({
        message: 'ID de usuario no encontrado',
      });
    }

    res.send(user);
  });
});

module.exports = router;