'use client'
import React, { useEffect, useRef } from 'react';

interface Props {
  coordenadas: [number, number][];
}

const Mapa: React.FC<Props> = ({ coordenadas }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    if (typeof window !== 'undefined') {
      require('leaflet/dist/leaflet.js');
    }

    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    const redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    coordenadas.forEach((coordenada) => {
      L.marker(coordenada, { icon: redIcon }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [coordenadas]);

  return <div style={{ height: '500px' }} ref={mapRef} />;
};

export default Mapa;
