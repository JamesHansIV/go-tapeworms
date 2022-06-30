const express = require('express');
// import 'body-parser';
// import 'path';
// import 'mysql';
// import {commandLineHandler} from './mode.js';
// const port = '3000';

const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const mode = require('./mode.js');
const port = '3001';

// MODE SELECT ---------------------------------------------------------------
selectMode();

// COMMAND LINE ARGUEMENTS ---------------------------------------------------
// let args = process.argv[2];
// if(process.argv.length > 2) {
//     switch (val) {
//         case '-demo':
//             //runDemoMode();
//         break;
//         case '-dedicated':
//             //runDedicatedMode();
//             break;
//         case '':

        
//         default:
//             console.log('No mode specified. Running default...');
//             //runDedicatedMode();
//     }
// }


// SERVER STARTUP ------------------------------------------------------------
//create express server
const app = express();
app.use('/img',express.static('img'));
app.use(express.static(path.join(__dirname,"/")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Methods','POST');
    next();
});

//start server
app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}...`);
});

//create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database: 'tapeworms'
});

// connect to database
db.connect((err) => {
    if(err) console.log('Error: ', err.message);
    else console.log('Connected to database...');

});

// END Points ----------------------------------------------------------------
//home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

//test
app.get('/test', (req, res) => {
    res.json({ message: "Howdy! This is a test endpoint!" });
});

//get full list of orders
app.get('/order-list', (req, res) => {
    let sql = 'SELECT * from orders';
    db.query(sql, (err, result) => {
        if(err) throw err;

        let data = JSON.parse(JSON.stringify(result)); //converts rowdatapacket to string then parses the string to json
        res.json(data);
    }); 
});

//filters list of worms returns json of filtered list
app.post('/filter-genera',(req,res)=> {
    console.log('req body,' , req.body);

    //create sql query
    //set query conditions 
    let conditions = `
        (min_length >= ${req.body.minLength} OR min_length IS NULL) AND
        (max_length <= ${req.body.maxLength} OR max_length IS NULL) AND
        (min_testes >= ${req.body.minTestes} AND max_testes <= ${req.body.maxTestes}) AND
        (parasite_of = '${req.body.parasiteOf}' OR '${req.body.parasiteOf}' = 'unknown');`;
    

    let sql = 'SELECT * FROM orders WHERE ' + conditions;
    console.log('query',sql)    
    
    //run query
    db.query(sql,(err,result) => {
        if(err) throw err;
        let data = JSON.parse(JSON.stringify(result));
        //console.log('query result\n\t',data)
        res.json(data)

    });
});