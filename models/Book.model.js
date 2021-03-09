const { Schema, model } = require('mongoose');
const mongoose= require('mongoose')


const bookSchema = new Schema({
  typeOfProd:{
    type:String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  size:{
    type: String,
    enum: ["Pocket: 10.5x17 cm", "Travel: 14x21 cm", "Standard: 17x21 cm", "Work-book: 19x23 cm"],
    required: [true, "Indique el formato (tamaño) de su libro por favor"]
  },
  words: {
    type: Number,
    required: [true, "Proporcione el número de palabras de su escrito por favor"]
  },
  color:{
    type: String,
    enum: ["Blanco y Negro", "Mixto", "Fullcolor"],
    required: [true, "Indique el modo de color de los interiores por favor"]
  },
  paper:{
    type: String,
    enum: ["Bond blanco 90 gr.", "Bond color marfil 90 gr."],
    required: [true, "Indique el tipo de papel para su libro por favor"]
  },
  binding: {
    type: String,
    enum: ["Engrapado a lomo", "Engargolado metálico", "Engargolado plástico", "Hotmelt"],
    required: [true, "Indique el tipo de encuadernación por favor"]
  },
  cover: {
    type: String,
    enum: ["Brillante", "Mate", "Portada rígida", "Portada semirígida"],
    required: [true, "Indique el tipo de acabado para la portada por favor"]
  },
  soporte: {
    type: String,
  },
  price: Number,
  title: {
    type: String,
    required: [true, 'Escribe el título de tu libro porfavor']
  },
  // fileName: {
  //   type:String
  // },  
  // filePath: String,
  // coverImgName: String,
  // coverImgPath: String,
},
{
  timestamps: true
});

module.exports = model('Book', bookSchema);