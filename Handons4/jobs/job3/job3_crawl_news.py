"""
Job 3: Crawl website tin tức → Lưu vào file CSV
Refactor theo mô hình services
Tools: requests, bs4, pandas
"""

def fetch_html(url):
    import requests
    r = requests.get(url)
    return r.text

def extract_news(html, selector):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    results = []
    for item in soup.select(selector):
        title = item.text
        link = item['href']
        results.append({'title': title, 'link': link})
    return results

def write_csv(data, filename):
    import csv
    with open(filename, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['title', 'link'])
        writer.writeheader()
        writer.writerows(data)

def read_csv(filename):
    import pandas as pd
    df = pd.read_csv(filename)
    return df

if __name__ == "__main__":
    url = 'https://example.com/news'
    selector = 'h2.title a'
    html = fetch_html(url)
    data = extract_news(html, selector)
    write_csv(data, 'news.csv')
    df = read_csv('news.csv')
    print(df)
