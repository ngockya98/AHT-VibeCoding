"""
Job 3: Crawl website tin tức → Lưu vào file CSV
Tools: requests, bs4
"""
import requests
from bs4 import BeautifulSoup
import csv

url = 'https://example.com/news'
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
results = []
for item in soup.select('h2.title a'):
    title = item.text
    link = item['href']
    results.append({'title': title, 'link': link})
with open('news.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['title', 'link'])
    writer.writeheader()
    writer.writerows(results)
