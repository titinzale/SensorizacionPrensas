'use strict';

const jwt=require('jwt-simple')
const moment=require('moment')
const config=require('../config')
const TokenRights = require('../Models/tokenRights')



function createToken(user){
    const payload={
        sub:user._id       
    }
    var token = jwt.encode(payload,config.SECRET_TOKEN)
    
    var tokenRights = new TokenRights({
        token: token,
        rights: user.rights,
        IP: '',
        sensor: ''
    })
    
    tokenRights.save((err)=>{
        if(err) reject({
                status:500,
                message:'Could not save token rights'
            })
    })
    
    return token;
}

function decodeToken(token){
    const decoded=new Promise ((resolve,reject)=>{
        try{
            const payload=jwt.decode(token,config.SECRET_TOKEN)
            if (payload.exp<=moment().unix()){
                reject({
                    status:401,
                    message:'El token ha expirado'
                }) 
            }
        resolve(payload.sub)
        }catch(err){
            reject({
                status:500,
                message:'Invalid Token'
            })
        }
    })
    return decoded
    
}



module.exports={
    createToken,
    decodeToken}
