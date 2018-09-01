'use strict';

const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const TokenRightsSchema = Schema({
    token: String,
    rights: String,
    IP: String,
    sensor: String, 
    createdDateTime:{type:Date,default : Date.now()}
})

module.exports=mongoose.model('TokenRights',TokenRightsSchema)