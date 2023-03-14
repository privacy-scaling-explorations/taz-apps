import React from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '500px'
};

const center = {
  lat: 42.7087,
  lng: 19.3744
};
const podgorica = {
  lat: 42.442574,
  lng: 19.268646
}

function SimpleMap() {
  return (
    <>
    <div className='shadow-xl' >
      <LoadScript
        googleMapsApiKey="AIzaSyDicf8wy42J9FTusBpk5MtLA5G4zTMvL6E"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <MarkerF position={center} title="Dome" label="Dome" />
          <MarkerF position={podgorica} title="Lighthouse" label="Lighthouse" />
        </GoogleMap>
      </LoadScript>
    </div>
    </>
  )
}

export default React.memo(SimpleMap)
