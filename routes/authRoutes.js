const express = require('express');
const {registerUser,userLogin,userLogout} = require('../controllers/authController');



const router = express.Router();

//register new user
router.post('/register',registerUser);

//user login
router.post('/login',userLogin);

//user logout
router.post('/logout',userLogout);

module.exports = router;