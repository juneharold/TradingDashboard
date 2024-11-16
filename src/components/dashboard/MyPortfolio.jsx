import './MyPortfolio.css';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  fontSize: '12px',
  color: theme.vars.palette.text.secondary,
  border: '1px light',
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
}));

const MyPortfolio = () => {
  const [cash, setCash] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/user/current-portfolio`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setCash(response.data.cash);
          setPortfolioValue(response.data.portfolio_value);
        } else {
          console.log('No portfolio value data found');
        }
      } catch (error) {
        console.error("Error fetching user's portfolio data:", error);
      }
    };
    fetchPortfolioData();
  }, []);

  return (
    <div className="card_myportfolio">
      <div className="container_myportfolio">
        <h3 className="header-text_myportfolio">My Portfolio</h3>
      </div>
      <div className="container_myportfolio">
        <Stack direction="row" spacing={2}>
          <Item sx={{ fontSize: '14px' }}>
            {cash ? `Cash: $${Number(cash).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'loading...'}
          </Item>
          <Item sx={{ fontSize: '14px' }}>
            {portfolioValue
              ? `Portfolio Value: $${Number(portfolioValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : 'loading...'}
          </Item>
        </Stack>
      </div>
      <div className="container_myportfolio">
      <LineChart
          xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], scaleType: 'time' }]}
          series={[{ data: [0, 1, 5, 3, 4, 2, 9, 17, 14, 15, 10], label: 'Portfolio Value', color: '#03346E' }]}
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
      </div>
    </div>
  );
};
export default MyPortfolio;
