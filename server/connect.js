require('dotenv').config();
const yaml = require('js-yaml');
const fs   = require('fs');

// handle passwords
// if (process.argv.length != 4) {
//     console.log('\nInvalid Input! Incorrect number of args! Include a username and password for your cluster!\nrun: node prog.js username password\n');
//     process.exit();
// } 

const tryLoadingConfig = (path) => {
    let doc = {}
    let success = false;
    console.log("\n\nAttempting to load server config at path: ", path);
    try {
        doc = yaml.load(fs.readFileSync(path, 'utf8'));
        console.log(doc);
        return [success, doc]
    } catch (e) {
        console.log(e);
        return [success, doc]
    }
}

let doc = {}
let success = false;
// try {
//     doc = yaml.load(fs.readFileSync('server_config.yaml', 'utf8'));
//     console.log(doc);
// } catch (e) {
//     tryLoadingConfigFromRootDir();
//     console.log(e);
//     console.log("EXITING");
//     process.exit(1);
// }

[success, doc] = tryLoadingConfig('server_config.yaml');
if (!success)
    [success, doc] = tryLoadingConfig('../server_config.yaml');
if (!success) {
    console.log("Exiting");
    process.exit(1);
}

// console.log(doc.mongo)
// process.exit(0);

let missingEnvVars = [];

const cluster_id = doc.mongo.mongo_cluster_id;
const user = doc.mongo.mongo_user_name;
const pw = doc.mongo.mongo_password;
const database = doc.mongo.database;
const collection = doc.mongo.collection;

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

const url = `mongodb+srv://${user}:${pw}@${cluster_id}.mongodb.net`;

let dbConnection;

// console.log(`USER: ${user}\nPASSWORD: ${pw}`);

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    connectToServer: async function () {
        try {
            console.log(`Attempting to connect to ${url}...`);
            await client.connect();
            dbConnection = await client.db(database);
            console.log(`Connected to Cluster: ${cluster_id}`);
            console.log(`Connected to Database: ${database}`);
            return 0;
        } catch (error) {
            console.log(`\nMongoDB Connection Error! \nERROR MESSAGE: ${error.message}`);
            await client.close();
            console.log(`MongoDB connection closed.\nShutting down server...`)
            process.exit();
        }
    },

    disconnectFromServer: async function() {
        client.close();
        console.log("Closed connection to MongoDB...");
    },

    getDb: function() {
        return dbConnection;
    },

    getCollection: function() {
        return collection;
    }
};