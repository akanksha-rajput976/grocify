"use client";

import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/14831/14831599.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function DraggableMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (p: [number, number]) => void;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(position as LatLngExpression);
  }, [position, map]);

  return (
    <Marker
      draggable
      icon={markerIcon}
      position={position as LatLngExpression}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target as L.Marker;
          const { lat, lng } = marker.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    />
  );
}

export default function CheckoutMap({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (p: [number, number]) => void;
}) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker position={position} setPosition={setPosition} />
    </MapContainer>
  );
}
