import { Router } from 'express';
import usersRoute from './api/users';
import productsRoute from './api/products';
import ordersRoute from './api/orders';
// import ordersRoute from './api/orders';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/products', productsRoute);
routes.use('/orders', ordersRoute);

export default routes;
