'use strict'

const express = require('express')
const sensorCtrl=require('../controllers/sensor')
const userCtrl=require('../controllers/user')
const auth=require('../middlewares/auth' )
const api = express.Router()

const bodyParser = require('body-parser')


api.get('/sensor', auth, sensorCtrl.getSensors);
api.get('/sensor/:sensorId',sensorCtrl.getSensor)
api.get('/sensorDate/:fechaIni/:fechaFin/:Prensa',sensorCtrl.getSensorsDates)
api.post('/sensor/',auth,sensorCtrl.saveSensor)
api.put('/sensor/:sensorId',auth,sensorCtrl.updateSensor)
api.delete('/sensor/:sensorId', auth, sensorCtrl.deleteSensor);
api.post('/signUp',userCtrl.signUp)
api.post('/signIn',userCtrl.signIn)
api.get('/private',auth, function(req,res){
        res.status(200).send({message:'Tienes acceso'}) 
})

module.exports=api