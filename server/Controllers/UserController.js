const express = require('express');
const auth = require('../Utils/JWTmiddleware');
const UserService = require('../Service/UserService')
const router = express.Router()

router.post('/users/login', async(req, res) => {
    let result = await UserService.loginUser(req.body)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(400).send(result.errors)
    }
})

router.get('/users/me', auth, async(req, res) => {
    let result = UserService.getUserInfo(req.user)
    res.status(201).send(result.data);
})

router.post('/users/me/logout', auth, async (req, res) => {
    let result = await UserService.userLogOut(req)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(500).send(result.errors)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    let result = await UserService.userLogOutAll(req)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(500).send(result.errors)
    }
})

module.exports = router