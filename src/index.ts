import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import router from './routes/index';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5009;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
