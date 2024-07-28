import pandas as pd
import yfinance as yf
 
import plotly.express as px


#Download Microsoft’s stock prices from 2020 and calculate simple returns:
df = yf.download("MSFT",
                 start="2020-01-01",
                 end="2020-12-31",
                 auto_adjust=False,
                 progress=False)
df["simple_rtn"] = df["Adj Close"].pct_change()
df = df.loc[:, ["Adj Close", "simple_rtn"]].dropna()
df = df.dropna()

# Convert index to a column
df.reset_index(inplace=True)
df.rename(columns={'index': 'Date'}, inplace=True)


print(df)

fig = px.line(df, x='Date', y='Adj Close', title='MSFT in 2020')
# Show the figure
fig.show()

fig.write_html("./file.html")

