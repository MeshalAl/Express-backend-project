import { Router } from 'express';
import { index, show, create } from '../../controllers/products';
import validateToken from '../../middleware/validators';

const route = Router();

route.get('/', index);
route.get('/:id', show);

route.post('/', validateToken, create);

export default route;
