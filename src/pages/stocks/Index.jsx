import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopGainers, fetchTopLosers } from '../../redux/reducers/stock';
import TableDisplay from '../../components/core/Table';
import { selectTopGainers, selectTopLosers } from '../../redux/selector/stock';
import { STOCK_TABLE_HEADERS } from '../../constants/stock';
import { useNavigate } from "react-router-dom";
const StockPage = () => {
    const dispatch = useDispatch();
    const topGainers = useSelector(selectTopGainers);
    const topLosers = useSelector(selectTopLosers);
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(fetchTopGainers());
      dispatch(fetchTopLosers());
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
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-center text-2xl text-green-500">Top Gainers</h2>
            <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedGainers} onRowClick = {handleRowClick} />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-center text-2xl text-red-500">Top Losers</h2>
            <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedLosers} onRowClick = {handleRowClick} />
          </div>
        </div>
      </div>
    );
}

export default StockPage
