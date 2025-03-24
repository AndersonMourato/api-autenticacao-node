const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nome do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *       example:
 *         username: user
 *         password: pass
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API de autenticação
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);


module.exports = router;