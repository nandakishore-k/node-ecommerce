const { model } = require('mongoose');
const Product = require('../models/productModel');
const Razorpay = require('razorpay');

const orderProduct = async (req,res,next)=> {
    try{
        console.log("inside send order",req.user.email)

    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({message: "product not found"});
    

    //product exists
    //razorpay [payment]
    const productPrice = product.price * 100
    const razorPay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const options = {
            amount: productPrice,
            currency: "INR",
            receipt: "receipt#1",
            };
    
    const order = await razorPay.orders.create(options);
    console.log("razor pay order made:",order);
    
    req.order = product;
    next();
    }
    catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}

module.exports = orderProduct;