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

// Actualiza un proyecto

exports.actualizarLibro = async(req,res) => {
    
    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // extraer la información del proyecto
    const {title} = req.body

    // Creamos un proyecto vacío donde le insertaremos la nueva info
    const nuevoLibro = {}

    if(title){ // Anexa el nombre al proyecto
        nuevoLibro.title = title;
    }

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
           res.json({msg: "Proyecto eliminado"})

    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }


}