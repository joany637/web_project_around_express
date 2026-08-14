const Card = require('../models/card');

// GET /cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// POST /cards
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos de tarjeta no válidos',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Datos de tarjeta no válidos',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};
// PUT /cards/:cardId/likes
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// DELETE /cards/:cardId/likes
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Tarjeta no encontrada',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de tarjeta no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};