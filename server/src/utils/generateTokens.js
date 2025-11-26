require('dotenv').config(); 
const jwt = require('jsonwebtoken'); // берем методы из модуля jsonwebtoken
const jwtConfig = require('../configs/jwtConfig'); // для настрой времени жизни токена


const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, jwtConfig.access),
  refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, jwtConfig.refresh),
});

module.exports = generateTokens;
