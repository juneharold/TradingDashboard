from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import Annotated
from .auth import get_current_user
from models import Users, Stocks, Transactions, Portfolios
import logging
from .stock import get_stock_price
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/user", tags=["user"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
        

@router.get('/', status_code=status.HTTP_200_OK)
async def get_user(user: user_dependency, db: db_dependency):
    return db.query(Users).filter(Users.id == user.get('id')).first()


@router.get("/current-portfolio", status_code=status.HTTP_200_OK)
async def current_portfolio(user: user_dependency, db: db_dependency):
    """
    returns the user's current cash, portfolio value, and stocks owned.
    """
    logger.info(f"Fetching portfolio for user ID: {user['id']}")
    db_user = db.query(Users).filter(Users.id == user['id']).first()
    
    cash = db_user.cash
    stocks_owned = db.query(Stocks).filter(Stocks.user_id == user['id']).all()
    portfolio_value = sum(get_stock_price(stock.ticker) * stock.shares for stock in stocks_owned)
    
    logger.info(f"Portfolio fetched successfully for user ID: {user['id']}")
    return {"cash": cash, "portfolio_value": portfolio_value, "stocks_owned": stocks_owned}


@router.get("/historical-portfolio", status_code=status.HTTP_200_OK)
async def historical_portfolio(user: user_dependency, db: db_dependency):
    """
    returns user's portfolio value for the past year
    """
    logger.info(f"Fetching historical portfolio for user ID: {user['id']}")
    
    # Calculate the date one year ago from today
    one_year_ago = datetime.now() - timedelta(days=365)
    
    # Query the portfolios table for the past year's data
    historical_data = db.query(Portfolios).filter(
        Portfolios.user_id == user['id'],
        Portfolios.date >= one_year_ago
    ).order_by(Portfolios.date).all()
    
    # Prepare the result
    result = []
    for entry in historical_data:
        result.append({
            "date": entry.date.strftime("%Y-%m-%d"),
            "portfolio_value": entry.portfolio_value,
            "cash": entry.cash
        })
    
    # If there's missing data, we might want to fill in the gaps
    if len(result) < 365:
        logger.warning(f"Incomplete historical data for user ID: {user['id']}")
        # You could implement a method to estimate missing values here
    
    logger.info(f"Historical portfolio fetched successfully for user ID: {user['id']}")
    return {"historical_portfolio": result}


@router.get("/transactions", status_code=status.HTTP_200_OK)
async def transactions(user: user_dependency, db: db_dependency):
    """
    return's a list of user's past transaction of stocks 
    """
    logger.info(f"Fetching transaction for user ID: {user['id']}")
    transactions = db.query(Transactions).filter(Transactions.user_id == user['id']).all()
    logger.info(f"Transactions fetched successfully for user ID: {user['id']}")
    
    return {"transactions": transactions}


@router.get("/watchlist", status_code=status.HTTP_200_OK)
async def watchlist(user: user_dependency, db: db_dependency):
    """
    returns a list of user's current stocks on their watchlist 
    """
    logger.info(f"Fetching stock watchlist for user ID: {user['id']}")
    watchlist = db.query(Stocks).filter(Stocks.user_id == user['id'] and Stocks.watchlist).all()
    logger.info(f"Watchlist fetched successfully for user ID: {user['id']}")
    
    return {"watchlist": watchlist}
