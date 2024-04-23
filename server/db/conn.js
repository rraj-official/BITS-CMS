const mongoose = require("mongoose");

const database="Registered_Complaints"

const DB = `mongodb+srv://rrajofficial5:IxUE8MjYNtjqdspS@cluster0.ogrmntj.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

async function connect() {
    try {
        await mongoose.connect(DB, {});
        console.log("Database Connected\n");
    } catch (err) {
        console.log("Error connecting to database\n", err);
    }
}

module.exports = { connect };