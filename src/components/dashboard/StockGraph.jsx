import * as React from 'react';
import axios from 'axios';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const FMP_API_KEY = import.meta.env.VITE_FMP; 

export default function StockGraph({ symbol, timeRange, graphType }) {
  const [stockData, setStockData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Function to get today's date
  const getTodayDate = () => {
    return new Date();
  };

  // Function to subtract days from a given date
  const subtractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  // Function to format a date in 'YYYY-MM-DD' format
  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  React.useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      if (timeRange === '1day' || timeRange === '1week') {
        try {
          const to = getTodayDate();
          let from;
          if (timeRange === '1day') from = getTodayDate();
          else from = subtractDays(to, 6);
          //console.log(formatDate(from));
          //console.log(formatDate(to));
          const timeFrame = timeRange === '1day' ? '1min' : '1hour';
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/historical-chart/${timeFrame}/${symbol}?from=${formatDate(from)}&to=${formatDate(
              to,
            )}&apikey=${FMP_API_KEY}`,
          );
          const validatedData = response.data.filter(item => item.date && !isNaN(item.close));
          setStockData(validatedData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const to = getTodayDate();
          const from = subtractDays(to, timeRange === '1month' ? 30 : 365);
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${formatDate(from)}&to=${formatDate(
              to,
            )}&apikey=${FMP_API_KEY}`,
          );
          const validatedData = response.data.historical.filter(item => item.date && !isNaN(item.close));
          setStockData(validatedData);
        } catch (error) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchStockData();
    const intervalId = setInterval(fetchStockData, (timeRange === '1day' ? 60000 : 3600000)); // Run fetchData every minute if timeRange is 1 day
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [symbol, timeRange]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!stockData || stockData.length === 0) return <p>No data available</p>;

  // Extract dates and closing prices
  const dates = stockData.map(data => new Date(data.date).getTime());
  const openPrices = stockData.map(data => parseFloat(data.open));
  const closingPrices = stockData.map(data => parseFloat(data.close));

  return (
    <>
      {graphType === 'line' ? (
        <LineChart
          xAxis={[{ data: dates, scaleType: 'time' }]}
          series={[{ data: closingPrices, label: 'Close Price', color: '#03346E' }]}
          width={600}
          height={350}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: '#03346E',
              strokeWidth: 2,
            },
            [`& .${markElementClasses.root}`]: {
              stroke: '#03346E',
              scale: '0.6',
              fill: '#fff',
              strokeWidth: 2,
            },
            justifySelf: 'center',
          }}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart data={closingPrices} height={44} width={78} colors={["#021526"]}/>
        </Box>
      )}
    </>
  );
}
