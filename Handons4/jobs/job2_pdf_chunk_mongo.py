"""
Job 2: Nhận file PDF → Chia đoạn → Lưu vào MongoDB
Tools: PyMuPDF, langchain.text_splitter, pymongo
"""
import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
import pymongo

pdf_path = 'input.pdf'
doc = fitz.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()
# 2. Cắt theo đoạn (theo heading)
splitter = RecursiveCharacterTextSplitter(chunk_size=500)
chunks = splitter.split_text(text)
# 3. Thêm metadata
# 4. Insert vào MongoDB
client = pymongo.MongoClient()
db = client['pdf_db']
col = db['chunks']
for i, chunk in enumerate(chunks):
    col.insert_one({'chunk': chunk, 'index': i})
