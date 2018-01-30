'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/users', userCtrl.getAll)
api.get('/user/:userId', userCtrl.getUser)
api.put('/user/:userId', auth, userCtrl.updateUser)
api.delete('/user/:usertId', auth, userCtrl.deleteUser)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/signout', auth, userCtrl.signOut)

module.exports = api
