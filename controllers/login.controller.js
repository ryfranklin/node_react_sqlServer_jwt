const userModel = require('../models/user.model')

const login = async(req, res) => {
    try {
        const login = await userModel.login();
        res.status(200).send(login)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    login
}