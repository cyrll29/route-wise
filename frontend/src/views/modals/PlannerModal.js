import { useState, useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import ModalHeader from "../../components/ModalHeader";
import routeIcon from "../../assets/img/route-modal-map-icon.png";
import routePlaceholder from "../../assets/img/placeholder.png";
import routeService from "../../services/routeService";
import config from "../../utils/config";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/modals.css";
import "../../assets/styles/routelist.css"
import RouteList from '../../components/planner/RouteList.js'

const RouteModal = ({ onItinerarySelect, selectCenterLat, selectCenterLng, selectOriginMarker, selectDestinationMarker }) => {

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [error, setError] = useState("");
  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);


  const getRoutes = () => {
    setRoutes(null)
    onItinerarySelect(null)

    if (originInputRef.current.value === '' || destinationInputRef.current.value === '') {
      setRoutes(null);
      setError("Wrong input");
      return;
    }

    const data = {
      origin: {
        lat: origin.getPlace().geometry.location.lat(),
        lng: origin.getPlace().geometry.location.lng()
      },
      destination: {
        lat: destination.getPlace().geometry.location.lat(),
        lng: destination.getPlace().geometry.location.lng()
      }
    };
    console.log(data);

    routeService
      .create(data)
      .then((response) => {
        console.log(response.data.otpResponse.plan);
        setRoutes(response.data.otpResponse.plan);
        setError("");
        onItinerarySelect(response.data.otpResponse.plan.itineraries[0])
        selectCenterLat(response.data.otpResponse.plan.itineraries[0].legs[Math.round(response.data.otpResponse.plan.itineraries[0].legs.length / 2)].from.lat)
        selectCenterLng(response.data.otpResponse.plan.itineraries[0].legs[Math.round(response.data.otpResponse.plan.itineraries[0].legs.length / 2)].from.lon)
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setRoutes(null);
          setError(error.response.data.message);
        }
      });
  };

  // SEARCH BOX OF ORIGIN AND DESTINATION
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: config.libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const onPlaceOriginChanged = (origin) => {
    if (origin !== null) {
      const places = {
        lat: origin.getPlace().geometry.location.lat(),
        lng: origin.getPlace().geometry.location.lng()
      };
      console.log(places);
      selectOriginMarker(places)
      selectCenterLat(places.lat)
      selectCenterLng(places.lng)

    }
    setError("");
  };

  const onPlaceDestinationChanged = (destination) => {
    if (destination !== null) {
      const places = {
        lat: destination.getPlace().geometry.location.lat(),
        lng: destination.getPlace().geometry.location.lng()
      };
      console.log(places);
      selectDestinationMarker(places)
      selectCenterLat(places.lat)
      selectCenterLng(places.lng)
      
    }
    setError("");
  };

  const options = {
    componentRestrictions: { 
      country: "ph" ,
      // locality: "quezoncity"
    },  
    fields: ["geometry"],
  };

  const handleReset = () => {
    setRoutes(null)
    onItinerarySelect(null)
    originInputRef.current.value = null
    destinationInputRef.current.value = null
  }

  return (
    <>
      <ModalHeader title="Planner" />

      <div className="route-modal-top">
        <div className="route-modal-top-title">
          <h4>Find your Public Transportation Route</h4>
        </div>

        <div className="route-modal-search">
          <div className="route-modal-top-left">
            <img
              className="route-modal-icon"
              src={routeIcon}
              alt="route-icon"
            />

            <div className="route-modal-search-box">
              <Autocomplete
                onPlaceChanged={() => onPlaceOriginChanged(origin)}
                options={options}
                onLoad={(autocomplete) => setOrigin(autocomplete)}
              >
                <input
                  id="Origin"
                  type="text"
                  placeholder="Origin"
                  className="route-modal-combo-box"
                  ref={originInputRef}
                />
              </Autocomplete>

              <Autocomplete
                onPlaceChanged={() => onPlaceDestinationChanged(destination)}
                options={options}
                onLoad={(autocomplete) => setDestination(autocomplete)}
              >
                <input
                  id="Destination"
                  type="text"
                  placeholder="Destination"
                  className="route-modal-combo-box"
                  ref={destinationInputRef}
                />
              </Autocomplete>
            </div>
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="route-modal-button">
          <button className="route-modal-btn" onClick={getRoutes}>
            Find Route
          </button>
        </div>

        <div className="route-modal-bottom">
          {!routes ? (
            <div className="route-modal-bottom-nonexist">
              <img
                className="route-modal-bottom-placeholder"
                src={routePlaceholder}
                alt="route"
              ></img>
              <p>Please enter both origin and destination.</p>
            </div>
          ) : (
            <div className="route-modal-list">
              <div>
                <h4 className="route-modal-suggestedroutes">
                  Suggested Routes
                </h4>
                <div className="route-modal-button-reset">
                  <button onClick={handleReset} className="route-modal-btn-reset">Reset</button>
                </div>
              </div>
              <div>
                <RouteList 
                  routes={routes} 
                  onItinerarySelect={onItinerarySelect}
                  selectCenterLat={selectCenterLat}
                  selectCenterLng={selectCenterLng}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RouteModal;

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);
library.add(...iconList);

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     fontSize: '15px',
//     border: '2px inset #EBE9ED',
//     width: '290px',
//     height: '100px',
//   }),
// };
