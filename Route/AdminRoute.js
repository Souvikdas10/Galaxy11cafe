const express = require('express');
const Route = express.Router()
const AdminController = require('../Controller/adminController')
const uploadImage=require('../middleware/uploadImg')
const Duplicate=require('../middleware/CheckDuplicate')

Route.get('/admin/registration' , AdminController.registration)
Route.post('/admin/registationCreate', uploadImage.single('image') , [Duplicate.CheckDuplicate] ,  AdminController.register_create)

Route.get('/admin/',AdminController.login)
Route.post('/admin/logincreate',AdminController.logincreate)


Route.get('/admin/product',AdminController.product)
Route.post('/admin/Create-product',AdminController.createProduct)


module.exports = Route;