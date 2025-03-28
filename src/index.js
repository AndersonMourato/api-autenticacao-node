const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

//require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


sequelize.sync()
    .then(() => {
        console.log('Sincronizado com o banco de dados MySQL');
    })
    .catch(err => {
        console.error('Erro ao sincronizar com o banco de dados MySQL', err);
    });


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);

});