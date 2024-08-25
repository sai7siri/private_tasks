
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
 

cloudinary.config({
   cloud_name : process.env.CLOUD_NAME,
   api_key : process.env.API_KEY,
   api_secret : process.env.API_SECRET,
})

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'movies/users',
    format: async (req, file) => {
      
      const allowedFormats = ['jpg', 'png', 'jpeg', 'gif'];
      const extension = file.originalname.split('.').pop().toLowerCase();
      
      if (allowedFormats.includes(extension)) {
         return extension;  // Return the file extension
       }
       return 'jpg'; 
    },
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});
 
const upload = multer({ storage: storage });
 
module.exports = {upload};