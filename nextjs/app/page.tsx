"use client";
import { useState } from "react";

import MapWithBounds, { MapResult } from "./map";

export default function Home() {
  const [pointsText, setPointsText] = useState("");

  const [result, setResult] = useState<MapResult | null>(null);
  const [error, setError] = useState("");

  function parsePoints(text: string): { lat: number; lng: number }[] {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const [latStr, lngStr] = line.split(",");
        return { lat: parseFloat(latStr), lng: parseFloat(lngStr) };
      });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResult(null);

    const points = parsePoints(pointsText);

    if (
      points.length === 0 ||
      points.some((p) => isNaN(p.lat) || isNaN(p.lng))
    ) {
      setError("Please enter valid lat,lng pairs, one per line.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to process points.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  }

  return (
    <div className="p-20 flex flex-col lg:flex-row gap-5">
      <div>
        <h1 className="text-2xl font-bold mb-4">Map Bounds Calculator</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Enter points (lat,lng) one per line:
            <textarea
              rows={6}
              value={pointsText}
              onChange={(e) => setPointsText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder={`Example:\n37.7749,-122.4194\n34.0522,-118.2437\n40.7128,-74.0060`}
            />
          </label>
          <br />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Process
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {result && (
        <div className="flex-1">
          <MapWithBounds result={result} />
        </div>
      )}
    </div>
  );
}
