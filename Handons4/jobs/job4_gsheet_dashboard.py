"""
Job 4: Nhận form Google Sheets → Sinh bảng Dashboard
Tools: gspread, pandas
"""
import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('creds.json', scope)
client = gspread.authorize(creds)
sheet = client.open('SheetName').sheet1
records = sheet.get_all_records()
df = pd.DataFrame(records)
# Sinh bảng tổng hợp
print(df.describe())
