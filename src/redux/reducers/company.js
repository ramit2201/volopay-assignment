import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for company data
const initialState = {
    companyData: null,
    incomeStatement: [],
    loading: false,
    error: null,
  };

// API endpoint for fetching company data
const API_KEY = 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';


const fetchCompanyData = async () => {
    const response = await axios.get(`${BASE_URL}?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`);
    return response.data; // Assuming response has the required stock data
  };

const fetchIncomeStatement = async () => {
    const response = await axios.get(`${BASE_URL}?function=INCOME_STATEMENT&symbol=IBM&apikey=${API_KEY}`);
    return response.data; // Assuming response has the required stock data
  };


const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompanyData: (state, action) => {
            state.companyData = action.payload;
        },
        setIncomeStatement: (state, action) => {
            state.incomeStatement = action.payload;
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
  export const { setCompanyData, setIncomeStatement, setLoading, setError } = companySlice.actions;

  // Async action to fetch company data
  export const fetchCompany = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchCompanyData();
      dispatch(setCompanyData(data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Async action to fetch income statement
  export const fetchIncomeStatementData = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await fetchIncomeStatement();
      dispatch(setIncomeStatement(data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  export default companySlice.reducer;