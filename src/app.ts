import express, { Application } from 'express'
import mongoose from 'mongoose';
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import Controller from '@/utils/interfaces/controller.interface'
import ErrorMiddleware from '@/middleware/error.middleware'
import helmet from 'helmet'
import { env } from 'process';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

       // this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(morgan('dev'));
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
        mongoose.connect("mongodb://127.0.0.1:27017", { retryWrites: true, w: "majority" }).then(() => {
            console.log("DB Connected");
        }).catch((error: any) => {
            console.log("Connection Error");
        });
        /* if (MONGO_USER == "") {
         }
         else {
             mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
         }*/
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App Listening on port ${this.port}`);
        });
    }
}

export default App;