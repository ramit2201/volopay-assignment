import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopGainers, fetchTopLosers } from '../redux/reducers/stock';
import TableDisplay from '../components/core/Table';
import { selectTopGainers, selectTopLosers } from '../redux/selector/stock';
import { STOCK_TABLE_HEADERS } from '../constants/stock';
import { useNavigate } from "react-router-dom";
import Loader from '../components/core/loader'; // Importing Loader component

const StockPage = () => {
    const dispatch = useDispatch();
    const topGainers = useSelector(selectTopGainers);
    const topLosers = useSelector(selectTopLosers);
    const navigate = useNavigate();

    // Loading states
    const [loadingGainers, setLoadingGainers] = useState(true);
    const [loadingLosers, setLoadingLosers] = useState(true);

    useEffect(() => {
        dispatch(fetchTopGainers()).finally(() => setLoadingGainers(false));
        dispatch(fetchTopLosers()).finally(() => setLoadingLosers(false));
    }, [dispatch]);

    const formattedGainers = topGainers?.map(item => ({
        Ticker: item.ticker,
        Price: item.price,
        'Change Amount': item.change_amount,
        'Change Percentage': item.change_percentage,
    })) || [];

    const formattedLosers = topLosers?.map(item => ({
        Ticker: item.ticker,
        Price: item.price,
        'Change Amount': item.change_amount,
        'Change Percentage': item.change_percentage,
    })) || [];

    // Handle row click (navigate to company page)
    const handleRowClick = (ticker) => {
        navigate(`/company/${ticker}`);
    };

    return (
        <div>
            <div className="flex gap-6 justify-center items-center p-4">
                {/* Top Gainers Section */}
                <div className="flex flex-col gap-4 w-1/2">
                    <h2 className="text-center text-2xl text-green-500">Top Gainers</h2>
                    {loadingGainers ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader />
                        </div>
                    ) : (
                        <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedGainers} onRowClick={handleRowClick} />
                    )}
                </div>

                {/* Top Losers Section */}
                <div className="flex flex-col gap-4 w-1/2">
                    <h2 className="text-center text-2xl text-red-500">Top Losers</h2>
                    {loadingLosers ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader />
                        </div>
                    ) : (
                        <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedLosers} onRowClick={handleRowClick} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockPage;
