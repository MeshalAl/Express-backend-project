import { Router } from 'express';
import { create } from '../../controllers/orders';
import validateToken from '../../middleware/validators';
//#### Orders
//- Current Order by user (args: user id)[token required]
//- [OPTIONAL] Completed Orders by user (args: user id)[token required]

const route = Router();

route.post('/', validateToken, create);

export default route;
