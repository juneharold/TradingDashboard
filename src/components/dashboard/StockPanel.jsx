import './StockPanel.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';
import StockGraph from './StockGraph';
import Input from '@mui/joy/Input';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ListDivider from '@mui/joy/ListDivider';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';

const FMP_API_KEY = import.meta.env.VITE_FMP; 

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

const StockPanel = () => {
  const [symbol, setSymbol] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [orderType, setOrderType] = useState('Market');
  const [quantity, setQuantity] = useState(1);
  const [timeInForce, setTimeInForce] = useState('GTC');
  const [selectedTab, setSelectedTab] = useState(0);
  const [companyWebsiteLink, setCompanyWebsiteLink] = useState('');
  const [timeRange, setTimeRange] = React.useState('1day');

  useEffect(() => {
    const fetchStockData = async () => {
      if (symbol) {
        try {
          const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`);
          const companyInfo = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${FMP_API_KEY}`);
          if (response.data && response.data.length > 0) {
            setStockInfo(response.data[0]);
            if (companyInfo.data[0]!=null) setCompanyWebsiteLink(companyInfo.data[0].website.slice(12));
            console.log(companyWebsiteLink);
          }
        } catch (error) {
          console.error('Error fetching stock data:', error);
          setStockInfo(null);
        }
      }
    };

    const debounce = setTimeout(fetchStockData, 300);
    return () => clearTimeout(debounce);
  }, [symbol]);

  const estimatedCost = quantity * (stockInfo?.price || 0);

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const stockData = {
      ticker: symbol,
      shares: quantity
    };

    try {
      const endpoint = selectedTab === 0 ? 'http://localhost:8000/stock/buy' : 'http://localhost:8000/stock/sell';
      const method = selectedTab === 0 ? 'post' : 'put';
      const response = await axios({
        method: method,
        url: endpoint,
        data: stockData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log(`Order ${selectedTab === 0 ? 'placed' : 'sold'} successfully:`, response.data);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.detail : 'An unexpected error occurred');
    }
  };

  return (
    <div className="outer-box">
      <h3 className="stock-panel">Stock Panel</h3>
      <div className="inner-box-container">
        <div className="inner-box-left">
          <OrderForm
            changeSymbol={symbol => {
              setSymbol(symbol);
            }}
          />
          <Tabs
            aria-label="tabs"
            value={selectedTab} // Control selected tab with state
            onChange={(event, newValue) => {
              setSelectedTab(newValue);
            }}
            sx={{ width: '100%', bgcolor: 'transparent' }}>
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: 'xl',
                justifyContent: 'center',
                bgcolor: 'background.level1',
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: 'sm',
                  bgcolor: 'background.surface',
                },
              }}>
              <Tab disableIndicator sx={{ width: '50%' }} color="success">
                Buy
              </Tab>
              <Tab disableIndicator sx={{ width: '50%' }} color="danger">
                Sell
              </Tab>
            </TabList>
          </Tabs>
          <List aria-labelledby="decorated-list-demo"> 
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemDecorator>Market Price </ListItemDecorator>
              <span style={{ marginLeft: 'auto' }}>${stockInfo ? stockInfo.price.toFixed(2) : '0.00'}</span>
            </ListItem>
            <ListDivider inset={'gutter'} />
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemDecorator>Order Type</ListItemDecorator>
              <Select defaultValue="Market" sx={{ marginLeft: 'auto' }}>
                <Option value="Market">Market</Option>
                <Option value="Limit">Limit</Option>
                <Option value="Stop">Stop</Option>
                <Option value="Stop-Limit">Stop Limit</Option>
              </Select>
            </ListItem>
            <ListDivider inset={'gutter'} />
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemDecorator>Quantity</ListItemDecorator>{' '}
              <Input
                placeholder="1"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                min="1"
                sx={{ marginLeft: 'auto', maxWidth: '30%' }}
              />
            </ListItem>
            <ListDivider inset={'gutter'} />
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemDecorator>Time in Force</ListItemDecorator>
              <Select defaultValue="DAY" sx={{ marginLeft: 'auto', minWidth: '30%' }}>
                <Option value="DAY">Day</Option>
                <Option value="GTC">GTC - Good Till Canceled</Option>
                <Option value="IOC">IOC - Immediate or Cancel</Option>
              </Select>
            </ListItem>
            <ListDivider inset={'gutter'} />
            <ListItem sx={{ display: 'flex', alignItems: 'center'}}>
              <ListItemDecorator>Estimated Cost</ListItemDecorator>
              <span style={{ marginLeft: 'auto' }}>${estimatedCost.toFixed(2)}</span>
            </ListItem>
          </List>
          <Button onClick={handleOrder} color={selectedTab === 0 ? 'success' : 'danger'}>
            Confirm Order
          </Button>
        </div>
        <div className="inner-box-right">
          {stockInfo ? (
            <>
              <div className="top-box">
                <img className="company-logo2" loading="lazy" alt="" src={`https://img.logo.dev/${companyWebsiteLink}?token=pk_dE_jx5XMS--t-pwbDnUpYA`} />
                <h3 className="company-name">
                  {' '}
                  {stockInfo.name} ({stockInfo.symbol}){' '}
                </h3>
                <ToggleButtonGroup
                  value={timeRange}
                  onChange={(event, newValue) => {
                    setTimeRange(newValue);
                  }}
                  sx={{ height: '50%', marginLeft: 'auto' }}>
                  <Button value="1day">1 Day</Button>
                  <Button value="1week">1 Week</Button>
                  <Button value="1month">1 Month</Button>
                  <Button value="1year">1 Year</Button>
                </ToggleButtonGroup>
              </div>
              <div className="middle-box">
                <StockGraph symbol={symbol} timeRange={timeRange} graphType="line"/>
              </div>
              <div className="bottom-box">
                <Stack direction="row" spacing={1}>
                  <Item>Current Price: ${stockInfo.price.toFixed(2)}</Item>
                  <Item>Change: ${stockInfo.change.toFixed(2)} ({stockInfo.changesPercentage.toFixed(2)}%)</Item>
                  <Item>Previous Close: ${stockInfo.previousClose.toFixed(2)}</Item>
                  <Item>Open: ${stockInfo.open.toFixed(2)}</Item>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Item>Day's Range: ${stockInfo.dayLow.toFixed(2)} - ${stockInfo.dayHigh.toFixed(2)}</Item>
                  <Item>52 Week Range: ${stockInfo.yearLow.toFixed(2)} - ${stockInfo.yearHigh.toFixed(2)}</Item>
                  <Item>Volume: {stockInfo.volume.toLocaleString()}</Item>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Item>Avg. Volume: {stockInfo.avgVolume.toLocaleString()}</Item>
                  <Item>Market Cap: ${(stockInfo.marketCap / 1e9).toFixed(2)}B</Item>
                  <Item>P/E Ratio: {stockInfo.pe.toFixed(2)}</Item>
                  <Item>EPS: ${stockInfo.eps.toFixed(2)}</Item>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Item>50 Day Avg: ${stockInfo.priceAvg50.toFixed(2)}</Item>
                  <Item>200 Day Avg: ${stockInfo.priceAvg200.toFixed(2)}</Item>
                  <Item>Exchange: {stockInfo.exchange}</Item>
                  <Item>Shares Outstanding: {stockInfo.sharesOutstanding.toLocaleString()}</Item>
                </Stack>
              </div>
            </>
          ) : (
            <h3 style={{ fontWeight: 'normal', alignSelf: 'center' }}>Select a stock to view information</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPanel;
