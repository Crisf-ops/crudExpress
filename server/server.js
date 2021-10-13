const http = require('http')
const express = require('express')

let cors = require('cors');

const itemRouter = require('../routes/reservas')

const app = express()
app.use(express.json)

app.use('/reservas',itemRouter)

app.use('/', function () {
    res.send('Api de pruebas')
})

const server = http.createServer(app)
const port = 3000
server.listen(port)
console.log('Servidor esta escuchando en el 3000')