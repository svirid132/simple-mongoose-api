const mongoose = require('mongoose')
const User = require('./model/user')
const Additional = require('./model/additional')

const credentials = 'mongodb://localhost:27017/mongo_test'

mongoose.connect(credentials)
const db = mongoose.connection
db.on('error', err => {
    console.error('Ошибка MongoDB:', err.message)
    process.exit(1)
})
db.once('open', () => console.log('Соеднинение с MongoDB установлено'))

//Добавляем первых пользователей
async function addUser() {
    const user = await User.findOne({name: 'Саша', password: 'password', email: 'svirid132@gmail.com'})
    if (user) return

    new User({
        name: 'Саша',
        password: 'password',
        email: 'svirid132@gmail.com'
    }).save()
}
addUser()

const addAdditional = async () => {
    let additional = await Additional.findOne({keyWord: 'слышь ты пес, ты что делаешь'})
    if(!additional) {
        additional = new Additional({
            keyWord: 'слышь ты пес, ты что делаешь'
        }).save()
    }

    const user = await User.findOne({name: 'Саша', password: 'password', email: 'svirid132@gmail.com'})
    User.updateOne({
        name: 'Саша',
        password: 'password',
        email: 'svirid132@gmail.com'
    }, {idAdditional: additional._id})
    .catch((err) => console.error(err))
}
addAdditional()

async function findAdditional() {
    const user = await User.findOne({name: 'Саша', password: 'password', email: 'svirid132@gmail.com'})
    const additional = await Additional.findOne({_id: user.idAdditional})
    console.log(additional)
}
findAdditional()

module.exports = {
    addUser: async (user) => {
        console.log(user.name)
        new User(user).save()
    },
    updateUser: async (user) => {
        await User.updateOne( 
        { email: user.email }, 
        { 
            password: user.password,
            name: user.name 
        },
        { upsert: true }
        )
    },
    deleteUser: async (user) => {
        await User.deleteOne({ email: user.email })
            .then(() => console.log('delete ok'))
            .catch((err) => console.err(err))
    },
    getUsers: async (options) => await User.find(options)
}