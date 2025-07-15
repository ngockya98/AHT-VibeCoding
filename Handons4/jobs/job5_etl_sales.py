"""
Job 5: ETL dữ liệu bán hàng → Chuẩn hóa → Ghi DB
Tools: pandas, sqlalchemy
"""
import pandas as pd
from sqlalchemy import create_engine

df = pd.read_excel('sales.xlsx')
df['date'] = pd.to_datetime(df['date'])
df = df.dropna()
engine = create_engine('mysql+pymysql://user:pass@localhost/sales_db')
df.to_sql('sales', engine, if_exists='replace', index=False)
