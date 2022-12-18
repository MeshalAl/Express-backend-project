import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send('No auth header sent');
    }
    const bearer = authHeader?.split(' ')[0];
    const token = authHeader?.split(' ')[1];

    if (bearer?.toLowerCase() == 'bearer' && token) {
        try {
            const decoded = jwt.verify(token as string, TOKEN_SECRET as string);
            if (!decoded) {
                throw new Error('[Error] token validation failed.');
            }
            next();
        } catch (e) {
            return res.status(400).send('invalid token');
        }
    }
};

export default validateToken;
