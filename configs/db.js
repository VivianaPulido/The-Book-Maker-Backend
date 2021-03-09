const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})
//cuando tenga el cluster guardar el path en el env y poner despues del .connect process.env.DB_MONGO


const conectarDB= async () => {
  try{
    await mongoose.connect('mongodb://localhost/back', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log("DB Conectada")
  } catch (error){
    console.log(error)
    process.exit(1)
  }
}


  module.exports= conectarDB