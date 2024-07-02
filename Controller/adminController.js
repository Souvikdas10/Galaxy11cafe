const productModel = require('../model/productModel');
const ProductModel=require('../model/productModel');

exports.product=(req,res)=>{

}

exports.createProduct=(req,res)=>{
    const productData = new Productmodel({
        product_name: req.body.product_name,
        description: req.body.description,
        price: req.body.price
    })
    if (req.file) {
        productData.image = req.file.path
    }
    productData.save().then(result => {
        // console.log(result);
        req.flash('message', "Product added successfull..")

        res.redirect('/admin/product')
    }).catch(err => {
        // console.log(err);
        req.flash('error', "Product not added ..")
        res.redirect('/admin/product')

    })
}

exports.edit=(req,res)=>{
   
}