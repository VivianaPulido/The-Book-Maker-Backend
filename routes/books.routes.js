const {Router} = require('express');
const router  = new Router();
const mongoose= require('mongoose')
const Book= require('../models/Book.model')
const uploadCloud = require('../configs/cloudinary.config')

//crear libro
//PROBLEMA: creo que este metodo de cloudinary solo jala un archivo..en mi form hay 2...creo que el 'file' del arg es el nombre del input...mi otro input se llama image
router.post('/crear-libro', uploadCloud.single('filePath'), async (req, res, next) => {
  console.log(" si entra a la ruta")
  //const {size, words, color, paper, binding, cover, soporte, price, title, synopsis }= await req.body
  //const fileName= req.file.originalname
  //const filePath= req.file.path
  console.log(req.body, req.file)

  //poner validaciones después



})



module.exports = router;