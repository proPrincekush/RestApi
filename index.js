const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api")
const app = express();

app.use(express.static('public'));
mongoose.connect(M_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 })
mongoose.Promise = global.Promise;

app.use(bodyparser.json())
app.use('/api',routes);



//  error handling middle ware
app.use((err,req,res,next)=>{
    // console.log(err);
    res.status(422).send({
        error: err.message,
    })
})


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server started at ${PORT} ....`);
})