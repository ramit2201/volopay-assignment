import axios from 'axios';

const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export const getTopGainers = async () => {
  const response = await axios.get(`${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
  return response.data.top_gainers;
};

export const getTopLosers = async () => {
  const response = await axios.get(`${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
  return response.data.top_losers;
};
