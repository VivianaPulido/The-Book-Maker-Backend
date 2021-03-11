const { Schema, model } = require('mongoose');
const mongoose= require('mongoose')


const bookSchema = new Schema({
  typeOfProd:{
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  size:{
    type: String,
    enum: ["Pocket", "Travel", "Standard", "Workbook", "Letter"],
    //required: [true, "Selecciona el formato (tamaño) para tu proyecto por favor"]
  },
  words: {
    type: Number,
  },
  pages:{
    type: Number,
  },
  color:{
    type: String,
    enum: ["Blanco y Negro", "Mixto", "Fullcolor"],
    required: [true, "Seleccione el modo de color de los interiores por favor"]
  },
  paper:{
    type: String,
    enum: ["Bond blanco 90 gr.", "Bond color marfil 90 gr."],
    required: [true, "Selecciona un tipo de papel por favor"]
  },
  binding: {
    type: String,
    enum: ["Engrapado a lomo", "Engargolado metálico", "Engargolado plástico", "Hotmelt"],
    required: [true, "Selecciona un tipo de encuadernación por favor"]
  },
  cover: {
    type: String,
    enum: ["Brillante", "Mate"],
    required: [true, "Selecciona el tipo de acabado para la portada por favor"]
  },
  soporte: {
    type: String,
  },
  price: Number,
  title: {
    type: String,
    required: [true, 'Escribe el título de tu proyecto porfavor']
  },
  // fileName: String 
   filePath: String,
  // coverImgName: String,
   coverImgPath: String,
},
{
  timestamps: true
});

module.exports = model('Book', bookSchema);