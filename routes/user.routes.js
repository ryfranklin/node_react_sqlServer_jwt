var express = require('express')
const res = require('express/lib/response')
const login = require('../controllers/login.controller')
const register = require('../controllers/register.controller')

module.exports = app => {
    try {
        app.route('/login')
            .post(login.login)
    } catch (error) {
        res.status(500).json(error)
    }

    try {
        app.route('/register')
            .post(register.register)
    } catch (error) {
        res.status(500).json(error)
    }
}
