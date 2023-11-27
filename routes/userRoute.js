const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/userController');

router.route('/pegawai')
    .get(UserController.listAllPegawai);

router.route('/register')
    .post(UserController.register);

router.route('/login')
.post(passport.authenticate('local', { session: false }), UserController.login);

router.route('/logout')
    .get(UserController.logout);

module.exports = router;

