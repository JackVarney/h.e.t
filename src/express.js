const express = require('express');
const userController = require('./api/user/user.controller');

const app = express();
app.use(express.json());

const router = express.Router();
userController.registerRoutes(router);
app.use(router);

module.exports = app;
