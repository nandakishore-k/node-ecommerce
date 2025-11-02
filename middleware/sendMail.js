const nodeMailer = require('nodemailer');
require('dotenv').config(); 


const sendOrderMail = async (req,res)=> {
    try{
    const transporter = nodeMailer.createTransport(
        {
            service: 'gmail',
            auth:{
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }

        }

    )

    console.log("inside send email",req.user.email)

    const to = req.user.email;
    const sub = "Order confirmed";
    const body = `<h1>Order details</h1>
                    <p>Order name: ${req.order.name}
                       Order desc:${req.order.description}
                      Order price: ${req.order.price}`

    
    await transporter.sendMail(
            {
                to:to,
                subject: sub,
                html:body,
            }
        ).then(
            res.status(200).json({message:"Purchase confirmation mail sent"})
        )
    }
    catch (err){
        console.log(err)
    }
}

module.exports = sendOrderMail;