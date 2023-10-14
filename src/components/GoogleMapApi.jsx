import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import "../assets/styles/home.css"

const GoogleMapApi = () => {

    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: "AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM" 
    });

    if (!isLoaded) return <div>Loading...</div>


    return <Map />
}

export default GoogleMapApi

function Map() {
    return (
        <GoogleMap 
            // maxZoom={11}
            // mapTypeId={cf8af2361b08851}
            zoom={13} 
            center={{lat: 14.676208, lng: 121.043861}} 
            mapContainerClassName="map-container">
        </GoogleMap>
    )
}
