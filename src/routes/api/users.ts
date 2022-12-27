import { Router } from 'express';

import { index, show, create, authenticate } from '../../controllers/users';

import validateToken from '../../middleware/validators';

const route = Router();

route.get('/', validateToken, index);
route.get('/:id', validateToken, show);

route.post('/', create);
route.post('/auth', authenticate);

export default route;
