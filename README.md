LLM-Powered Intelligent Document Retrieval System:- 

This project is a solution for the Bajaj Hackathon problem statement: "Design an LLM-Powered Intelligent Query-Retrieval System that can process large documents and make contextual decisions."

The system is built to ingest various document types (PDFs, DOCX, Emails) and allow users to ask natural language queries. It uses a semantic search approach to find the most relevant clauses within the documents and then leverages a Large Language Model (LLM) to synthesize a contextual, explainable, and structured response.


🌟 Features
Multi-Document Support: Processes and extracts text from PDFs, DOCX files, and raw email documents.

Intelligent Query Parsing: Understands natural language queries to retrieve specific information.

Semantic Search: Utilizes document embeddings and a vector database (FAISS/Pinecone) for efficient and context-aware clause retrieval.

Explainable AI: The system provides a clear rationale for its answers, referencing the specific clauses it used to formulate the response.

Structured Output: Delivers all responses in a structured JSON format, making it easy to integrate with other applications.

Scalable Architecture: Built with FastAPI and a PostgreSQL database, designed to handle large document volumes.

🏗️ System Architecture
The project follows a standard Retrieval-Augmented Generation (RAG) architecture:

Document Ingestion: Documents are uploaded via a dedicated API endpoint.

Preprocessing & Chunking: The system parses the document, extracts the text, and splits it into logical "clauses" or chunks.

Embedding & Indexing: Each clause is converted into a high-dimensional vector (embedding) using a pre-trained model. These embeddings are then stored in a vector database (FAISS or Pinecone) for fast similarity search.

Query Processing: A user's query is received and also converted into an embedding.

Retrieval: The query embedding is used to perform a semantic search in the vector database, retrieving the most relevant clauses from the document.

LLM Reasoning: The retrieved clauses and the original user query are passed to an LLM. The LLM's role is to act as a reasoning engine, synthesizing an accurate answer and an explanation based only on the provided context.

Structured Response: The final answer, relevant clauses, and explanation are packaged into a JSON response and returned to the user.


⚙️ Tech Stack
Language: Python

Web Framework: FastAPI

Vector Database: FAISS (for local development) / Pinecone (for production-level scalability)

LLM & Embedding Models: langchain, sentence-transformers, or direct API calls to Google Gemini / OpenAI

Database: PostgreSQL

File Handling: python-multipart, pypdf, python-docx