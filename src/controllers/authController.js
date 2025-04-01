const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/authRoutes');
require('dotenv').config();

exports.signup = async (req, res) => {
    const { username, password, email, avatar } = req.body;
    try {
        const user = await User.create({ username, password, email, avatar });
        res.status(201).send({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar usuário', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Usuário ou senha inválida!' });
        }
        const token = jwt.sign( {...user} , process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao fazer login', error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const userList = await User.findAll();
        const users = userList.map(user => {
            return {
                id: user.id,
                username: user.username,
            };
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar usuários', error });
    }
};