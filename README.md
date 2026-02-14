# MedRAG-AI-Agent-LangChain

MedRAG is a multimodal, literature-grounded clinical decision support system built using LangChain and LangGraph. It enables users to submit symptoms via text, audio, or medical report uploads and generates structured differential diagnoses grounded in peer-reviewed PubMed literature.

This project focuses on reliability, modular architecture, safety constraints, and deterministic confidence modeling rather than simple LLM-based chat responses.

---

## Core Capabilities

* Structured symptom extraction from free-form input
* PubMed-based Retrieval-Augmented Generation (RAG)
* Evidence-backed differential diagnosis
* Citation validation and hallucination detection
* Deterministic confidence scoring
* Threshold-based diagnosis report generation (PDF)
* Multimodal ingestion (text, audio, image, PDF, DOCX)
* Modular, production-grade FastAPI backend

---

## System Architecture

```
User Input
    → Multimodal Ingestion
    → Symptom Structuring
    → PubMed Retrieval
    → Evidence Synthesis
    → Critic Evaluation
    → Safety Filter
    → Confidence Aggregation
    → (Optional) PDF Report Generation
```

---

## Project Structure

```
medrag/
│
├── app/
│   ├── api/                # FastAPI route layer
│   ├── agents/             # LangGraph orchestration
│   ├── core/               # LLM + vector infrastructure
│   ├── ingestion/          # Multimodal processing
│   ├── retrieval/          # PubMed retrieval logic
│   ├── tools/              # LangChain tool wrappers
│   ├── evaluation/         # Reliability + scoring
│   ├── confidence/         # Confidence aggregation
│   ├── safety/             # Clinical safeguards
│   ├── reports/            # PDF report generation
│   ├── schemas/            # Pydantic models
│   ├── storage/            # Database layer
│   └── main.py             # FastAPI entrypoint
│
├── scripts/                # CLI utilities
├── tests/                  # Unit and integration tests
├── docker/
├── requirements.txt
├── pyproject.toml
└── README.md
```

---

## Installation

### 1. Clone the Repository

```
git clone https://github.com/<your-username>/MedRAG-AI-Agent-LangChain.git
cd MedRAG-AI-Agent-LangChain
```

### 2. Create a Virtual Environment

Using venv:

```
python -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows
```

Or using conda:

```
conda create -n medrag python=3.11
conda activate medrag
```

### 3. Install Dependencies

```
pip install -r requirements.txt
```

If using pyproject:

```
pip install -e .
```

---

## Required Dependencies

Core libraries typically include:

* fastapi
* uvicorn
* langchain
* langchain-community
* langgraph
* pydantic
* chromadb or faiss
* openai (or model provider)
* python-docx
* weasyprint or reportlab
* whisper (if audio support enabled)
* pillow / pytesseract (if OCR enabled)

Ensure these are listed in `requirements.txt`.

---

## Environment Variables

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your_api_key_here
MODEL_NAME=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-large
DATABASE_URL=mongodb://localhost:27017
```

Load environment variables via `python-dotenv` or FastAPI settings.

---

## Running the Backend

Start the FastAPI server:

```
uvicorn app.main:app --reload
```

Default server:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

## Building PubMed Index

Before running retrieval-heavy tasks, optionally build your local index:

```
python scripts/build_pubmed_index.py
```

This fetches and embeds selected PubMed documents.

---

## Running Tests

```
pytest
```

Run specific test directory:

```
pytest tests/unit/
```

---

## Docker Setup

Build container:

```
docker build -t medrag .
```

Run container:

```
docker run -p 8000:8000 medrag
```

Or with docker-compose:

```
docker-compose up --build
```

---

## How Confidence Threshold Works

The system computes confidence using:

* Retrieval relevance score
* Citation validation score
* Critic evaluation score
* Hallucination penalty

If final confidence ≥ defined threshold (e.g., 0.90), a structured diagnosis report is generated in PDF format.

---

## Disclaimer

This project is intended for research and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.

---

## Future Improvements

* Hybrid retrieval (BM25 + vector search)
* Cross-encoder reranking
* ICD mapping support
* FHIR export
* Long-term memory persistence
* Benchmark dashboard for hallucination rate

---

## License

MIT License
