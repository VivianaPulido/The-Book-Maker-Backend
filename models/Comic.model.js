const { Schema, model } = require('mongoose');


const comicSchema = new Schema({
  size:{
    type: String,
    enum: ["Standard: 17x21 cm", "Work-book: 19x23 cm", "Letter: 21.5x28 cm"]
  },
  color:{
    type: String,
    enum: ["Fullcolor"]
  },
  paper:{
    type: String,
    enum: ["Couche 150 gr."]
  },
  binding: {
    type: String,
    enum: ["Engrapado a lomo", "Hotmelt"],
  },
  cover: {
    type: String,
    enum: ["Brillante", "Mate"]
  },
  title: {
    type: String,
    required: [true, 'Escribe el nombre de tu Comic (con volumen será seriado) porfavor']
  },
  fileName: String,
  filePath: String,
  coverImgName: String,
  coverImgPath: String,
  synopsis: { type: String }
})

module.exports = model('Comic', comicSchema);