import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Fix for default marker icons in Leaflet with React
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const countries = [
  { name: 'USA', code: 'us', coords: [37.0902, -95.7129] as [number, number] },
  { name: 'UK', code: 'gb', coords: [55.3781, -3.4360] as [number, number] },
  { name: 'Bangladesh', code: 'bd', coords: [23.6850, 90.3563] as [number, number] },
  { name: 'Saudi Arabia', code: 'sa', coords: [23.8859, 45.0792] as [number, number] },
  { name: 'China', code: 'cn', coords: [35.8617, 104.1954] as [number, number] },
  { name: 'India', code: 'in', coords: [20.5937, 78.9629] as [number, number] },
  { name: 'Canada', code: 'ca', coords: [56.1304, -106.3468] as [number, number] },
  { name: 'Australia', code: 'au', coords: [-25.2744, 133.7751] as [number, number] },
  { name: 'Germany', code: 'de', coords: [51.1657, 10.4515] as [number, number] },
  { name: 'France', code: 'fr', coords: [46.2276, 2.2137] as [number, number] }
];

export default function WorldMap({ onCountrySelect }: { onCountrySelect: (code: string) => void }) {
  const { t } = useTranslation();

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner bg-zinc-100 dark:bg-zinc-900">
      <MapContainer 
        center={[20, 0] as [number, number]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map((country) => (
          <Marker 
            key={country.code} 
            position={country.coords}
            eventHandlers={{
              click: () => onCountrySelect(country.code),
            }}
          >
            <Popup>
              <div className="text-center">
                <p className="font-bold text-zinc-900">{country.name}</p>
                <button 
                  onClick={() => onCountrySelect(country.code)}
                  className="mt-2 text-xs text-emerald-600 font-bold hover:underline"
                >
                  View Headlines
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
