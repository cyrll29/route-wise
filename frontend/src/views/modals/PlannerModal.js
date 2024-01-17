import { useState, useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
// import Select from 'react-select'
import ModalHeader from "../../components/ModalHeader";
import routeIcon from "../../assets/img/route-modal-map-icon.png";
import routePlaceholder from "../../assets/img/placeholder.png";
import routeService from "../../services/routeService";
import config from "../../utils/config";
import RouteList from "../../components/planner/RouteList.js";

import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/modals.css";

const RouteModal = () => {
  // const transportationOptions = [
  //   { value: '0', label: 'Jeepney'},
  //   { value: '1', label: 'Carousel'},
  //   { value: '2', label: 'Train'},
  //   { value: '3', label: 'UV Express'},
  //   { value: '4', label: 'Walking'}
  // ]

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [transportation, setTransportation] = useState([]);
  const [routes, setRoutes] = useState(null);
  const [error, setError] = useState("");

  const [overviewPolyline, setOverviewPolyline] =  useState('')
  const addPolyline = (polyline) => {
    setOverviewPolyline(polyline)
  }

  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  // API REQUEST
  const clearInputFields = () => {
    setTransportation([]);
    // originInputRef.current.value = "";
    // destinationInputRef.current.value = "";
  };

  const getRoutes = () => {
    if (!origin && !destination) {
      setRoutes([]);
      setError("Wrong input");
      return;
    }
    const data = {
      origin: origin.getPlace().place_id,
      destination: destination.getPlace().place_id,
      transportation,
    };
    console.log(data);

    routeService
      .create(data)
      .then((response) => {
        console.log(response.data);
        setRoutes(response.data.data.routes);
        setError("");
        clearInputFields();
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setRoutes([]);
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

  const onPlaceChanged = (originOrDestination) => {
    if (originOrDestination !== null) {
      const places = originOrDestination.getPlace();
      console.log(places);
    }
    setError("");
  };

  const options = {
    componentRestrictions: { country: "ph" },
    // fields: ["address_components", "geometry", "icon", "name"],
    fields: ["place_id"],
  };

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
                onPlaceChanged={() => onPlaceChanged(origin)}
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
                onPlaceChanged={() => onPlaceChanged(destination)}
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

        {/* <div className='route-modal-top-options'>
          <FontAwesomeIcon icon="car" className="route-modal-reset-icon"/>
          <Select
              id='transportation-options'
              options={transportationOptions}
              isSearchable
              isMulti
              value={transportation}
              onChange={(selectedOption) => setTransportation(selectedOption)}
              placeholder="Select a transportation option"
              styles={customStyles}
          />
        </div> */}

        {error && <div className="error-msg">{error}</div>}

        <div className="route-modal-button" onClick={() => console.log(localStorage.getItem("polyline"))}>
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
                  <button className="route-modal-btn-reset">Reset</button>
                </div>
              </div>
              <div>
                <RouteList routes={routes} addPolyline={addPolyline} />
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
