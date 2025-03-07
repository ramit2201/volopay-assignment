import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopGainers, fetchTopLosers } from '../store/stockSlice';
import TableDisplay from '../components/core/TableDisplay';
import { HEADERS } from '../constants/StockHeader';

const Home = () => {
  const dispatch = useDispatch();
  const { topGainers, topLosers } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchTopGainers());
    dispatch(fetchTopLosers());
  }, [dispatch]);

  

  const formattedGainers = topGainers?.map(item => ({
    [HEADERS.TICKER]: item.ticker,
    [HEADERS.PRICE]: item.price,
    [HEADERS.CHANGE_AMOUNT]: item.change_amount,
    [HEADERS.CHANGE_PERCENTAGE]: item.change_percentage,
  })) || [];

  const formattedLosers = topLosers?.map(item => ({
    [HEADERS.TICKER]: item.ticker,
    [HEADERS.PRICE]: item.price,
    [HEADERS.CHANGE_AMOUNT]: item.change_amount,
    [HEADERS.CHANGE_PERCENTAGE]: item.change_percentage,
  })) || [];

  return (
    <div>
        <p className=' text-center mt-4 text-4xl'> Stocks Table Page</p>
      <div className="flex gap-6 justify-center items-center p-4">
        
        <div className='flex flex-col gap-4 w-1/2'>
          <h2 className='text-center text-2xl text-green-500'>Top Gainers</h2>
          <TableDisplay headers={Object.values(HEADERS)} rows={formattedGainers} />
        </div>
        <div className='flex flex-col gap-4 w-1/2'>
          <h2 className='text-center text-2xl text-red-500'>Top Losers</h2>
          <TableDisplay headers={Object.values(HEADERS)} rows={formattedLosers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
