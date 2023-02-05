import { Console } from "console";
import mongoose from "mongoose";
import { env } from 'process';
class dbConnect {
    uri: string;
    connection;

    constructor() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
        if (MONGO_USER == "") {
            this.uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;
        }
        else {
            this.uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_HOST}:${MONGO_PORT}`;
        }
        console.log(this.uri);
    }

    public connect(): void {
        mongoose.connect(this.uri,{ retryWrites: true, w: "majority" }).then(() => {
            console.log("DB Connected");
        }).catch((error: any) => {
            console.log("Connection Error");
        });
       /* this.connection = mongoose.connection;
        this.connection.connect("open", () => {
            console.log("MongoDB database connection established successfully");
        });
        this.connection.on("error", (error: any) => {
            console.error("Error connecting to MongoDB database: ", error);
        });
        process.on("SIGINT", () => {
            this.connection.close(() => {
                console.log("MongoDB database connection closed due to Node.js process interruption");
                process.exit(0);
            });
        });*/
    }
    public disconnect(): void {
        this.connection.close(() => {
            console.log("MongoDB database connection closed");
        });
    }
}

export default dbConnect;


