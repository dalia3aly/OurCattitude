// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({ storage: storage, fileFilter: function (req, file, cb) {
//     if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
//       return cb(new Error('Only PNG and JPEG images are allowed'))
//     }
//     cb(null, true)
//   }
// })

// module.exports = upload;