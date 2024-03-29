const MongoClient = require('mongodb').MongoClient;
const Config = require('./config');

async function init() {
    let database = await MongoClient.connect(Config.mongo_uri, { 
        useUnifiedTopology: true, 
        connectTimeoutMS: 3600000, 
        socketTimeoutMS: 3600000, 
        writeConcern: {
            wtimeout: 0
        }
    });
    global.logdb = database.db('log');
    let db = (global.mainDb = global.mongodb = database.db(Config.mongo_db));
}

function tran(s) {
    return s;
}

module.exports = {
    init: init,
    tran,
};