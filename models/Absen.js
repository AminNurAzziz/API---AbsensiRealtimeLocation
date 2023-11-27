const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenSchema = new Schema({
    idPegawai: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status : {
        type: String,
        enum : ['Masuk','Istirahat','Kembali','Pulang'],
        required: true
    },
    keterangan: {
        type: String,
        enum : ['Disiplin','Terlambat','Tidak Masuk'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    Image: {
        type: String,
        required: false
    },
    lat : {
        type: String,
        required: false
    },
    long : {
        type: String,
        required: false
    }
});

absenSchema.pre('save', async function(next) {
    try {
        // Cari informasi user berdasarkan idUser
        const user = await mongoose.model('User').findById(this.idPegawai);
        // Validasi bahwa user memiliki peran 'Pegawai' sebelum menyimpan absen
        if (user && user.role === 'Pegawai') {
            next();
        } else {
            throw new Error('Hanya Pegawai yang dapat melakukan absen.');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Absen', absenSchema);