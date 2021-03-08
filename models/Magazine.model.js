const { Schema, model } = require('mongoose');


const magazineSchema = new Schema({
  size:{
    type: String,
    enum: ["Pocket: 10.5x17 cm", "Travel: 14x21 cm", "Standard: 17x21 cm", "Work-book: 19x23 cm"]
  },
  color:{
    type: String,
    enum: ["Blanco y Negro", "Fullcolor"]
  },
  paper:{
    type: String,
    enum: ["Bond blanco 90 gr.", "Couche 150 gr."]
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
    required: [true, 'Escribe el nombre de tu revista porfavor']
  },
  fileName: String,
  filePath: String,
  coverImgName: String,
  coverImgPath: String,
})

module.exports = model('Magazine', magazineSchema);