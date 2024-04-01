import { useState, useEffect } from 'react'
import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 
import reportService from '../services/reportService'
import '../assets/styles/home.css'



const HomePage = () => {

  // -----------------FOR SHOW MODAL-------------------
  const [activeModal, setActiveModal] = useState("planner")
  const btnModalClick = (modal) => {
    setActiveModal(modal);
    setReportMarker(null)
    setReportData(null)
    setCenterLat(14.6515)
    setCenterLng(121.0493)
    setMapZoom(14)
    setSelectedItinerary(null)
  }


  // -----------------FOR USER TOKEN--------------------
  const [hasToken, setHasToken] = useState()
  useEffect(() => {
    setHasToken(reportService.getToken())
  }, [])


  // ----------------FOR GENERAL USE------------------
  const [mapZoom, setMapZoom] = useState(15)
  const [centerLat, setCenterLat] = useState(14.6515)
  const [centerLng, setCenterLng] = useState(121.0493)

  const selectMapZoom = (zoom) => {
    setMapZoom(zoom)
  }


  // ----------------FOR REPORT MODAL------------------
  const [isMarkLocation, setIsMarkLocation] = useState(false)
  const onMarkLocation = (isMarking) => {
    setIsMarkLocation(isMarking)
  };

  const [reportData, setReportData] = useState(null)
  const onLocationSelect = (location) => {
    setReportData(location)
  };

  const [reportMarker, setReportMarker] = useState(null)
  const selectReportMarker = (isMarking) => {
    setReportMarker(isMarking)
  }

  useEffect(() => {
    if (reportData) {
      setMapZoom(16)
      setCenterLat(reportData.lat)
      setCenterLng(reportData.lng)
      setReportMarker({lat: reportData.lat, lng: reportData.lng})
      console.log("run")
    } 
  }, [reportData])



  // --------------FOR PLANNER MODAL--------------------
  const [selectedItinerary, setSelectedItinerary] = useState(null)
  const onItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary)
  }

  const selectPlannerCenter = (latlng) => {
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }

  const selectRouteDetailCenter = (latlng) => {
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }

  const [originMarker, setOriginMarker] = useState(null)
  const selectOriginMarker = (origin) => {
    setOriginMarker(origin)
  }

  const [destinationMarker, setDestinationMarker] = useState(null)
  const selectDestinationMarker = (destination) => {
    setDestinationMarker(destination)
  }


  // --------------FOR HINDRANCE MODAL--------------------
  const selectHindranceCenter = (latlng) => {
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }


  const [showTrafficLayer, setShowTrafficLayer] = useState(true)


    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 

          // Show Modal
          routeReportModal={activeModal === "report"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
          routeListModal={activeModal === "list"}
          routeMenuModal={activeModal === "menu"}

          // Report Modal
          onMarkLocation={onMarkLocation}
          onLocationSelect={onLocationSelect}
          reportData={reportData}
          selectReportMarker={selectReportMarker}
          selectMapZoom={selectMapZoom}


          // Planner Modal
          onItinerarySelect={onItinerarySelect}
          selectPlannerCenter={selectPlannerCenter}
          selectOriginMarker={selectOriginMarker}
          selectDestinationMarker={selectDestinationMarker}
          selectRouteDetailCenter={selectRouteDetailCenter}


          // Hindrance Modal
          selectHindranceCenter={selectHindranceCenter}

        />
      </div>

      <GoogleMapApi 
        
        mapZoom={mapZoom}
        centerLat={centerLat}
        centerLng={centerLng}      

        // Report Modal
        isMarkLocation={isMarkLocation} // boolean variable
        onMarkLocation={onMarkLocation} // function that will setIsMarkLocation
        onLocationSelect={onLocationSelect}
        reportMarker={reportMarker}

        // Planner Modal
        selectedItinerary={selectedItinerary}
        originMarker={originMarker}
        destinationMarker={destinationMarker}
        selectOriginMarker={selectOriginMarker}
        selectDestinationMarker={selectDestinationMarker}

        showTrafficLayer={showTrafficLayer}

      />  

      <div className="home-buttons">
        <HomeButtons 
          routeReport = {hasToken}
          routePlanner = {true}
          routeUpdate = {true}
          routeMenu = {true}
          btnModalClick={btnModalClick}
        />
      </div>

      <div className='home-page-layers'>
        <button className='gmap-layer-button' onClick={() => setShowTrafficLayer(true)}>Traffic</button>
        <button className='gmap-layer-button' onClick={() => setShowTrafficLayer(null)}>Terrain</button>
      </div>
    </>
  )
}

export default HomePage
