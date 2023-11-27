const express = require('express');
const router = express.Router();
const AbsenController = require('../controllers/AbsenController');

router.route('/absen')
    .get(AbsenController.listAllAbsen)
    .post(AbsenController.createAbsen);

router.route('/:id')
    .get(AbsenController.getAbsenById)
    .put(AbsenController.updateAbsen)
    .delete(AbsenController.deleteAbsen);

module.exports = router;
