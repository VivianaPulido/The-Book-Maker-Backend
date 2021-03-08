
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'book-maker', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'pdf'],//este campo se lo había quitado porque creo que si no se lo pones, se queda en aceptar todos por default?
  params: { resource_type: 'raw' },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});


module.exports= multer({storage})

