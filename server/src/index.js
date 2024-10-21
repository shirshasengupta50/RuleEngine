const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRoute = require('./routes/index');


const setupAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/api', apiRoute);

    app.listen(5555, ()=>{
        console.log(`Server Running on PORT at 5000`);
    });
}

setupAndStartServer();