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
    console.log(origin)
    setOriginMarker(origin)
  }

  const [destinationMarker, setDestinationMarker] = useState(null)
  const selectDestinationMarker = (destination) => {
    console.log(destination)
    setDestinationMarker(destination)
  }



  // --------------FOR HINDRANCE MODAL--------------------
  const selectHindranceCenter = (latlng) => {
    setCenterLat(latlng.lat)
    setCenterLng(latlng.lng)
    setMapZoom(latlng.zoom)
  }


  const [someCoords, setSomeCoords] = useState([])

  const testHandleClick = (index) => {
    const mrtLine3 = [
      {
        lat: 14.652271,
        lng: 121.032348
      },
      {
        lat: 14.642875309888428,
        lng: 121.03840027831687
      },
      {
        lat: 14.635085821818052, 
        lng: 121.04339669515498
      },
      {
        lat: 14.619505867519198, 
        lng: 121.05112873828345
      },
      {
        lat: 14.607812679153275, 
        lng: 121.05652961704355
      },
      {
        lat: 14.587853625822573, 
        lng: 121.05672617427332
      }
    ]

    const lrtLine1 = [
      {
        lat: 14.657610798082027, 
        lng: 121.02108217193692
      },
      {
        lat: 14.657483249746225, 
        lng: 121.00406251771098
      },
      {
        lat: 14.657018374655037, 
        lng: 120.98433298453908
      },
      {
        lat: 14.656790848372182, 
        lng: 120.98395366291186
      },
      {
        lat: 14.654354100438272, 
        lng: 120.98389297145171
      },
    ]

    const mrtLine7 = [
      {
        lat: 14.655521050513967, 
        lng: 121.03082224805006
      },
      {
        lat: 14.651765049853578, 
        lng: 121.04928446648793
      },
      {
        lat: 14.669017980079666, 
        lng: 121.07600613614227
      },
      {
        lat: 14.674132394287836, 
        lng: 121.08080575487973
      },
    ]

    if (index === 0) {
      setSomeCoords(mrtLine3);
      setCenterLat(mrtLine3[2].lat)
      setCenterLng(mrtLine3[2].lng)
    } else if (index === 1) {
      setSomeCoords(lrtLine1)
      setCenterLat(lrtLine1[2].lat)
      setCenterLng(lrtLine1[2].lng)
    } else if (index === 2) {
      setSomeCoords(mrtLine7)
      setCenterLat(mrtLine7[2].lat)
      setCenterLng(mrtLine7[2].lng)
    }
    setMapZoom(12)
  }


    
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

          // Static Route Modal
          testHandleClick={testHandleClick}

          // Hindrance Modal
          selectHindranceCenter={selectHindranceCenter}

        />
      </div>

      <GoogleMapApi 
        
        someCoords={someCoords}
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

      />  

      <div className="home-buttons" onClick={() => {setSomeCoords([])}}>
        <HomeButtons 
          routeReport = {hasToken}
          routePlanner = {true}
          routeUpdate = {true}
          routeList = {true}
          routeMenu = {true}
          btnModalClick={btnModalClick}
        />
      </div>
    </>
  )
}

export default HomePage
