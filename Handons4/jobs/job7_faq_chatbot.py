"""
Job 7: Chatbot nội bộ QA tự động tra Câu hỏi thường gặp
Tools: LangChain, FAISS, OpenAI
"""
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

faq_file = 'faq.txt'
with open(faq_file) as f:
    faqs = f.read()
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_texts([faqs], embeddings)
query = 'Câu hỏi mẫu'
result = vectorstore.similarity_search(query)
print(result)
