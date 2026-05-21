import os
import chromadb
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def chunk_text(text, chunk_size=150, overlap=30):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunks.append(" ".join(words[i:i + chunk_size]))
    return chunks

def ingest_data():
    pdf_path = "../public/NirajMain.pdf"
    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    
    static_portfolio_text = """
Niraj Shevade is a B.Tech Information Technology student and aspiring software developer passionate about building scalable, data-driven, and cloud-integrated applications.
Skills include: React, React Native, Node.js, Python, FastAPI, Django, MongoDB, MySQL, AWS, Docker, Kubernetes, Jenkins, Git/GitHub, Machine Learning, NLP, Data Analysis, Power BI, Kafka, Grafana.
He specializes in full-stack development, data analysis, machine learning fundamentals, and DevOps practices.
Projects range from NLP-based resume parsing systems to scalable container monitoring platforms.
Contact info: Reach out via LinkedIn or GitHub.
    """
    
    combined_text = static_portfolio_text + "\n" + text
    
    print("Chunking text...")
    chunks = chunk_text(combined_text, chunk_size=150, overlap=30)
    
    print("Loading embedding model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    print("Generating embeddings...")
    embeddings = model.encode(chunks)
    
    print("Initializing ChromaDB...")
    client = chromadb.PersistentClient(path="./chroma_db")
    
    # Create or get collection
    collection = client.get_or_create_collection(name="portfolio_kb")
    
    # Add data to chroma
    ids = [str(i) for i in range(len(chunks))]
    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=ids
    )
    
    print(f"Successfully ingested {len(chunks)} chunks into ChromaDB.")

if __name__ == "__main__":
    ingest_data()
