const express = require('express')
const router = express.Router();
const data = require('../models/data')
const dataUser = require('../models/dataUser')

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
    let  itemIds= data.map (item => item.id);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) +1 : 1;

// let newItem = {
//     id: newId,
//     nombre: req.body.nombre,
//     pais: req.body.pais,
//     telefono: req.body.Telefono,
//     active: req.body.active,
//     createdOn: new Date()
//     }   
    let newUser = new dataUser(newId,req.body.nombre,req.body.pais,req.body.telefono,req.body.active,new Date())

    data.push(newUser);
    res.status(201).json(newUser);
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
            id: found.id, 
            nombre: typeof(req.body.nombre) != "undefined" ? req.body.nombre: found.nombre,
            pais: typeof(req.body.pais) != "undefined" ? req.body.pais: found.pais,
            telefono: typeof(req.body.Telefono) != "undefined" ? req.body.telefono: found.telefono,
            active: typeof(req.body.active) != "undefined" ? req.body.active: found.active,
            createdOn: found.createdOn
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updated);

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;