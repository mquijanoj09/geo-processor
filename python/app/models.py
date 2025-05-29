from pydantic import BaseModel, Field
from typing import List

class Point(BaseModel):
    lat: float = Field(..., description="Latitude")
    lng: float = Field(..., description="Longitude")

class RequestBody(BaseModel):
    points: List[Point]
