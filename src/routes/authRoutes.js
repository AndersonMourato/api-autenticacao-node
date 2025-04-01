const express = require('express');
const { signup, login, getUsers } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API de autenticação
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nome do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         avatar:
 *           type: string
 *           description: Avatar do usuário (blob)
 *       required:
 *         - username
 *         - password
 *         - email
 *     UserLogin:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nome do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *       required:
 *         - username
 *         - password
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/list-users:
 *   get:
 *     summary: Lista de usuários
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário
 *                   username:
 *                     type: string
 *                     description: Nome do usuário
 *             example:
 *               - id: 1
 *                 username: Username1
 */
router.get('/list-users', verifyToken, getUsers);

module.exports = router;