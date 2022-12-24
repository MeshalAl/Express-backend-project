import { Request, Response } from 'express';
import CartModel from '../models/Cart';
import { resolveToken } from '../helpers/helpers';

const Cart = new CartModel();

const add = async (req: Request, res: Response) => {
    try {
        const user_id = Number(
            resolveToken(req.headers.authorization as string)
        );
        const { products } = req.body;

        for (const product of products) {
            await Cart.add(user_id, product.product_id, product.quantity);
        }
        const currentCart = await Cart.currentCart(user_id);
        return res.json(currentCart);
    } catch (error) {
        throw new Error(`[Error] Could not add product to cart: ${error}`);
    }
}
export { add };
