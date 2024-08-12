const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("DB is already connected!");
        return mongoose;
    }

    try {
        // Specify the database name
        const dbName = 'sync-crowd';
        const uri = `${process.env.MONGODB_URI}`;

        const db = await mongoose.connect(uri, {
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.isConnected = db.connections[0].readyState;
        console.log(`DB connected successfully to ${dbName}!`);
        return mongoose;
    } catch (error) {
        console.log("DB connection failed!", error);
        process.exit(1);
    }
}

module.exports = dbConnect;