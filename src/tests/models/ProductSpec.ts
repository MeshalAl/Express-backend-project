import test from "node:test";
import ProductModel from "../../models/Product";
import { Product } from "../../types/types";

const product = new ProductModel();

const testProduct: Product = {
    product_id: undefined,
    product_name: 'test product 001',
    price: 299.92,
    category: 'test category 001',
}

describe('Product model tests:', () => {
    it('Create a product on model successful', async () => {
        const result = await product.create(testProduct);
        expect(result.product_id).toBeDefined();
        expect(result.product_name).toBe(testProduct.product_name);
        expect(result.price).toBe(testProduct.price);
        expect(result.category).toBe(testProduct.category);

        testProduct.product_id = result.product_id;
    });
    it('get product by ID on model successful', async () => {
        const result = await product.show(Number(testProduct.product_id));

        expect(result.product_id).toBe(testProduct.product_id);
        expect(result.product_name).toBe(testProduct.product_name);
        expect(result.price).toBe(testProduct.price);
        expect(result.category).toBe(testProduct.category);
    });
    it('get product by ID on model successful', async () => {
        const result = await product.getProductsByCategory(
            testProduct.category
        );

        expect(result[0].category).toBe(testProduct.category);
    });
    it('get all products on model successful', async () => {
        const testProduct2: Product = {
            product_id: undefined,
            product_name: 'test product 002',
            price: 165.2,
            category: 'test category 002',
        }

        const productResult = await product.create(testProduct2);

        testProduct2.product_id = productResult.product_id;

        const result = await product.index();

        expect(result[1].product_id).toBe(testProduct.product_id);
        expect(result[1].product_name).toBe(testProduct.product_name);
        expect(result[1].price).toBe(testProduct.price);
        expect(result[1].category).toBe(testProduct.category);

        expect(result[0].product_id).toBe(testProduct2.product_id);
        expect(result[0].product_name).toBe(testProduct2.product_name);
        expect(result[0].price).toBe(testProduct2.price);
        expect(result[0].category).toBe(testProduct2.category);
    });


});
