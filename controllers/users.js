const User = require('../models/user');

// GET /users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// GET /users/:userId
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Usuario no encontrado',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de usuario no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// POST /users
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos de usuario no válidos',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};
// PATCH /users/me
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Datos de perfil no válidos',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Usuario no encontrado',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de usuario no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};

// PATCH /users/me/avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Avatar no válido',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Usuario no encontrado',
        });
      }

      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de usuario no válido',
        });
      }

      res.status(500).send({
        message: 'Error del servidor',
      });
    });
};