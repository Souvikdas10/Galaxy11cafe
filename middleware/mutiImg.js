const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, files, cb) {
    let ext = path.extname(files.originalname);
    cb(null, Date.now() + ext);
  }
});

const uploadImages = multer({
  storage: storage,
  fileFilter: function (req, files, callback) {
    console.log(files,'done');
    if (
      files.mimetype == 'image/png' ||
      files.mimetype == 'image/jpg' ||
      files.mimetype == 'image/jpeg'
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

module.exports = uploadImages.array('image', 10); // allow up to 10 files to be uploaded