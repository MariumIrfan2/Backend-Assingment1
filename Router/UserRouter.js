const express = require('express');
const route = express.Router();
const AuthController = require('../Controllers/AuthController')
const bcrypt = require("bcryptjs");

route.post('/signup', AuthController.signup)

route.post('/login', AuthController.login)

route.get('/test', AuthController.protected, (req, res) => {
    res.send("User Valid")
})

module.exports = route;