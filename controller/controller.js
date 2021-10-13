const express = require('express')
const router = express.Router();

router.get('/', function (req,res) {
    res.status(200).json(data)
})
//Leer 
router.get('/:id',function (req,res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id)
    })
    if(found){
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})
//Crear
router.post('/',function (req,res) {
    let itemIds = data.map(item => item.id)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) +1 : 1

    let newItem = {
        id : newId,
        nombre: req.body.nombre,
        pais: req.body.pais,
        telefono: req.body.telefono,
        active: req.body.active,
        createdON: new Date()
    }
    data.push(newItem);
    res.status(201).json(newItem);
})
//Eliminar
router.delete('/id',function (req,res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let targetIndex = data.indexOf(found)
        data.splice(targetIndex,1)
        res.sendStatus(200)

    } else {
        res.sendStatus()
    }
})
//ACTUALIZAR
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            // el found.id sera siempre el id del que se consulto
            id: found.id, 
            //typeof = tipo de dato ejemplos si String, booleano o int
            // Si la condicion es verdadera actualizara el body del json si no quedara tal cual como esta
            Nombre: typeof(req.body.Nombre) != "undefined" ? req.body.name: found.Nombre,
            Pais: typeof(req.body.Pais) != "undefined" ? req.body.country: found.Pais,
            Telefono: typeof(req.body.Telefono) != "undefined" ? req.body.phone: found.Telefono,
            Active: typeof(req.body.Active) != "undefined" ? req.body.active: found.Active,
            createdOn: found.createdOn
        };
        let targetIndex = data.indexOf(found);
        //splice se utiliza para actualizar y para eliminar
        data.splice(targetIndex, 1, updated);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = controller;