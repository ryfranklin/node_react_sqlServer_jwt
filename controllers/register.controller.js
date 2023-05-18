const userModel = require('../models/user.model')

const register = async(req, res) => {
    try {
        const register = userModel.register();
        res.status(200).send(register)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    register
}