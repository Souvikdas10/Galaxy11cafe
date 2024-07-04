const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const uploadImages = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      console.log('Select a valid image format');
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
    files: 10 // allow up to 10 files to be uploaded
  }
});

module.exports = uploadImages.array('images', 10); // allow up to 10 files to be uploaded