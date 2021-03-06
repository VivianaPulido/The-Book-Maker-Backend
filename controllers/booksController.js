const Book = require('../models/Book.model')
const { validationResult } = require('express-validator')

exports.crearLibro = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        // Crear un nuevo proyecto
        const libro = new Book(req.body)

        // Guardar el creador via JWT
        libro.author = req.usuario.id

        // Guardamos el proyecto
        libro.save()
        res.json(libro)
        

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error")
    }
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerLibros = async (req, res) => {
    try{
        const libros = await Book.find({ author: req.usuario.id }).sort({creado: -1})
        res.json({ libros })

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


exports.actualizarLibro = async(req,res) => {
    
  // Revisar si hay errores
  const errores = validationResult(req)
  if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()})
  }

  // extraer la información del proyecto
  const {title, size, words, color, paper, binding, cover, price, coverImgPath, filePath} = req.body
  console.log(req.body)
  // Creamos un proyecto vacío donde le insertaremos la nueva info
  const nuevoLibro = {}

  if(title){ // Anexa el nombre al proyecto
      nuevoLibro.title = title;
  }
  if(size){ // Anexa el nombre al proyecto
    nuevoLibro.size = size;
  }
  if(words){ // Anexa el nombre al proyecto
    nuevoLibro.words = words;
  }
  if(color){ // Anexa el nombre al proyecto
    nuevoLibro.color = color;
  }
  if(paper){ // Anexa el nombre al proyecto
    nuevoLibro.paper = paper;
  }
  if(binding){ // Anexa el nombre al proyecto
    nuevoLibro.binding = binding;
  }
  if(cover){ // Anexa el nombre al proyecto
    nuevoLibro.cover = cover;
  }
  if(price){ // Anexa el nombre al proyecto
    nuevoLibro.price = price;
  }
  if(coverImgPath){ // Anexa el nombre al proyecto
    nuevoLibro.coverImgPath = coverImgPath;
  }
  if(filePath){ // Anexa el nombre al proyecto
    nuevoLibro.filePath = filePath;
  }

////Estoy modificando los id a _id a partir de aqui
 try{
      // Revisar el id
      let libro = await Book.findById(req.params.id)
      
      // Si el proyecto existe o no
      if(!libro) {
          return res.status(404).json({msg: "Libro no encontrado"})
      }

      // Verificar el creador del proyecto
      if(libro.author.toString() !== req.usuario.id){
          return res.status(401).json({msg: "No Autorizado"})
      }    

      // Actualizar
      libro = await Book.findByIdAndUpdate({_id: req.params.id.toString()}, { $set: nuevoLibro}, {new: true})
      res.json({libro})

  } catch(error){
          console.log(error)
  }
}


// Eliminar un proyecto por su ID

exports.eliminarLibro = async (req, res) => {

    try {
           // Revisar el id
           let libro = await Book.findById(req.params.id)
        
           // Si el proyecto existe o no
           if(!libro) {
               return res.status(404).json({msg: "Libro no encontrado"})
           }
   
           // Verificar el creador del proyecto
           if(libro.author.toString() !== req.usuario.id){
               return res.status(401).json({msg: "No Autorizado"})
           }    

           // Eliminar el proyecto
           await Book.findOneAndRemove({_id: req.params.id })
           res.status(200).json({msg: "Proyecto eliminado"})

    } catch (error) {
        console.log("es este", error)
        res.status(500).send("Error en el servidor")
    }


}


// Obtiene un proyecto específico 
exports.obtenerLibro = async (req, res) => {
  console.log(req.params)
  try{
       let libro = await Book.findById(req.params.id)
        
       if(!libro) {
           return res.status(404).json({msg: "Libro no encontrado"})
       }
console.log("Esto es libro", libro, "esto es req usuario", req.usuario)
       if(libro.author.toString() !== req.usuario.id){
           return res.status(401).json({msg: "No Autorizado"})
       }    
       res.status(200).json({libro})
  } catch(error){
      console.log(error)
      res.status(500).send('Hubo un error')
  }
}