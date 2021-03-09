const User= require('../models/User.model')
const bcrypt= require('bcrypt')
const {validationResult}= require('express-validator')
const jwt= require("jsonwebtoken")

exports.crearUsuario= async (req, res) => {

  // Revisar si hay errores (metodos del express-valdator, checar libreria)
  const errores = validationResult(req)

  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()}) 
  }

  // EXTRAER EMAIL Y PASSWORD
  const { username, email, password } = req.body

  try {
    // Revisar que el usuario registrado sea único
    let usuario = await User.findOne({email})
    
    if(usuario){
        return res.status(400).json({msg: "Una cuenta con este email ya está registrada" })
    }

    // guardar el nuevo usuario
    usuario = new User(req.body)

    // Hashear el password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)

    // Guardar usuario
    await usuario.save()

    // CREAR JWT
    const payload = {
        usuario: {
            id: usuario.id 
        }
    }
console.log(payload, process.env.SECRETA)
    // FIRMAR EL JWT
    jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 360000
    }, (error, token) => {
        if(error) throw error

        // Mensaje de confirmación
        res.json({token}) 

    })

  } catch(error){
      console.log(error)
      res.status(400).send(error.message) 
  }

} 