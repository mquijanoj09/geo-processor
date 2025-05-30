# 🗺️ Geo Coordinate Processor

This project is a **microservices-based geo-processing app** built with:

- 🌐 **Next.js** — Frontend to input and visualize coordinates  
- ⚙️ **NestJS** — API gateway for validation and caching  
- 🧠 **FastAPI (Python)** — Backend for geographic calculations

---

## 📂 Project Structure

- /nextjs → Frontend (React + Leaflet)
- /nestjs → API Gateway (Node.js + NestJS)
- /python → Geo Processor (FastAPI)


---

## 🚀 Getting Started

Follow the steps below to run each service.

### 1️⃣ Start the Python Service (FastAPI)
```bash
cd python
pip install -r requirements.txt
python -m venv venv
venv\Scripts\activate
python -m uvicorn app.main:app --reload
Runs at: http://localhost:8000
```

### 2️⃣ Start the NestJS API Gateway
```bash
cd nestjs
npm install
npm run start:dev
Runs at: http://localhost:3000
```

### 3️⃣ Start the Next.js Frontend
```bash
cd nextjs
npm install
npm run dev
Runs at: http://localhost:3001
```

### 🧪 Testing the App
Go to http://localhost:3001

Enter coordinates in this format (one per line):
```
40.7128,-74.0060
34.0522,-118.2437
Click Process to see the calculated bounding box and centroid on the map.
```
### 📸 Result
<img width="887" alt="image" src="https://github.com/user-attachments/assets/6c7f8212-27c6-41b8-b0d9-956056000c04" />


### 🛠️ Tech Stack
Layer	Tech
Frontend	Next.js, Leaflet
Gateway	NestJS, Axios, Cache
Backend	FastAPI (Python), Pydantic
