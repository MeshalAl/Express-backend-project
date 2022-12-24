import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
export const resolveToken = (auth: string) => {
    try {
        const token = auth?.split(' ')[1];
        const decoded = jwt.decode(token) as JwtPayload;
        if (decoded.user.user_id) {
            return decoded.user.user_id;
        }
        return null;
    } catch (error) {
        throw new Error(
            `[Error] could not decode user info from token: ${error}`
        );
    }
}