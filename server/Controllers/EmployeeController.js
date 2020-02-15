const express = require('express');
const router = express.Router()
const auth = require('../Utils/JWTmiddleware');
const upload = require('../Utils/UploadMiddleware').users
const EmployeeService = require('../Service/EmployeeService')

router.post('/employees',async (req, res) =>{
    let result = await EmployeeService.create(req.body);
    if (result.success)
        res.status(201).send(result.data)
    else
        res.status(400).send(result.errors)
})
router.get('/employees',async (req,res) =>{
    let result = await EmployeeService.getAll();
    if (result.success)
        res.status(201).send(result.data)
    else
        res.status(400).send(result.errors)
})
router.post('/employees/profile',auth,upload, async (req,res)=>{
    let result = await EmployeeService.uploadPhotos(req)
    if (result.success) {
        res.status(201).send(result.data)
    } else {
        res.status(400).send(result.errors)
    }
})
module.exports = router
