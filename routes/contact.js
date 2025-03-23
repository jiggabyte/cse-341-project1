const express = require('express');

const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ "message": "Hello World!" });
});

// GET All
router.get('/users', contactController.getAllUsers);

// GET One
router.get('/get-user/:user_id', contactController.getUser);

// POST a User
router.post('/add-user', contactController.addUser);

// PUT a User (Update)
router.put('/update-user/:user_id', contactController.updateUser);

// DELETE a User
router.delete('/delete-user/:user_id', contactController.deleteUser);

module.exports = router;
