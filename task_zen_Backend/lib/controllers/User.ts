import { UserModels } from '../model/UserModel'
import { Request, Response } from 'express'
import { Document, Error as MongooseError } from "mongoose";
import { random, authentication } from "../utiles/helper";
import dotenv from 'dotenv';
dotenv.config();


export class UserAuthentication {

    public async _Registration(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, username } = req.body;

            const userHasAnAccount = await UserModels.findOne({ email });

            if (userHasAnAccount) {
                res.status(400).json({
                    message: "Oops!! User already exists"
                });
                return; // Return to avoid further execution
            }

            const salt = random();
            const createAccount = await UserModels.create({
                email,
                username,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                }
            });

            res.status(200).json(createAccount);
        } catch (err) {
            if (err instanceof MongooseError) {
                res.status(500).send(err.message);
            } else {
                res.status(500).send("Internal Server Error");
            }
        }
    }

    public async _login (req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
        
            if (!req.body.email || !req.body.password) {
                res.status(400).json({
                    msg: "Email and password are required."
                });
            }
            const user_isExists = await UserModels.findOne({ email }).select(`+authentication.salt +authentication.password`);

            if(!user_isExists){
                 res.status(400).json({
                    msg: "Email and password are required."
                });
            }

            const expectedHash = authentication(user_isExists.authentication.salt, password);

            if (user_isExists.authentication.password !== expectedHash ){
                 res.status(403).json({msg: "Invalide crediatial name"});
            }
            const salt = random();
            user_isExists.authentication.sessionToken = authentication(salt, user_isExists._id.toString())

             await user_isExists.save();
             res.cookie(process.env.COOKIES_KEY, user_isExists.authentication.sessionToken, {domain: 'localhost', path: '/'})

            res.status(200).json(user_isExists).end()
    

        } catch (error) {
            res.send({
                error: "Oop! Server is down you will be redirected"
            })
            res.redirect("/register");
        }
    }
}
