const express = require('express');
const upload = require('../middlewares/upload');
const cloudinary = require('../config/cloudinary');
const catchAsync = require('../utils/catchAsync');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  upload.array('images', 5),
  catchAsync(async (req, res) => {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'shopswift/products',
      });
      urls.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
    res.send(urls);
  })
);

module.exports = router;
