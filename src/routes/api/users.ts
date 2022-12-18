import { Router } from 'express';

import { index, show, create, authenticate } from '../../controllers/users';

import validateToken from '../../middleware/validators';

// #### Users
// - Index [token required]
// - Show [token required]
// - Create N[token required]

const route = Router();

// display all users
route.get('/', validateToken, index);
// get specific user
route.get('/:id', validateToken, show);

// create a user
route.post('/', create);
// get token
route.post('/auth', authenticate);

export default route;
