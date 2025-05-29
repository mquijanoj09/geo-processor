from fastapi import FastAPI, HTTPException
from app.models import RequestBody

app = FastAPI()

@app.post("/process")
def process_points(body: RequestBody):
    if not body.points:
        raise HTTPException(status_code=400, detail="The 'points' field must be a non-empty list.")

    lats = [p.lat for p in body.points]
    lngs = [p.lng for p in body.points]

    centroid_lat = sum(lats) / len(lats)
    centroid_lng = sum(lngs) / len(lngs)

    return {
        "centroid": {"lat": centroid_lat, "lng": centroid_lng},
        "bounds": {
            "north": max(lats),
            "south": min(lats),
            "east": max(lngs),
            "west": min(lngs),
        }
    }
