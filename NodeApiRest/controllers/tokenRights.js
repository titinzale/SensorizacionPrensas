'use strict'

const tokenRights = require('../models/tokenRights')

function gettokenRight (req, res) {
  let tokenRightsId = req.params.tokenRightsId

  tokenRights.findById(tokenRightsId, (err, tokenRights) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!tokenRights) return res.status(404).send({message: `El dato del token no existe`})

    res.status(200).send({ tokenRights })
  })
}

function gettokenRights (req, res) {
  tokenRights.find({}, (err, tokenRights) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!tokenRights) return res.status(404).send({message: 'No existen datos de tokenRights'})

    res.send(200, { tokenRights })
  })
}

function savetokenRights (req, res) {
  console.log('POST /api/tokenRights')
    console.log('hola')
  console.log(req.body)
    console.log('hola1')
    console.log('body: ', req.body)
  console.log('query: ', req.query)

  //let sensor = new Sensor()
  //sensor.namePrensa = req.body.namePrensa
  //sensor.nameSensor = req.body.nameSensor
  //sensor.typeSensor = req.body.typeSensor
  //sensor.valueSensor = req.body.valueSensor
  let tokenRights = new tokenRights(req.body)

  tokenRights.save((err, tokenRightsStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ tokenRights: tokenRightsStored })
  })
}

function updatetokenRights (req, res) {
  let tokenRightsId = req.params.tokenRightsId
  let update = req.body

  tokenRights.findByIdAndUpdate(tokenRightsId, update, (err, tokenRightsUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el datos del tokenRights: ${err}`})

    res.status(200).send({ tokenRights: tokenRightsUpdated })
  })
}

function deletetokenRights (req, res) {
  let tokenRightsId = req.params.tokenRightsId

  tokenRights.findById(tokenRightsId, (err, tokenRights) => {
    if (err) res.status(500).send({message: `Error al borrar el dato del tokenRights: ${err}`})

    tokenRights.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el tokenRights: ${err}`})
      res.status(200).send({message: 'El dato del tokenRights ha sido eliminado'})
    })
  })
}

module.exports = {
  gettokenRight,
  gettokenRights,
  savetokenRights,
  updatetokenRights,
  deletetokenRights
}