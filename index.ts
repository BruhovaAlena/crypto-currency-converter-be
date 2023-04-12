import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
