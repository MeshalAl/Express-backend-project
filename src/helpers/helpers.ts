import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
export const resolveToken = (auth: string) => {
    try {
        const token = auth?.split(' ')[1];
        const decoded = jwt.decode(token) as JwtPayload;
        const userId = decoded.user.id;
        if (userId) {
            return userId;
        }
        return null;
    } catch (error) {
        throw new Error(
            `[Error] could not decode user info from token: ${error}`
        );
    }
}