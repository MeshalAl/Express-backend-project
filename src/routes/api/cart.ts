import { Router } from 'express';
import { add } from '../../controllers/cart';
import validateToken from '../../middleware/validators';

const route = Router();

route.post('/', validateToken, add);

export default route;
