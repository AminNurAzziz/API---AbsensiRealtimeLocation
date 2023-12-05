const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Pegawai', 'Admin'],
        required: true
    },
    pw: {
        type: String,
        required: false
    },
});

// Use email as the username
userSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameUnique: false });

module.exports = mongoose.model('User', userSchema);

// Koordinator, magang ndek app di duplikasi buat absen anak casual, ndek kerjoan ada anak casual

