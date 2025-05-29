# geo-processor-py

FastAPI microservice to calculate geographic bounds and centroid for a list of latitude/longitude points.

## 🚀 How to Run

```bash
# Local
pip install -r requirements.txt
uvicorn app.main:app --reload

# Docker
docker build -t geo-processor .
docker run -p 8000:8000 geo-processor
```
