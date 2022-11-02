const db = require('../db')

exports.users = async (req, res) => {
    const users = await db.getUsers()
    const context = users.map(user => ({
        name: user.name,
        password: user.password,
        email: user.email
    }))
    res.json(context)
}

exports.addUser = async (req, res) => {
    const user = req.body
    await db.addUser(user)
    res.redirect(303, '/users')
}

exports.updateUser = async (req, res) => {
    const user = req.body
    await db.updateUser(user)
    res.redirect(303, '/users')
}

exports.deleteUser = async (req, res) => {
    const user = req.body
    await db.deleteUser(user)
    res.redirect(303, '/users')
}