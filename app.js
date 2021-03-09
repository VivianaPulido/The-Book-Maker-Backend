//require('dotenv').config();

const express = require('express');
const conectarDB = require('./configs/db')
const cors = require('cors');

//crear servidor
const app = express();

//conectar a db
conectarDB()

// Middleware Setup
//habilitar Cors (¿porque en el archivo de Mike ya no está esa config?)
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// Habilitar express.json. Permitir datos que el usuario envíe.
//Es la libreria igual a body parser
app.use(express.json({extended:true}))

//Puerto de la app
const PORT = process.env.PORT || 4000

//Ruteo
//const index = require('./routes/index');
const signupRouter = require('./routes/signup.routes');
const authRouter = require('./routes/auth.routes')
const bookRouter = require('./routes/books.routes')

//app.use('/', index);
app.use('/', signupRouter);
app.use('/', bookRouter);
app.use('/', authRouter)

//en teoría las ultimas 6 lineas son lo mismo que como lo tiene Mike

//Arrancar app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`)
})

//esta linea la teniamos en modulo 2...porque ya no la usamos?
//module.exports = app;
