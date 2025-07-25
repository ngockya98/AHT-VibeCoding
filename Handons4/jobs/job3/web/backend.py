from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CrawlRequest(BaseModel):
    url: str
    selector: str

@app.post("/crawl")
def crawl_news(req: CrawlRequest):
    try:
        r = requests.get(req.url)
        soup = BeautifulSoup(r.text, 'html.parser')
        results = []
        for item in soup.select(req.selector):
            title = item.text
            link = item.get('href', '')
            results.append({"title": title, "link": link})
        return {"success": True, "data": results}
    except Exception as e:
        return {"success": False, "error": str(e)}
