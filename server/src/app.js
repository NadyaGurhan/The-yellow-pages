const express = require('express');
const serverConfig = require('./configs/serverConfig');
// const apiRouter = require('./routes/apiRouter');
require('dotenv').config();
const authRouter = require('./routes/auth.routes');
const companyRouter = require('./routes/companyRoutes');

const app = express();

serverConfig(app);

app.use('/api', authRouter);
app.use('/api', companyRouter);


app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Сервер запушен на ${PORT}`));
