import { Router } from 'express';

import { index, show, create, authenticate } from '../../controllers/users';

import validateToken from '../../middleware/validators';

const route = Router();

route.get('/:id', validateToken, show);
route.get('/', validateToken, index);

route.post('/auth', authenticate);
route.post('/', create);

export default route;
