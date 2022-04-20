const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const { append } = require('express/lib/response');
const port = '3000';

// SERVER STARTUP ------------------------------------------------------------
//create express server
const app = express();
app.use(express.static(path.join(__dirname,"/")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
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
})

// SQL QUERIES ----------------------------------------------------------------
//home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/order-list', (req, res) => {
    let sql = 'SELECT * from orders';
    res.send(
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log('Getting list of orders');
        })
    );
});