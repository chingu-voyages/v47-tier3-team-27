import { Request, Response, NextFunction } from "express";
import { get, merge } from 'lodash';
// import { getUserBySessionToken } from '../db/users';
import { UserModels } from "model/UserModel";
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    identity?: any; // Adjust the type according to your user identity structure
}

export const isOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(403);
        };
        if (currentUserId.toString() !== id){
            return res.sendStatus(403);
        }
        next()
    } catch (error) {
        return res.sendStatus(403);
    }
}
export const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies[process.env.COOKIES_KEY];

        if (!sessionToken) {
            return sendErrorResponse(res, 403, 'No session token found.');
        }

        const existingUser = await UserModels.findOne({'authentication.sessionToken':sessionToken});

        if (!existingUser) {
            return sendErrorResponse(res, 403, 'User not found.');
        }

        merge(req, { identity: existingUser });
        return next();

    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return sendErrorResponse(res, 400, 'Error in authentication middleware.');
    }
};

const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
    console.log(message); // Log the error message for debugging
    return res.status(statusCode).json({ error: message });
};
