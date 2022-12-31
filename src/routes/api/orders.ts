import { Router } from 'express';
import {
    create,
    show,
    showAll,
    getHistory,
    completeOrder,
} from '../../controllers/orders';
import validateToken from '../../middleware/validators';

const route = Router();

route.get('/history/', validateToken, getHistory);
route.get('/:id', validateToken, show);
route.get('/', validateToken, showAll);

route.post('/complete/', validateToken, completeOrder);
route.post('/', validateToken, create);

export default route;
