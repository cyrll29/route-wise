import { useState, useEffect } from 'react'
import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 
import reportService from '../services/reportService'
import '../assets/styles/home.css'
import decodePolyline from 'decode-google-map-polyline'



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


  const [staticRoute, setStaticRoute] = useState([])

  const testHandleClick = (index) => {
    const mrtLine3Encoded = [
      "gwlxAucvaV|y@ae@",
      "i|jxAwiwaVhn@e]",
      "_mixA}gxaVxPkJloAgd@",
      "wjfxAqxyaV|gAe`@",
      "yadxAwyzaVve@oPxL}A`MNrMpCrj@vL"
    ]

    const lrtLine1Encoded = [
      "_ymxA_}saVOvEl@tbB",
      "axmxAqrpaVx@bzBt@tAxNJ"
    ]

    const proj6SMNorthEDSA = [
      "ijmxAw~uaVvC_U",
      "qemxAwtvaVch@}GoFUsELyBVw@sF",
      "kboxAydwaVyB}ODwBN{Aj@_BbAuAnAiArAw@hB_@[gC",
      "mznxAkkxaVxRqCb@dDeHvk@"
    ]

    const SMNorthEDSAMonumento = [
      "{mmxA_|uaV|@HQfAs@hBEr@Lr@qJfs@S~D?fC",
      "azmxAktsaVVhu@",
      "iymxAa~qaV`@nk@",
      "gxmxAqqpaV?xd@",
      "gxmxAwkoaVn@ziA"
    ]

    const SMNorthEDSAFairview = [
      "{mmxA_|uaV|@HQfAs@hBEr@Lr@qJfs@S~D?fC",
      "czmxAwtsaVkYqAiB_@oAw@s@aAgQwcA_A_CuHwG",
      "{yoxAsmvaVoGbEgDdAgDn@}BH}qAvA{E\\eEf@eAV_Bn@gAz@kMpR",
      "sftxA{fuaVsU_Rgd@{UgEcCcI_GcMoGuHqCwr@oJmEM}c@tD",
      "yizxAepwaV_A}J]g@QEaDb@cPz@eO}BoM{SeBmQkIyMo@cBwF_W",
    ]

    const carouselEncoded = [
      "ovmxA_cmaVg@_iA",
      "wwmxA_moaVQgi@",
      "ixmxAgwpaVMwh@",
      "wxmxA_araVY}q@",
      "qymxA}ssaV@aBr@uJvIuo@Vo@`@i@`XiO",
      "grlxAofvaVh|@{f@",
      "}tjxAknwaVvt@wa@pNgFrM_F",
      "_ahxAk_yaV|uA{f@",
      "ajexAggzaVhb@mO",
      "yadxAwyzaVve@oPxL}A`MNrMpCrj@vL"
    ]

    if (index === 0) {
      setStaticRoute(mrtLine3Encoded)
      const decoded = decodePolyline(mrtLine3Encoded[2])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
      setMapZoom(12)
    } else if (index === 1) {
      setStaticRoute(lrtLine1Encoded)
      const decoded = decodePolyline(lrtLine1Encoded[1])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
    } else if (index === 2) {
      // setCenterLat(mrtLine7[2].lat)
      // setCenterLng(mrtLine7[2].lng)
    } else if (index === 3) {
      setStaticRoute(proj6SMNorthEDSA)
      const decoded = decodePolyline(proj6SMNorthEDSA[1])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
      setMapZoom(16)
    } else if (index === 4) {
      setStaticRoute(SMNorthEDSAMonumento)
      const decoded = decodePolyline(SMNorthEDSAMonumento[1])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
      setMapZoom(16)
    } else if (index === 5) {
      setStaticRoute(SMNorthEDSAFairview)
      const decoded = decodePolyline(SMNorthEDSAFairview[2])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
      setMapZoom(16)
    }
    else if (index === 6) {
      setStaticRoute(carouselEncoded)
      const decoded = decodePolyline(carouselEncoded[2])
      setCenterLat(decoded[0].lat)
      setCenterLng(decoded[0].lng)
      setMapZoom(16)
    }
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
        
        // someCoords={someCoords}
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

        // List Modal
        staticRoute={staticRoute}
        showTrafficLayer={showTrafficLayer}

      />  

      <div className="home-buttons" onClick={() => setStaticRoute()}>
        <HomeButtons 
          routeReport = {hasToken}
          routePlanner = {true}
          routeUpdate = {true}
          routeList = {true}
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
