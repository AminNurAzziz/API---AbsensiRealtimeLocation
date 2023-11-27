const User = require('../models/User');
const passport = require('passport');

class UserController {

    static async listAllPegawai(req, res) {
        try {
            const users = await User.find({ role: 'Pegawai' });
            console.log(users);
            res.status(200).json({
                error: false,
                message: 'Success',
                pegawai: users,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Internal Server Error'+error.message,
            });
        }
    }

    static async register(req, res, next) {
        try {
            const { email, nama, role, password, pw } = req.body;
            const user = new User({ email, nama, role, pw });
            console.log(req.body);
            const registeredUser = await User.register(user, password);
            console.log("Berhasil");
            console.log(registeredUser);
            res.status(201).json({
                error: false,
                message: 'User registered successfully!',
            });
        } catch (error) {
            res.status(400).json({
                error: true,
                message: error.message,
            });
        }
    }

    static login(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    message: 'Internal Server Error',
                });
            }
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: 'Authentication failed',
                });
            }
            // Log in the user
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        message: 'Internal Server Error',
                    });
                }
                const userData = {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    // Add other user properties as needed
                };
                return res.status(200).json({
                    error: false,
                    message: 'User logged in successfully!',
                    user: userData,
                });
            });
        })(req, res, next);
    }

static logout(req, res) {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
        res.status(200).json({
            error: false,
            message: 'Logout successful',
        });
    });
}
}

module.exports = UserController;
