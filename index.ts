import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { router } from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(router);

// app.get('/currencyData', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
