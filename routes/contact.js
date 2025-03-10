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

module.exports = router;
