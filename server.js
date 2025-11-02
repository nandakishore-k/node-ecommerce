const Express = require('express');
const cookieParser = require("cookie-parser");
const {connectDb} = require('./config/database');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');


const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use('/auth',authRouter);
app.use('/product',productRouter);
//connect db
connectDb();

app.listen(3000, () => {
    console.log("listening at port 3000..")
});
