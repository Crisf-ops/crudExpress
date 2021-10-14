const http = require('http');
const express = require('express');
var cors = require('cors');

const itemRouter = require('../controller/controller');

const app = express();
app.use(express.json());

app.use('/reservas', itemRouter);

app.use('/', function (req, res){
    res.send('API de pruebas está trabajando :)');
})

const server = http.createServer(app)
const port = 3000;
server.listen(port);
console.log('Servidor esta escuchando en el puerto: ' + port);