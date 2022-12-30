import { Router } from 'express';
import { index, show, create } from '../../controllers/products';
import validateToken from '../../middleware/validators';

const route = Router();

route.get('/:id', show);
route.get('/', index);

route.post('/', validateToken, create);

export default route;
