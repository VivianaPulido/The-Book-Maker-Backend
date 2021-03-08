const { Schema, model } = require('mongoose');
const Memory= require('./Book.model')


const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    unique: true,
    lowercase: true,
    trim: true
    },  
  password: String,
  books: [{type: Schema.Types.ObjectId, ref: "Book"}],
  magazines: [{type: Schema.Types.ObjectId, ref: "Magazine"}],
  comics: [{type: Schema.Types.ObjectId, ref: "Comic"}]
},
{
  timestamps: true
});


module.exports = model('User', userSchema);