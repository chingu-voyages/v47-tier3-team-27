import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes/userRoute";
import mongoose from "mongoose";
import dotenv from 'dotenv';
// import compression from "compression";
import cors from 'cors';
dotenv.config();

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.MONGO_URI

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }


    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({
            credentials: true
        }))
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private routes(): void {
        this.app.get("/", (req, res) => {
            res.send("Hello, World!");
        });
    }
}

export default new App().app;
