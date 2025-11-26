const express = require('express');
const CompanyController = require('../controllers/CompanyController');
const validateId = require('../middlewares/validateId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const companyRouter = express.Router();

companyRouter.get('/', CompanyController.getAllCompanies);
companyRouter.get('/even', CompanyController.getAllEvenCompanies);
companyRouter.post('/add', verifyAccessToken, CompanyController.createCompany);
companyRouter.get('/mynumbers', verifyAccessToken, CompanyController.getMyCompanies);
companyRouter.get('/:id', validateId, CompanyController.getOneCompany);
companyRouter.put('/:id', validateId, verifyAccessToken, CompanyController.updateCompany);
companyRouter.delete('/:id', validateId, verifyAccessToken, CompanyController.deleteCompany);

module.exports = companyRouter;