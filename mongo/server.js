
// require('dotenv').config({path: './config.env'})

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 5000;

const app = express();


app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname,"/")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Methods','POST');
    next();
});

// universal error
// app.use( (err, req, res) => {
//     console.error(err.stack);

// });


// mongo imports and handle args
if (process.argv.length != 4) {
    console.log('\nInvalid Input! Incorrect number of args! Include a username and password for the database!\nrun: node prog.js username password\n');
    process.exit();
} 

const user = process.argv[2];
const pw = process.argv[3];

const { MongoClient } = require("mongodb");
const dbconnection = require('./connect');
const { query } = require('express');
const url = `mongodb+srv://${user}:${pw}@cluster1.of1bayg.mongodb.net/test`

const client = new MongoClient(url);

console.log("\tUSER: ", user, "\n\tPASSWORD:", pw);

// MONGO FUNCTIONS
async function connectToServer () {
    
    await client.connect((err,db) => {
        if(err || !db ) throw err;
        connection = db.db('worms');
        console.log('Connected to MongoDB Cluster')
        console.log(db.name)

        return client;
    });
};

async function allDatabases () {
    dbList = await client.db().admin().listDatabases();
    console.log("\nDatabases:");
    dbList.databases.forEach(db=> console.log(` - ${db.name}`));
}

// async function selectDatabase (database) {
//     let dbo = db.db(database);
//     console.log(dbo.name);
// }\

async function queryDatabase (query) {
    client.connect((err,db) => {
        if(err || !db ) throw err;
        connection = db.db('worms');
        console.log('Connected to MongoDB Cluster')

        console.log(query)

        // let query = { acetabula_shape : "sucker-like" };
        connection.collection("lecanicephalidea").find(query).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            // return result 
            console.log(typeof(result))   
            db.close
        });

    });
}

// start express server
app.listen(PORT, () => {
   
    console.log(`Express server running on port ${PORT}`);
    connectToServer();
    allDatabases();
    // selectDatabase('worms');
});


// ENDPOINTS
// app.get('/', (req, res) => {
//     res.send('hello');

//     // dbList = await dbClient.db().admin().list

//     console.log(res)
    
// });

// get collection
// app.get('/collection', (req, res) => {

//     // client.connect(url, (err, db) => {
//     //     if (err) throw err;
//     //     let dbo = db.db('worms');
//     //     let query = { acetabula_shape : "sucker-like" };    
//     //     db.collection("lecanicephalidea").find(query).toArray((err, result) => {
//     //         if (err) throw err;
//     //         console.log(result);
//     //         // db.close
//     //     });

//     //     // res.json()
//     // })

//     // console.log(queryDatabase({tentacles: false}));

//     // queryRes = queryDatabase({tentacles:false});

//     // console.log(queryDatabase({tentacles:false}))

//     res.json(queryDatabase(
//         {
//             tentacles: true
//         }
//     ));
    
//     // dbo.collection
// });

// test
// app.get('/test', (req, res) => {
//     res.json({message: "this message"});
// });

// view all
// app.get('/view-all', (req, res) => {

// });


