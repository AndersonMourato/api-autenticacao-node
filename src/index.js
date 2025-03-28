const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);

});