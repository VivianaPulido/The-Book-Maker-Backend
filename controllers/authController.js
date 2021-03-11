const User= require('../models/User.model')
const bcrypt= require('bcrypt')
const {validationResult} = require('express-validator')
const jwt= require('jsonwebtoken')

exports.autenticarUsuario = async (req,res) => {
    
  // Revisar si hay errores
  const errores = validationResult(req)
  console.log(errores)

  if(!errores.isEmpty()){
      return res.status(400).json({errores: errores.array()}) 
  }
  
  // Extraer el email y password
  const {email, password} = req.body

  try{
      // Revisar que sea un usuario registrado
      let usuario = await User.findOne({email})
      console.log("obteniendo usuario:", usuario)

      if(!usuario){
          return res.status(400).json({msg: "Este usuario no está registrado"})
      }

      // Revisar el password    
      const passCorrecto = await bcrypt.compare(password, usuario.password)
      
      if(!passCorrecto){
          return await res.status(400).json({msg: "Password incorrecto"})
      }

      // Si todo correcto, crear JSON WEB TOKEN
      const payload = {
          usuario: {
              id: usuario._id
          }
      }

      jwt.sign(payload, process.env.SECRETA, {
          expiresIn: 3600
      }, (error, token) => {
          if(error) throw error;

          // MENSAJE DE CONFIRMACIÓN
          console.log(token)
          res.json({token})
      })


  }  catch (error) {
      console.log(error)
  }
}


// Obtiene que usuario está autenticado

exports.usuarioAutenticado = async (req, res) => {
  try {
      const usuario = await User.findById(req.usuario._id).select('-password')
      console.log("usuario:", usuario)
      res.json({usuario})
  } catch(error){
      console.log(error)
      res.status(500).json({msg: "Hubo un error"})
  }
}