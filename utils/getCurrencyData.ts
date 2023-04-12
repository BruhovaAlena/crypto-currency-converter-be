import axios from 'axios';
import { CURRENCY_SYMBOLS } from '../contants/currencyNames';

type Quote = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
};

type Currency = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: null;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  quote: {
    [key: string]: Quote;
  };
};

export const getCurrencyData = async () => {
  try {
    const response = await axios({
      method: 'get',
      baseURL: process.env.BASE_URL,
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_CURRENCY_KEY as string,
      },
    });

    return response.data.data as Currency[];
  } catch (error) {
    console.log('error', error);
  }
};

// const DATA = [
//   {
//     id: 1,
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     priceInUsd: 25939.032054440144,
//   },
//   {
//     id: 1027,
//     name: 'Ethereum',
//     symbol: 'ETH',
//     priceInUsd: 1768.2280050031113,
//   },
//   {
//     id: 825,
//     name: 'Tether',
//     symbol: 'USDT',
//     priceInUsd: 1.0035339135425718,
//   },
//   {
//     id: 74,
//     name: 'Dogecoin',
//     symbol: 'DOGE',
//     priceInUsd: 0.07697583840096447,
//   },
// ];

export const getData = async () => {
  const data = await getCurrencyData();
  const result = data
    ?.map(({ id, name, quote, symbol }) => ({
      id,
      name,
      symbol,
      priceInUsd: quote['USD'].price,
    }))
    .filter((cur) => {
      return CURRENCY_SYMBOLS.includes(cur.symbol);
    });

  return result;
};
