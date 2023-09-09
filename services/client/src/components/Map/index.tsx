import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 1000,
  lng: 1000,
};

const GoogleMapsComponent = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {/* You can add markers or other components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;

// const address = 'Your Address Here';
//   const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

//   return (
//     <div>
//       <h1>My Location</h1>
//       <p>Address: {address}</p>
//       <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
//         Open in Google Maps
//       </a>
//     </div>
//   );
