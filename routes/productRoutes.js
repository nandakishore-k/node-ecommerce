const express = require('express');
const {addProduct,getProduct} = require('../controllers/productController');
const orderProduct = require('../controllers/orderController');
const {verifyToken} = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/roleMiddleware');
const sendOrderMail = require('../middleware/sendMail');
const router = express.Router();

//add new product
router.post('/add-product',verifyToken,verifyRole('user'),addProduct);

//get product
router.get('/get-product/:id',getProduct)

//order product
router.get('/order/:id',verifyToken,orderProduct,sendOrderMail)

//delete product
//router.post('/delete',deleteProduct)

module.exports = router;