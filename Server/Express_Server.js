const express = require("express");
const app = express();
const auth_router = require('./Router/Auth_Router')
const contact_router = require('./Router/Contact_Router')
const service_router = require('./Router/Service_Router')
const admin_router = require('./Router/Admin_Router')
const PORT = process.env.PORT || 6010
require('dotenv').config(); //This is compulsary to use 'env file'
const connectToDb = require('./db');
const error_Middleware = require("./Middleware/Error_Middleware");
const cors = require('cors')
const bodyParser = require('body-parser');


app.set('view engine','ejs')
app.set('views','./views')

/* Handling cors problem */
app.use(cors())
app.use(bodyParser.json());


app.use(express.json());

app.use('/api/auth',auth_router);
app.use('/api/form', contact_router);
app.use('/api/service', service_router);
app.use('/api/admin', admin_router);

app.use(error_Middleware) //This is compulsary when use Express error Handling.

connectToDb()

app.listen(PORT, ()=>{
    console.log(`Server is started on Port ${PORT}`)
})

