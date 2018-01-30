
'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.Promise = require('bluebird');

mongoose.connect(config.db, (err,res)=> {
  if(err) {
    return console.log('La app no se conecto a Mongodb: '+err)
  }

  console.log('La app se conecto OK a Mongodb');

  app.listen(config.port, ()=> {
    console.log('La app arranco OK en localhost:'+config.port);
  })

})
