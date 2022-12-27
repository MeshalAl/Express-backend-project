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

route.get('/', validateToken, showAll);
route.get(':id', validateToken, show);
route.get('/history', validateToken, getHistory);

route.post('/', validateToken, create);
route.post('/complete/:id', validateToken, completeOrder);

export default route;
