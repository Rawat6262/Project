let express = require('express');
// const { route } = require('./Route/Route');
const {router,getRouter} = require('./Route/Route');
const Connection = require('./Connection/Connection');
const cookieParser = require('cookie-parser');
let app = express();
Connection("mongodb://127.0.0.1:27017/onexhib").then(()=>{
    console.log('database connections has been connected')
}).catch((e)=> console.log('error:',e));
app.use(express.urlencoded({extended:false}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use('/',router);


app.listen(8000,()=> console.log('Server Started at Port 8000'));