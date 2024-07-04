const express = require('express');
const Route = express.Router()
const AdminController = require('../Controller/adminController')
const uploadImage=require('../middleware/uploadImg')
const multiImgUp=require('../middleware/mutiImg')
const Duplicate=require('../middleware/CheckDuplicate')

Route.get('/admin/registration' , AdminController.registration)
Route.post('/admin/registationCreate', uploadImage.single('image') , [Duplicate.CheckDuplicate] ,  AdminController.register_create)

Route.get('/admin/',AdminController.login)
Route.post('/admin/logincreate' ,AdminController.logincreate)


Route.get('/admin/product',AdminController.product)
Route.post('/admin/Create-product',uploadImage.single('image'),AdminController.createProduct)
Route.get('/admin/edit/:id',AdminController.edit)
// Route.post('/admin/update',AdminController.update)
// Route.delete('/admin/remove/:id',AdminController.remove)

Route.get('/admin/banner',AdminController.banner)
Route.post('/admin/create-Banner',uploadImage.single('image'),AdminController.createBanner)
// Route.post('/admin/create-Banner',multiImgUp,AdminController.createBanner)


Route.get('/admin/dashboard', AdminController.dashboard)
Route.get('/admin/', AdminController.login)


module.exports = Route;