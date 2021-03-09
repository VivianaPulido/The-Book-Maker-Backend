const express = require('express');
const router  = express.Router();
const signupController= require('../controllers/signupController')
const {check}= require('express-validator')

//signup
router.post('/signup',
  [
    check("username", "Nombre de usuario es un campo obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido por favor").isEmail(),
    check("password", "El password debe tener mínimo 6 caracteres por favor").isLength({min: 6})
  ],
  signupController.crearUsuario)

module.exports = router;