const express = require('express');
const router = express.Router();
const AbsenController = require('../controllers/absenController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.route('/absen')
    .get(AbsenController.listAllAbsen)
    .post(upload.single('gambar'), AbsenController.createAbsen);

router.route('/:id')
    .get(AbsenController.getAbsenById)
    .put(AbsenController.updateAbsen)
    .delete(AbsenController.deleteAbsen);

module.exports = router;
