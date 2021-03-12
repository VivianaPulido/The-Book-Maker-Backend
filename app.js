//require('dotenv').config();

const express = require('express');
const conectarDB = require('./configs/db')
const cors = require('cors');

//crear servidor
const app = express();

//conectar a db
conectarDB()


app.use(cors({
  credentials: true,
  "Access-Control-Allow-Credentials": true,
  methods: ['GET','PUT','POST','DELETE','PATCH','OPTIONS'],
  origin: ["http://localhost:3000"]
}));

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



//Arrancar app
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`)
})


//module.exports = app;
