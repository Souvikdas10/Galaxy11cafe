const productModel = require('../model/productModel');
const bannerModel = require('../model/bannerImg');
const adminModel = require('../model/adminModel')
const offerModel = require ('../model/OfferModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')


exports.adminauth = (req, res, next) => {
    if (req.admin) {
        // console.log(req.admin, "aa");
        next();
    } else {
        // console.log(req.admin, "bb");
        // req.flash('error', "can not access this page ..please login first")
        res.redirect('/admin/')
    }
}

exports.registration = (req, res) => {
    // console.log(result);
    res.render('admin/registration', {
        title: 'registration Page',
        data: req.admin,
        message: req.flash('message'),
        error: req.flash('error'),
    })
}

exports.register_create = (req, res) => {
    const signup = new adminModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    })
    if (req.file) {
        signup.image = req.file.path
    }
    signup.save().then(result => {
        // console.log(result);
        // req.flash('message', "Admin Register Successfull..")

        res.redirect('/admin/')
    }).catch(err => {
        // console.log(err);
        // req.flash('error', "Admin Register Try again...")
        res.redirect('/admin/registation')

    })
}

exports.login = (req, res) => {
    // loginData = {}
    // loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    // loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('./admin/login', {
        title: "admin || login",
        // message: req.flash('message'),
        // error: req.flash('error'),
        // data1: loginData,
        // data: req.admin,

    })
}

exports.logincreate = (req, res) => {
    adminModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const haspassword = data.password
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    fname: data.fname,
                    image: data.image
                }, 'galaxy11cafe@2024', { expiresIn: '1h' })
                res.cookie('AdminToken', token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                // console.log(data);
                // req.flash('message', "You are Login Successfully")
                res.redirect('/admin/dashboard')
            } else {
                // console.log("Incorrect password");
                // req.flash('error', "Incorrect password")

                res.redirect('/admin/')
            }
        } else {
            // console.log("Incorrect email");
            // req.flash('error', "Incorrect Email")
            res.redirect('/admin/')
        }
    })
}

exports.logout = (req, res) => {
    res.clearCookie('AdminToken')
    res.redirect('/admin/')
}

exports.dashboard = (req, res) => {
    res.render('admin/dashboard', {
        title: 'dashboard Page',

    })
}

exports.product = (req, res) => {
    productModel.find().then(result => {
        res.render('admin/product', {
            title: 'product Page',
            displayData: result,

        })
    })
}

exports.createProduct = (req, res) => {
    const productData = new productModel({
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price
    })
    if (req.file) {
        productData.image = req.file.path
    }
    productData.save().then(result => {
        console.log(result);
        // req.flash('message', "Product added successfull..")
        console.log('message', "Product added successfull..")

        res.redirect('/admin/product')
    }).catch(err => {
        console.log(err);
        // req.flash('error', "Product not added ..")
        res.redirect('/admin/product')

    })
}

exports.edit = (req, res) => {
    res.render('admin/edit', {
        title: 'edit Page',
        // displayData: result,

    })
}
exports.banner = (req, res) => {
    bannerModel.find().then(result => {
        res.render('admin/banner', {
            title: 'Banner ',
            displayData: result,
        })
    })
}
exports.createBanner = (req, res) => {
    const banner = new bannerModel({
        description: req.body.description,
    })
    if (req.file) {
        banner.image = req.file.path
    }
    banner.save().then(result => {
        console.log(result);
        // req.flash('message', "Product added successfull..")
        console.log('message', "Product added successfull..")

        res.redirect('/admin/banner')
    }).catch(err => {
        console.log(err);
        // req.flash('error', "Product not added ..")
        res.redirect('/admin/banner')

    })
}
 
exports.offer = (req,res)=>{
   
}

exports.createoffer = (req,res)=>{
   
}