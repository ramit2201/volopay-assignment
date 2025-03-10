import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopGainers, fetchTopLosers } from '../../redux/reducers/stockReducer';
import TableDisplay from '../../components/core/TableDisplay';
import { selectTopGainers, selectTopLosers } from '../../redux/selector/stockSlice';
import { STOCK_TABLE_HEADERS } from '../../constants/enums';

const StockPage = () => {
    const dispatch = useDispatch();
    const topGainers = useSelector(selectTopGainers);
    const topLosers = useSelector(selectTopLosers);
  
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
  
  
    
  
    return (
      <div>
        <div className="flex gap-6 justify-center items-center p-4">
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-center text-2xl text-green-500">Top Gainers</h2>
            <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedGainers} />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-center text-2xl text-red-500">Top Losers</h2>
            <TableDisplay headers={STOCK_TABLE_HEADERS} rows={formattedLosers} />
          </div>
        </div>
      </div>
    );
}

export default StockPage
