import { Request, Response } from 'express';
import UserModel, { User } from '../models/User';
import jwt from 'jsonwebtoken';

const User = new UserModel();
const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

const index = async (req: Request, res: Response) => {
    try {
        const fetchedUsers = await User.index();

        if (!fetchedUsers) {
            return res.send('No users found.');
        }
        return res.status(200).json(fetchedUsers);
    } catch (e) {
        throw new Error(`[Error] Failed to fetch all users`);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.send('numeric id required.');
        }
        const fetchedUser = await User.show(Number(id));

        if (!fetchedUser) {
            return res.send('User not found.');
        }
        return res.status(200).json(fetchedUser);
    } catch (e) {
        res.status(500).send(`[Error] Failed on fetching user: ${e}`);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, password } = req.body;

        if (!firstname || !lastname || !password) {
            return res
                .status(400)
                .send('firstname, lastname, password are required.');
        }

        const user: User = { firstname, lastname, password };
        const createdUser = await User.create(user);

        return res.status(200).json(createdUser);
    } catch (e) {
        res.status(500).send('Error on creating user.');
    }
};

const authenticate = async (req: Request, res: Response) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).send('id and password are required.');
    }
    try {
        const user = await User.authenticate(id, password);

        if (!user) {
            res.status(400).send('invalid password.');
        }

        const token = jwt.sign({ user }, TOKEN_SECRET);

        res.json(token);
    } catch (e) {
        throw new Error(`[Error] Failed to generate token: \n ${e}`);
    }
};

export { index, show, create, authenticate };
