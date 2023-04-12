import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getConversionsByName = (cryptoCurrencyName: string) =>
  prisma.conversion.findMany({
    where: { cryptoCurrency: cryptoCurrencyName },
  });

export const getLatestConversions = () =>
  prisma.conversion.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

type CreateConversion = {
  cryptoCurrency: string;
  usd: string;
  name: string;
};

export const createConversion = ({
  cryptoCurrency,
  name,
  usd,
}: CreateConversion) =>
  prisma.conversion.create({
    data: {
      amountOfCryptoCurrency: cryptoCurrency,
      amountOfUsd: usd,
      cryptoCurrency: name,

      date: new Date().toISOString(),
    },
  });
