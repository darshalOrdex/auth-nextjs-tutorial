import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect("mongodb://localhost:27017/userdb");
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected Successfully");
        })
        connection.on('error', (err) => {
            console.log("MongoDB Connection Error" + err);
            process.exit(); 
        })
    } catch (error) {
        console.log("Something Goes Wrong!");
        console.log(error)
    }    
}