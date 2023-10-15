import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import "../assets/styles/googlemap.css"
import GoogleMapStyle from '../utils/GoogleMapStyle'

const GoogleMapApi = ({mapStyle}) => {
    
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: "AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM",
    });

    if (!isLoaded) return <div>Loading...</div>

    const mapOptions = {
        zoom: 13,
        center: { lat: 14.676208, lng: 121.043861 },
        mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "hybrid"],
        },
        disableDefaultUI: true,
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: "large",
        },
        styles: GoogleMapStyle.mapStyle,
        mapTypeId: "roadmap",     
    }


    return <Map options={mapOptions} />
}

export default GoogleMapApi

function Map({ options }) {
    return (
        <GoogleMap 
            options={options}
            mapContainerClassName="map-container">
        </GoogleMap>
    )
}
