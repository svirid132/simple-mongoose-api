const express = require('express')
const userController = require('./controller/userController')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    const obj = {
        house: '5',
        mother: 'Julia'
    }
    const types = [
        'application/json',
        'application/pdf'
    ]
    console.info(req.accepts(types))
    res.json(obj)
})

app.get('/users', userController.users)
app.post('/user', userController.addUser)
app.put('/user', userController.updateUser)
app.delete('/user', userController.deleteUser)

app.listen(3000, () => {
    console.log('listen port 3000')
});