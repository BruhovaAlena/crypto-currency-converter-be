import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Router } from 'express';
import { CURRENCY_SYMBOLS } from '../contants/currencyNames';
import {
  createConversion,
  getConversionsByName,
  getLatestConversions,
} from '../utils/db';
import { getData } from '../utils/getCurrencyData';

const rootRouter = Router();
const prisma = new PrismaClient();

rootRouter.get('/currencyData', async (req: Request, res: Response) => {
  try {
    const currencyData = await getData();
    if (currencyData) {
      return res.status(200).json(currencyData);
    }
    return res.status(404).json('Data could not be found');
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

rootRouter.post('/addConversion', async (req: Request, res: Response) => {
  try {
    const { cryptoCurrency, usd, name } = req.body;

    const conversion = await createConversion({
      cryptoCurrency,
      name,
      usd,
    });

    return res.status(201).json(conversion);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

rootRouter.get('/latestConversion', async (req: Request, res: Response) => {
  try {
    const latestConversions = await getLatestConversions();

    return res.status(200).json(latestConversions);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

type TotalConversionsResult = {
  name: string;
  amountOfUsd: number;
  amountOfCryptoCurrency: number;
}[];

rootRouter.get('/totalConversions', async (req: Request, res: Response) => {
  try {
    const summedData = await Promise.all(
      CURRENCY_SYMBOLS.map((symbol) => getConversionsByName(symbol))
    );

    const result: TotalConversionsResult = summedData.map(
      (cryptoCurrencyConversions, index) => ({
        amountOfCryptoCurrency: cryptoCurrencyConversions.reduce(
          (acc, { amountOfCryptoCurrency }) => {
            return acc + Number(amountOfCryptoCurrency);
          },
          0
        ),
        amountOfUsd: cryptoCurrencyConversions.reduce(
          (acc, { amountOfUsd }) => {
            return acc + Number(amountOfUsd);
          },
          0
        ),
        name: CURRENCY_SYMBOLS[index],
      })
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

export { rootRouter as router };
