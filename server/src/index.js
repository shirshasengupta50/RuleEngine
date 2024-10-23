const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const apiRoute = require('./routes/index');
const dbConnect = require('./configs/database');
const { PORT } = require('./configs/serverConfig');


const setupAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    
    app.use('/api', apiRoute);

    app.listen(PORT, ()=>{
        console.log(`Server Running on PORT at ${PORT}`);
        dbConnect();
    });
}

setupAndStartServer();