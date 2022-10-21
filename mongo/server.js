
// require('dotenv').config({path: './config.env'})

const express = require('express');
const cors = require('cors');
const dbo = require('./connect')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// universal error
app.use( (err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Not Working :(');
});


// mongo imports and handle args
if (process.argv.length != 4) {
    console.log('\nInvalid Input! Incorrect number of args! Include a username and password for the database!\nrun: node prog.js username password\n');
    process.exit();
} 

const user = process.argv[2];
const pw = process.argv[3];

const { MongoClient } = require("mongodb");
const url = `mongodb+srv://${user}:${pw}@cluster1.of1bayg.mongodb.net/test`
const client = new MongoClient(url);


// connect to mongo server
dbo.connectToServer((client) => {
    try {
        app.listen(PORT, () => {
            console.log(`Express server running on port ${PORT}`);
        })
    } catch (err) {
        console.error(err);
        process.exit();
    }
})