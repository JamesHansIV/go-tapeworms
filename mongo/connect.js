const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
const client = new MongoClient(url, {
    useNewURLParser: true,
    useUnifiedTopology: true
});


const connectToServer = () => {
    client.connect((err,db) => {
        if(err || !db ) throw err;
        connection = db.db('worms');
        console.log('Connected to MongoDB')
    })
}

export {connectToServer};