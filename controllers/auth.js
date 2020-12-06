
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const jwt = require('../helpers/jwt');

const createUser = async (req, res) => {

    const { email } = req.body;

    if (await User.findOne({ email })) {
        res.status(500).json({
            ok: false,
            msg: 'Email already registereds',
        });
    }

    const user = new User(req.body);


    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.json({
        ok: true,
        token,
        user
    });
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ email });
        console.log(user.email);
        if (user) {
            const token = await generateJWT(user.id);

            if (bcrypt.compareSync(password, user.password)) {
                return res.status(200).json({
                    ok: true,
                    user,
                    token
                });
            }
        }

        res.status(400).json({
            ok: false
        });

    } catch (err) {
        return res.status(500).json({
            ok: false
        });
    }
}

const refreshToken = async (req, res) => {

    const uid = req.uid.uid;
    console.log(uid);
    try {
        const user = await User.findById(uid);
        const token = await jwt.generateJWT(uid);

        return res.status(200).json({
            ok: true,
            user,
            token
        });
    } catch (err) {
        return res.status(500).json({
            ok: false
        });
    }
};

module.exports = {
    createUser,
    login,
    refreshToken
}