import { Request, Response } from 'express';
import { Router } from 'express';
import { getCurrencyData } from '../utils/getCurrencyData';

const rootRouter = Router();

rootRouter.get('/currencyData', async (req: Request, res: Response) => {
  try {
    const currencyData = await getCurrencyData();
    if (currencyData) {
      return res.status(200).json(currencyData);
    }
    return res.status(404).json('Data could not be found');
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

export { rootRouter as router };
