'use strict';

const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const SensorSchema = Schema({
    namePrensa: String,
    nameSensor: String,
    typeSensor: String,
    valueSensor: Number, 
    createdDateTime:{type:Date,default : Date.now()}
})

module.exports=mongoose.model('Sensor',SensorSchema)