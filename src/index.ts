import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app: express.Application = express();
const address = '127.0.0.1:3000';

app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});

export default app;
