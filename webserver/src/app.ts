import express from 'express';
import { userRouter } from './routes/users.js';
import { licenceRouter } from './routes/licence.js';


const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/users', licenceRouter);

export { app };