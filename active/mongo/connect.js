// handle passwords
if (process.argv.length != 4) {
    console.log('\nInvalid Input! Incorrect number of args! Include a username and password for the database!\nrun: node prog.js username password\n');
    process.exit();
} 

const user = process.argv[2];
const pw = process.argv[3];

const { MongoClient } = require("mongodb");
const url = `mongodb+srv://${user}:${pw}@cluster1.of1bayg.mongodb.net/test`;

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
            dbConnection = await client.db("worms");
            console.log("Connected to MongoDB: 'worms'...");
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