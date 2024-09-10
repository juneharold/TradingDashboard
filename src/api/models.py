from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import date, datetime, timezone


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="guest")
    cash = Column(Float, default=100000.00)
    
    portfolios = relationship("Portfolios", back_populates="user")
    stocks = relationship("Stocks", back_populates="user")
    transactions = relationship("Transactions", back_populates="user")


class Portfolios(Base):
    __tablename__ = 'portfolios'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    date = Column(Date, default=date.today)
    portfolio_value = Column(Float)
    cash = Column(Float)
    
    user = relationship("Users", back_populates="portfolios")


class Stocks(Base):
    __tablename__ = 'stocks'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    ticker = Column(String, index=True)
    shares = Column(Integer)
    watchlist = Column(Boolean)
    
    user = relationship("Users", back_populates="stocks")
    

class Transactions(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    date = Column(DateTime, default=datetime.now(timezone.utc))
    buy = Column(Boolean)
    ticker = Column(String)
    shares = Column(Integer)
    amount = Column(Integer)
    
    user = relationship("Users", back_populates="transactions")
