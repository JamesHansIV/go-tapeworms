require('dotenv').config();

// handle passwords
// if (process.argv.length != 4) {
//     console.log('\nInvalid Input! Incorrect number of args! Include a username and password for your cluster!\nrun: node prog.js username password\n');
//     process.exit();
// } 

let missingEnvVars = [];

const cluster_id = process.env.CLUSTER_ID;
const user = process.env.CLUSTER_USERNAME;
const pw = process.env.CLUSTER_PASSWORD;
const database = process.env.DATABASE;

// check for missing env vars
if (cluster_id === undefined) missingEnvVars.push('CLUSTER_ID');
if (user === undefined) missingEnvVars.push('CLUSTER_USERNAME');
if (pw === undefined) missingEnvVars.push('CLUSTER_PASSWORD');
if (database === undefined) missingEnvVars.push('DATABASE');

if (missingEnvVars.length > 1) {
    console.log('Missing environment variables!');
    missingEnvVars.forEach( x => console.log(`  *  ${x}`));
    console.log('Add these to the .env file located in ~/server...');
    process.exit();
}

const { MongoClient } = require("mongodb");
require('dotenv').config();

const url = `mongodb+srv://${user}:${pw}@${cluster_id}.mongodb.net`;

let dbConnection;

console.log(`USER: ${user}\nPASSWORD: ${pw}`);

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    connectToServer: async function () {
        try {
            await client.connect();
            dbConnection = await client.db(database);
            console.log(`Connected to Cluster: ${process.env.CLUSTER_ID}`);
            console.log(`Connected to Database: ${database}`);
        } catch {
            console.log("Connection Failed! Closing Connection...");
            await client.close();
            console.log("Closed connection to MongoDB...");
        }
    },

    disconnectFromServer: async function() {
        client.close();
        console.log("Closed connection to MongoDB...");
    },

    getDb: function() {
        return dbConnection;
    }

};