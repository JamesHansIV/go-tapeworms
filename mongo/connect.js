// handle passwords
if (process.argv.length != 4) {
    console.log('\nInvalid Input! Incorrect number of args! Include a username and password for the database!\nrun: node prog.js username password\n');
    process.exit();
} 

const user = process.argv[2];
const pw = process.argv[3];

const { MongoClient } = require("mongodb");
const url = `mongodb+srv://${user}:${pw}@cluster1.of1bayg.mongodb.net/test`


connectToServer = async (url) => {
    const client = new MongoClient(url);
    await client.connect((err,db) => {
        if(err || !db ) throw err;
        connection = db.db('worms');
        console.log('Connected to MongoDB Cluster')

        return client;
    });
};

// connectToServer(url);

module.exports = { connectToServer };