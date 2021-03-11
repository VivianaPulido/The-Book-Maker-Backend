
const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const auth = require('../middleware/auth')
const { check } = require("express-validator")


// Crea proyectos
router.post('/crear-libro', 
    auth,
    [
        check('title', "El título del libro es obligatorio").not().isEmpty()
    ],
    booksController.crearLibro
)


// Obtener todos los proyectos
router.get('/mis-obras', 
    auth, // Revisar siempre que el usuario esté autenticado
    booksController.obtenerLibros
) 

// Actualizar proyecto via ID
router.put("/mis-obras/:id", 
    auth, // Revisar siempre que el usuario esté autenticado
    [
        check('title', "El título del libro es obligatorio").not().isEmpty()
    ],
    booksController.actualizarLibro
)


// Eliminar un proyecto

router.delete('/eliminar/:id',
    auth,
    booksController.eliminarLibro 
)

//Obtener in libro es específico

router.get('/detalles/:id',
    auth,
    booksController.obtenerLibro
)

module.exports = router;