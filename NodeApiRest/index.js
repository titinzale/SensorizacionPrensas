'use strict'

const mongoose=require('mongoose')
const app= require('./app')
const config=require('./config')





mongoose.connect(config.db,(err,res)=>{
    if (err) {//throw err
        return console.log(`Error al conectar a la BD: ${err}`)
    }
    console.log('Conexion a la Bd establecida')

app.listen(config.port,()=>{
    console.log(`API Rest corriendo en http://localhost:${config.port}`)   
    })
    
})

