import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./Map.css";

export function Map() {
  return (
      <MapContainer className="map" center={[40.7826, -73.9656]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[40.7826, -73.9656]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
  );
}
