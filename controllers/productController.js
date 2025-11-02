const { json } = require('express');
const db = require('../config/database');
const Product = require('../models/productModel');

//add product
const addProduct = async (req,res)=> {
    try{
        console.log("inside product add");
        const {name,description,imageUrl,price} = req.body;
        const existingProduct = await Product.findOne({name});
        if(existingProduct) return res.status(401).json({message: "product already exists!"});

        //add product
        const product = await Product.create({
            name,description,imageUrl,price
        })

        res.status(200).json({message: `new product added:${product.name}`})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


//get product
const getProduct = async (req,res)=> {
    try{
        const id = req.params.id;
        const product = await Product.findOne({id});
        if(!product) return res.status(404).json({message: "product not found"});

        res.status(200).json(product)
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}



module.exports = {addProduct,getProduct}