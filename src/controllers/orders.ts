import { Request, Response } from 'express';
import { resolveToken } from '../helpers/helpers';
import OrderModel from '../models/Order';

const Order = new OrderModel();

const create = async (req: Request, res: Response) => {
    try {
        const user_id = Number(
            resolveToken(req.headers.authorization as string)
        );
        const { Products } = req.body;
        if (!Products) {
            return res.send('Add at least one product');
        }

        const activeOrder = await Order.create(user_id, Products);

        return res.json(activeOrder);
    } catch (error) {
        throw new Error(`[Error] Could not add product to order: ${error}`);
    }
};

export { create };
