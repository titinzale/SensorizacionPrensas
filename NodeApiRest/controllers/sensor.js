'use strict'

const Sensor = require('../models/sensor')
const service=require('../services')
const TokenRights=require('../Models/tokenRights.js')

function getSensor (req, res) {
  let sensorId = req.params.sensorId

  Sensor.findById(sensorId, (err, sensor) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!sensor) return res.status(404).send({message: `El dato del sensor no existe`})

    res.status(200).send({ sensor })
  })
}

function getSensors (req, res) {
  console.log('GET. Punto 1')
  validateToken(req, res, 'R', () => {
    console.log('GET. Punto2')
    var hasError=false;
    Sensor.find({}, (err, sensors) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!sensors) return res.status(404).send({message: 'No existen datos de sensores'})
      res.send(200, { sensors })
      console.log('GET. Punto3')
    })
  })
}



function getSensorsDates (req, res) {
  let fechaIni = req.params.fechaIni
  let fechaFin = req.params.fechaFin
  var Prensa = req.params.Prensa
  var dateIni = new Date(fechaIni);
  var moment = require('moment');
  var dateIni = moment(fechaIni,'DDMMYYYY').toDate();
  var dateFin = moment(fechaFin,'DDMMYYYY').toDate();
  console.log('fechaIni-fechaFin y prensa: '+dateIni+'-'+dateFin+' y '+Prensa)
  validateToken(req, res, 'R', () => {
    var hasError=false;
    Sensor.find({"createdDateTime":{"$gte": dateIni, "$lt": dateFin},"namePrensa":Prensa}, (err, sensors) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!sensors) return res.status(404).send({message: 'No existen datos de sensores'})
      res.send(200, { sensors })
    })
  })
}


function getSensorsDate2 (req, res) {
  console.log('GET. Punto 1')
  validateToken(req, res, 'R', () => {
    console.log('GET. Punto2')
    var hasError=false;
    Sensor.find({"createdDateTime":{"$gte": new Date("2018-07-06T21:20:09.133+02:00"), "$lt": new Date("2018-07-07T21:14:09.133+02:00")}}, (err, sensors) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!sensors) return res.status(404).send({message: 'No existen datos de sensores'})
      res.send(200, { sensors })
      console.log('GET. Punto3')
    })
  })
}


function saveSensor (req, res) {
  console.log('POST /api/sensor')
  console.log(req.body)
  
    validateToken(req, res, 'W', () => {
            console.log(req.body)
            var hasError=false;
            console.log('Es array?',Array.isArray(req.body));
            if (Array.isArray(req.body)) {
                console.log(req.body[0]);
                for (var i= 0;i<req.body.length;i++){
                       let sensor = new Sensor(req.body[i])
                       //console.log('query: ', req.query)
                       sensor.save((err, sensorStored) => {  
                           if (err) {
                                hasError=true;
                                console.log('req.body: ', req.body[i])
                           }
                        })
                }
                console.log('HasError: ',hasError);
                if (hasError) {
                    console.log('HasErrorDentro: ',hasError);
                    res.status(500).send({message: `Error al salvar algun elemento del Array en la base de datos`})
                }
                else {                    
                    console.log('HasErrorFuera: ',hasError);
                    res.status(200).send({ sensor: 'ok' })      
                }
            }
            
            else
            { 
                let sensor = new Sensor(req.body)
                console.log('query: ', req.query)
                sensor.save((err, sensorStored) => 
                {
                    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
                    res.status(200).send({ sensor: sensorStored })
                })
            }
           
    })
    
    
}

function updateSensor (req, res) {
  let sensorId = req.params.sensorId
  let update = req.body

  Sensor.findByIdAndUpdate(sensorId, update, (err, sensorUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el datos del sensor: ${err}`})

    res.status(200).send({ sensor: sensorUpdated })
  })
}

function deleteSensor (req, res) {
  let sensorId = req.params.sensorId

  Sensor.findById(sensorId, (err, sensor) => {
    if (err) res.status(500).send({message: `Error al borrar el dato del sensor: ${err}`})

    sensor.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el sensor: ${err}`})
      res.status(200).send({message: 'El dato del sensor ha sido eliminado'})
    })
  })
}

function validateToken(req, res, requiredRigths, callback) {
    console.log("Log: " + req.headers['authorization'].replace('Bearer ', ''))
    TokenRights.findOne({token: req.headers['authorization'].replace('Bearer ', '')}, (err, tokenRights) => {
        if(err)
            return res.status(500).send({message: 'Ha ocurrido un problema'})
        
        if (!tokenRights)
            return res.status(404).send({message: 'No se ha podido verificar usuario'})
        
        console.log("Derechos: " + tokenRights.rights)
        if(tokenRights.rights != requiredRigths)
            return res.status(401).send({message: 'El usuario no tiene permisos para realizar esta operación'})
        
        callback.call()
    })
   
}

module.exports = {
  getSensor,
  getSensors,
  getSensorsDates,
  saveSensor,
  updateSensor,
  deleteSensor
}