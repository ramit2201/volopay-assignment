import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { getTopGainers, getTopLosers } from "../../api/stockApi";

export const fetchTopGainers = createAsyncThunk('stocks/fetchTopGainers' , async () => {
    const response = await getTopGainers();
    return response;
})

export const fetchTopLosers = createAsyncThunk('stocks/fetchTopLosers' , async () => {
    const response = await getTopLosers();
    return response;
})

const stockSlice = createSlice({
    name: 'stocks',
    initialState: {
        topGainers: [],
        topLosers: [],
       loading : false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(fetchTopGainers.fulfilled, (state , action) => {
            state.topGainers = action.payload;
        })
        .addCase(fetchTopLosers.fulfilled, (state, action) => {
            state.topLosers = action.payload;
        });
    },
});

export default stockSlice.reducer;