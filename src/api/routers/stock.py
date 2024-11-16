from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import Annotated
from .auth import get_current_user
from models import Users, Stocks, Transactions
from datetime import datetime, timezone
from sqlalchemy.exc import SQLAlchemyError
from urllib.request import urlopen
import certifi
import json
import logging
from dotenv import load_dotenv
import os

load_dotenv()

fmp_api_key = os.getenv("FMP")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/stock", tags=["stock"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class StockRequest(BaseModel):
    ticker: str
    shares: int
    
def get_stock_price(ticker: str) -> float:
    """
    returns stock price of (argument) ticker. Used to calculate current portfolio value of user. 
    """
    response = urlopen(f"https://financialmodelingprep.com/api/v3/quote-order/{ticker}?apikey={fmp_api_key}", cafile=certifi.where())
    data = response.read().decode("utf-8")
    return float(json.loads(data)[0]["price"])


@router.post("/buy", status_code=status.HTTP_200_OK)
async def buy_stock(db: db_dependency, user: user_dependency, stock_data: StockRequest):
    """
    - subtracts stock price from Users.cash
    - add/modify a stock instance 
    - add transactions 
    """
    try:
        # Start a new transaction
        db.begin()
        user_id = user['id']
        db_user = db.query(Users).filter(Users.id == user_id).with_for_update().first()

        # Check if the user has enough cash
        total_cost = get_stock_price(stock_data.ticker) * stock_data.shares
        if db_user.cash < total_cost:
            raise HTTPException(status_code=400, detail="Insufficient funds")
        db_user.cash -= total_cost

        # Add or update stock in user's portfolio
        existing_stock = db.query(Stocks).filter(Stocks.user_id == user_id, Stocks.ticker == stock_data.ticker).first()
        if existing_stock:
            existing_stock.shares += stock_data.shares
        else:
            new_stock = Stocks(user_id=user_id, ticker=stock_data.ticker, shares=stock_data.shares)
            db.add(new_stock)

        # Record the transaction
        transaction = Transactions(
            user_id=user_id,
            date=datetime.now(timezone.utc),
            buy=True,
            ticker=stock_data.ticker,
            shares=stock_data.shares,
            amount=total_cost
        )
        db.add(transaction)
        db.commit()

        return {"message": f"Successfully bought {stock_data.shares} shares of {stock_data.ticker}"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except HTTPException as e:
        db.rollback()
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.put("/sell", status_code=status.HTTP_200_OK)
async def sell_stock(db: db_dependency, user: user_dependency, stock_data: StockRequest):
    """
    - adds stock price to user's cash 
    - add/modify stock portfolio
    - update transaction
    """
    try:
        # Start a new transaction
        db.begin()
        user_id = user['id']
        db_user = db.query(Users).filter(Users.id == user_id).with_for_update().first()

        # Add earning to user's cash
        total_earning = get_stock_price(stock_data.ticker) * stock_data.shares
        db_user.cash += total_earning

        # Add or update stock in user's portfolio
        existing_stock = db.query(Stocks).filter(Stocks.user_id == user_id, Stocks.ticker == stock_data.ticker).first()
        if existing_stock.shares >= stock_data.shares: 
            existing_stock.shares -= stock_data.shares
            if existing_stock.shares == 0:
                db.delete(existing_stock)
        else:
            raise HTTPException(status_code=400, detail="Insufficient stock shares")

        # Record the transaction
        transaction = Transactions(
            user_id=user_id,
            date=datetime.now(timezone.utc),
            buy=False,
            ticker=stock_data.ticker,
            shares=stock_data.shares,
            amount=total_earning
        )
        db.add(transaction)
        db.commit()

        return {"message": f"Successfully sold {stock_data.shares} shares of {stock_data.ticker}"}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except HTTPException as e:
        db.rollback()
        raise e
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.put("/stock_watchlist", status_code=status.HTTP_200_OK)
async def change_stock_watchlist(db: db_dependency, user: user_dependency, stock_data: StockRequest):
    """
    - add stock to watchlist if not already there
    - remove stock from watchlist if already there
    """
    try:
        user_id = user['id']
        
        # Check if the stock already exists in the user's portfolio
        existing_stock = db.query(Stocks).filter(
            Stocks.user_id == user_id,
            Stocks.ticker == stock_data.ticker
        ).first()

        if existing_stock:
            # Toggle the watchlist status
            existing_stock.watchlist = not existing_stock.watchlist
            action = "removed from" if not existing_stock.watchlist else "added to"
        else:
            # Create a new stock entry with watchlist set to True
            new_stock = Stocks(
                user_id=user_id,
                ticker=stock_data.ticker,
                shares=0,  # No shares owned, just in watchlist
                watchlist=True
            )
            db.add(new_stock)
            action = "added to"

        db.commit()
        return {"message": f"{stock_data.ticker} has been {action} your watchlist."}

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")



