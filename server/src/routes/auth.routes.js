const authRouter = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
//регистрация
authRouter.post('/signup', AuthController.signUp);
//вход
authRouter.post('/signin', AuthController.login);
authRouter.get('/logout', AuthController.logout);
authRouter.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);

module.exports = authRouter;
