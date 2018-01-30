'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req,res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
	avatar: req.body.avatar,
    password: req.body.password
  })

  user.save((err)=> {
    if(err) res.status(500).send({ message: 'Error al crear el usuario. '+err})

    return res.status(200).send({ token: service.createToken(user)})
  })
}

function signIn(req,res){
  User.find({email: req.body.email}, (err,user)=> {
    if(err) return res.status(500).send({message: err})
    if(!user) return res.status(404).send({message: 'No existe el usuario'})

    req.user = user
    res.status(200).send({
      message: 'Login OK',
      token: service.createToken(user)
    })
  })
}

function signOut(req,res){
  localStorage.clear()
  res.redirect('./add_users')
}

function getAll(req,res){
  User.find({}, (err,users)=> {
    if(err) return res.status(500).send({message: 'Error al realizar peticion. '+err})
    if(!users) return res.status(404).send({message: 'No hay usuarios'})

    res.status(200).send({users})
  })
}

function getUser(req,res){
  let userId = req.params.userId

  User.findById(userId, (err,user)=> {
    if(err) return res.status(500).send({message: 'Error al realizar peticion. '+err})
    if(!user) return res.status(404).send({message: 'El producto no existe'})

    res.status(200).send({user})
  })
}

function updateUser(req,res){
  let userId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err,userUpdated)=> {
    if(err) res.status(500).send({message: 'Error al actualizar el usuario '+err})

    res.status(200).send({ user: userUpdated})
  })
}

function deleteUser(req,res){
  let userId = req.params.userId

  User.findById(userId, (err,user)=> {
    if(err) res.status(500).send({message: 'Error al borrar el usuario '+err})

    User.remove((err)=> {
      if(err) res.status(500).send({message: 'Error al borrar el usuario '+err})

      res.status(200).send({message: 'El usuario fue eliminado'})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getAll,
  getUser,
  updateUser,
  deleteUser
}
