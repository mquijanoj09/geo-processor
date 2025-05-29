import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Rectangle, Circle } from "react-leaflet";

import type { LatLngBoundsExpression } from "leaflet";

export type MapResult = {
  bounds: {
    south: number | string;
    west: number | string;
    north: number | string;
    east: number | string;
  };
  centroid: {
    lat: number;
    lng: number;
  };
};

const MapWithBounds = ({ result }: { result: MapResult }) => {
  const rectangleBounds: LatLngBoundsExpression = [
    [Number(result.bounds.south), Number(result.bounds.west)], // southwest
    [Number(result.bounds.north), Number(result.bounds.east)], // northeast
  ];

  return (
    <MapContainer
      center={[result.centroid.lat, result.centroid.lng]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
      bounds={rectangleBounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[result.centroid.lat, result.centroid.lng]}
        radius={50000}
        pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.2 }}
      />
      <Rectangle bounds={rectangleBounds} pathOptions={{ color: "blue" }} />
    </MapContainer>
  );
};

export default MapWithBounds;
