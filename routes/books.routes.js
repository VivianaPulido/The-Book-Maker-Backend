// const {Router} = require('express');
// const router  = new Router();
// const mongoose= require('mongoose')
// const Book= require('../models/Book.model')
// const uploadCloud = require('../configs/cloudinary.config')

//crear libro
// router.post('/crear-libro', uploadCloud.single('coverImgPath'), async (req, res, next) => {

//   const {size, words, color, paper, binding, cover, soporte, price, title, synopsis }= await req.body
//   const fileName= req.file.originalname
//   const filePath= req.file.path
//   console.log(req.file)
  

//   const newBook= await Book.create({size, words, color, paper, binding, cover, soporte, price, title, synopsis, fileName, filePath})
  
//   const user= await User.findByIdAndUpdate(userId, { $push: { books: newBook._id}})
  
//   res.json({msg: "archivo creado"})
// })


// //eliminar libro
// router.post('/delete/:id', async(req, res, nest)=> {
//   const id = req.params.id
//   //console.log("Este es el id que encuentra", id)
//   const foundBook= await Book.findByIdAndDelete(id)
//   res.redirect('/profile')
// })


// //edit book
// router.post('/edit/:id', uploadCloud.single('filePath'), async(req, res, next) => {
//   const {size, words, color, paper, binding, cover, soporte, price, title, synopsis }= await req.body
  
//   const id= req.params.id

//   if(!req.file){
//     const bookChanges= await Book.findByIdAndUpdate(id, {$set:{size, words, color, paper, binding, cover, soporte, price, title, synopsis}}) 
//   }else{
//     const filePath= req.file.path
//     const fileName= req.file.originalname
//     const bookChanges= await Book.findByIdAndUpdate(id, {$set:{size, words, color, paper, binding, cover, soporte, price, title, synopsis, filePath, fileName}})
//     //console.log('Estos son los cambios:', bookChanges)
//   }
//   res.redirect('/profile')
// })

// module.exports = router;

const express = require('express')
const router = express.Router()
const booksController = require('../controllers/booksController')
const auth = require('../middleware/auth')
const { check } = require("express-validator")


// api/proyectos
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

module.exports = router;