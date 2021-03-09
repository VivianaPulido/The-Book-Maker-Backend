// Rutas para autenticar usuarios
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

// Iniciar sesión
router.post('/login', 
        [
          check("email", "Agrega un email válido").isEmail(),
          check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 6})
        ], 
        authController.autenticarUsuario
    )

router.get('/login', 
        auth,
        authController.usuarioAutenticado
)


module.exports =  router