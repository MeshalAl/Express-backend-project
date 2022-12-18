import { Router } from 'express';
import usersRoute from './api/users';
import productsRoute from './api/products';
import cartRoute from './api/cart';
// import ordersRoute from './api/orders';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/products', productsRoute);
// routes.use('/orders', ordersRoute);
routes.use('/cart', cartRoute);

export default routes;
