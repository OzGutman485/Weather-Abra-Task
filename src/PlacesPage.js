import { GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import Navbar from './navbar';
import { useSelector } from "react-redux";
import React, { useState } from 'react';
const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 31.0461, 
  lng: 34.8516,
};

function PlacesPage() {
    const places = useSelector((state) => state.places);
    console.log("Places in PlacesPage:", places);
    const [selectedPlace, setSelectedPlace] = useState(null);

  const fetchWeather = async (lat, lng) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
};
 return (
  <div>
    <Navbar/>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {places.map((place) => (
          <Marker
          key={place.id}
        position={place.coordinates}
          title={place.name}
        onClick={async () => {
        const weather = await fetchWeather(place.coordinates.lat, place.coordinates.lng);
       setSelectedPlace({ ...place, weather });
  }}
/>
        ))}
        {selectedPlace && (
      <InfoWindow
    position={selectedPlace.coordinates}
    onCloseClick={() => setSelectedPlace(null)}
  >
    <div>
      <h4>{selectedPlace.name}</h4>
      <p>{selectedPlace.weather.weather[0].description}</p>
      <p>🌡 {selectedPlace.weather.main.temp}°C</p>
    </div>
  </InfoWindow>
  )}
      </GoogleMap>
    </LoadScript>
    <ul>
      {places.map((place) =>
        <li key={place.createdAt}>
          {place.name} - {place.address} - {place.type}
        </li>
      )}
    </ul>
  </div>
    
  );
  
}
export default PlacesPage;