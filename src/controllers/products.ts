import { Request, Response } from 'express';
import ProductModel from '../models/Product';
import { Product } from '../types/types';

const Product = new ProductModel();

const index = async (req: Request, res: Response) => {
    try {
        const ProductIndex = await Product.index();
        res.json(ProductIndex);
    } catch (error) {
        throw new Error(`[Error] Failed to get all product: ${error}`);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).send('numeric id required.');
        }
        const fetchedProduct = await Product.show(Number(id));
        if (!fetchedProduct) {
            return res.send('product does not exist.');
        }
        return res.json(fetchedProduct);
    } catch (error) {
        throw new Error(`[Error] Failed to get product ${error}`);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const { product_name, price } = req.body;
        let { category } = req.body;

        if (!product_name || !price) {
            return res.status(400).json({
                message: 'product_name and price are required.',
                format: {
                    product_name: 'value',
                    price: 'numeric value',
                    category: 'value, optional',
                },
            });
        }
        if (isNaN(price)) {
            return res.status(400).send('price must be numeric.');
        }
        category = category ? category : 'uncategorized';

        const product: Product = { product_name, price, category };
        const createdProduct = await Product.create(product);

        return res.json(createdProduct);
    } catch (e) {
        throw new Error(`[Error] Failed to create product: ${e}`);
    }
};

export { index, show, create };
