import os
import chromadb
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from google import genai
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment.")
    client = None
else:
    client = genai.Client(api_key=GEMINI_API_KEY)

print("Loading embedding model...")
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

print("Loading ChromaDB...")
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="portfolio_kb")

def get_relevant_context(query: str, k: int = 3):
    try:
        query_embedding = embed_model.encode(query).tolist()
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=k
        )
        if results['documents'] and len(results['documents'][0]) > 0:
            return "\n\n".join(results['documents'][0])
    except Exception as e:
        print(f"Error querying ChromaDB: {e}")
    return ""

SYSTEM_PROMPT = """You are Niru AI, a helpful, professional, and slightly futuristic AI assistant for Niraj Shevade.
Your purpose is to answer questions about Niraj's skills, projects, experience, resume, and contact info based ONLY on the provided context.
If the user asks about his "best" or "top" project, do not say you don't know which is best. Instead, enthusiastically summarize the projects found in the context.
If the answer is not in the context, politely say you don't have that specific information but offer to help with something else or suggest they contact Niraj directly via LinkedIn or GitHub.
Keep your answers concise, well-formatted, and easy to read. Do not hallucinate information.
"""

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    try:
        body = await request.json()
        messages = body.get("messages", [])
        
        if not messages:
            raise HTTPException(status_code=400, detail="No messages provided")
            
        user_query = messages[-1].get("content", "")
        
        # Retrieve context
        context = get_relevant_context(user_query)
        
        # Construct prompt
        prompt = f"{SYSTEM_PROMPT}\n\nContext about Niraj:\n{context}\n\nUser Question: {user_query}\n\nAnswer:"
        
        # Create a streaming response
        def generate():
            try:
                if not client:
                    yield "\n[Error: Gemini API Client not initialized. Check your GEMINI_API_KEY in .env]"
                    return
                
                response = client.models.generate_content_stream(
                    model='gemini-2.5-flash',
                    contents=prompt
                )
                for chunk in response:
                    if chunk.text:
                        yield chunk.text
            except Exception as gen_err:
                err_msg = str(gen_err).replace('\n', ' ')
                print(f"Generation error: {err_msg}")
                yield f"\n[API Error: {err_msg}]"

        return StreamingResponse(generate(), media_type="text/plain")

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
