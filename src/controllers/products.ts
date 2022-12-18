import { Request, Response } from 'express';
import ProductModel, { Product } from '../models/Product';

/*
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
*/

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
        res.json(fetchedProduct);
    } catch (error) {
        throw new Error(`[Error] Failed to get product ${error}`);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;
        let { category } = req.body;

        if (!name || !price) {
            return res.status(400).send('name and price are required.');
        }
        if (isNaN(price)) {
            return res.status(400).send('price must be numeric.');
        }
        category = category ? category : 'uncategorized';

        const product: Product = { name, price, category };
        const createdProduct = await Product.create(product);

        return res.json(createdProduct);
    } catch (e) {
        throw new Error(`[Error] Failed to create product: ${e}`);
    }
};

export { index, show, create };
