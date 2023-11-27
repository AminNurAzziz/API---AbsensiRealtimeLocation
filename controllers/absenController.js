const Absen = require('../models/Absen');
const moment = require('moment-timezone');



class AbsenController {
    static async listAllAbsen(req, res) {
        try {
            const allAbsen = await Absen.find().populate('idPegawai');
            const formattedAbsen = allAbsen.map(absen => {
                return {
                    id: absen._id,
                    idPegawai: absen.idPegawai,
                    status: absen.status,
                    keterangan: absen.keterangan,
                    timestamp: moment(absen.timestamp).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
                    images: absen.Image,
                    lat: absen.lat,
                    long: absen.long,
                };
            });
            console.log(formattedAbsen);
            res.status(200).json({
                error: false,
                message: 'Successfully retrieved all absen records.',
                absen: formattedAbsen,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
    }
    static async createAbsen(req, res) {
        try {
            const { idPegawai, status,lat, long } = req.body;
            const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            // Define the expected maximum time for each status
            const expectedMaxTime = {
                'Masuk': '07:00:00',
                'Istirahat': '12:00:00',
                'Kembali': '13:00:00',
                'Pulang': '17:00:00',
            };
    
            // Parse the timestamp and expected maximum time
            const submissionTime = moment(timestamp);
            const expectedMaxSubmissionTime = moment(`${moment().format('YYYY-MM-DD')} ${expectedMaxTime[status]}`, 'YYYY-MM-DD HH:mm:ss');
    
            // Check if the submission is late
            const isLate = submissionTime.isAfter(expectedMaxSubmissionTime);
    
            // Jika terlambat, ubah status menjadi "Terlambat"
            const newKeterangan = isLate ? 'Terlambat' : 'Disiplin';
            const newAbsen = new Absen({ idPegawai, status, keterangan: newKeterangan, timestamp, lat, long });
            console.log(req.file);
            if (req.file) {
                newAbsen.Image = req.file.filename;
            }
            console.log(newAbsen);
            const savedAbsen = await newAbsen.save();
    
            res.status(201).json({
                error: false,
                message: 'Successfully created a new absen record.',
                absen: savedAbsen,
            });
            console.log("berhasil");
        } catch (error) {
            res.status(400).json({
                error: true,
                message: 'Bad Request. Please check your request data.',
            });
            console.log("gagal");
            console.log(error);
        }
    }
    static async getAbsenById(req, res) {
        const absenId = req.params.id;

        try {
            const absen = await Absen.findById(absenId);

            if (!absen) {
                return res.status(404).json({
                    error: true,
                    message: 'Absen record not found.',
                });
            }

            res.status(200).json({
                error: false,
                message: 'Successfully retrieved the absen record.',
                absen: absen,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
    }

    static async updateAbsen(req, res) {
        const absenId = req.params.id;

        try {
            // Update logic here...
            res.status(200).json({
                error: false,
                message: 'Successfully updated the absen record.',
            });
        } catch (error) {
            res.status(400).json({
                error: true,
                message: 'Bad Request. Please check your request data.',
            });
        }
    }

    static async deleteAbsen(req, res) {
        const absenId = req.params.id;
        try {
            // Delete logic here...
            res.status(200).json({
                error: false,
                message: 'Successfully deleted the absen record.',
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
    }
}

module.exports = AbsenController;
