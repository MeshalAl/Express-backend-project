import { Router } from 'express';
import { index, show, create } from '../../controllers/products';
import validateToken from '../../middleware/validators';

/*
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
*/

const route = Router();

route.get('/', index);

route.get('/:id', show);

route.post('/', validateToken, create);

// route.get('/top', top);
// route.get('/:category');

export default route;
