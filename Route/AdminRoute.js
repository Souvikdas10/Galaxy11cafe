const express = require('express');
const Route = express.Router()
const AdminController = require('../Controller/adminController')
const uploadImage=require('../middleware/uploadImg')


Route.get('/admin/product',AdminController.product)
Route.post('/admin/Create-product',AdminController.createProduct)


module.exports = Route;