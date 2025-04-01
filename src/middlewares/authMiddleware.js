const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Token inválido' });
    }
};

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token && jwt.verify(token, process.env.JWT_SECRET)) {
        next();
    }else{
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }
}
