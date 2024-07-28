from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import uvicorn

"""
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
"""

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load the JSON data
with open('/Users/harold/projects/TradingDashboard/src/data/StockCard.json', 'r') as file:
    stock_data = json.load(file)

# Extract tickers from the JSON data
tickers = [stock['ticker'] for stock in stock_data.values()]

# Join tickers into a comma-separated string
symbols = ','.join(tickers)

# Alpaca API endpoint
alpaca_url_latest_trades = f"https://data.alpaca.markets/v2/stocks/trades/latest?feed=iex&symbols={symbols}"
alpaca_url_latest_bars = f"https://data.alpaca.markets/v2/stocks/bars/latest?feed=iex&symbols={symbols}"

headers = {
    "accept": "application/json",
    "APCA-API-KEY-ID": "PK91TNGHJ4N3XOHKWQ2L",
    "APCA-API-SECRET-KEY": "GDDcVX3hpFoAoO857VkkunOucCjKltC7ebPakTUz"
}

@app.get("/api/stock/{ticker}")
async def get_stock(ticker: str):
    result = {}
    
    # First API call for latest trades
    response = requests.get(alpaca_url_latest_trades, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Error in trades API: {response.status_code}")
    
    trades = response.json()['trades']
    if ticker not in trades:
        raise HTTPException(status_code=404, detail=f"Ticker {ticker} not found in trades data")
    
    price = trades[ticker]['p']
    result["price"] = round(price, 2)

    # Second API call for latest bars
    response = requests.get(alpaca_url_latest_bars, headers=headers)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Error in bars API: {response.status_code}")
    
    bars = response.json()['bars']
    if ticker not in bars:
        raise HTTPException(status_code=404, detail=f"Ticker {ticker} not found in bars data")
    
    open_price, close_price = bars[ticker]['o'], bars[ticker]['c']
    price_change = close_price - open_price
    percent_change = (price_change / open_price) * 100

    result.update({
        "priceChange": round(price_change, 2),
        "percentChange": round(percent_change, 2)
    })
    
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)