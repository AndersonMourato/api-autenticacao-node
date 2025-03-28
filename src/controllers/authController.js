const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        res.status(201).send({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Usuário ou senha inválida!' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao fazer login', error });
    }
};