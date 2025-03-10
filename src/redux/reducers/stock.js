import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for stock data
const initialState = {
  topGainers: [],
  topLosers: [],
  loading: false,
  error: null,
};

// API endpoint for fetching stock data
const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

// Function to fetch stock data from Alpha Vantage API
const fetchStockData = async (type) => {
  const response = await axios.get(`${BASE_URL}?function=${type}&apikey=${API_KEY}`);
  return response.data; // Assuming response has the required stock data
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setTopGainers: (state, action) => {
      state.topGainers = action.payload;
    },
    setTopLosers: (state, action) => {
      state.topLosers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators
export const { setTopGainers, setTopLosers, setLoading, setError } = stockSlice.actions;

// Async action to fetch top gainers
export const fetchTopGainers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchStockData('TOP_GAINERS_LOSERS'); // Adjust function name as needed
    dispatch(setTopGainers(data.top_gainers || [])); // Ensure we get an array
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Async action to fetch top losers
export const fetchTopLosers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await fetchStockData('TOP_GAINERS_LOSERS'); // Adjust function name as needed
    dispatch(setTopLosers(data.top_losers || []));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default stockSlice.reducer;
