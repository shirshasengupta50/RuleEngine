const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const apiRoute = require('./routes/index');
const dbConnect = require('./configs/database');


const setupAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    
    app.use('/api', apiRoute);

    app.listen(5555, ()=>{
        console.log(`Server Running on PORT at 5555`);
        dbConnect();
    });
}

setupAndStartServer();