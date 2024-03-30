import { useState } from 'react'
import RouteDetail from './RouteDetail'
import "../../assets/styles/routelist.css"
import SendEmailModal from './SendEmailModal'


const Route = (props) => {

  const {
    itinerary,
    routesDuration,
    onItinerarySelect,
    selectPlannerCenter,
    selectRouteDetailCenter,
    origin,
    destination
  } = props

  const [showDetails, setShowDetails] = useState(null)
  const [sendEmailPopup, setSendEmailPopup] = useState(null)
  const longestDuration = Math.max(...routesDuration)


  const handleItineraryClick = () => {
    onItinerarySelect(itinerary)
    setShowDetails(!showDetails)
    selectPlannerCenter({lat: itinerary.legs[0].start_location.lat, lng: itinerary.legs[0].start_location.lng, zoom: 15})
  }


  // -------Duration Formatter---------
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    seconds %= 3600
    const minutes = Math.floor(seconds / 60)
  
    let formattedDuration = ''
  
    if (hours > 0) {
        formattedDuration += `${hours} hr`
        if (hours > 1) formattedDuration += 's'
    }
  
    if (minutes > 0) {
        if (formattedDuration !== '') formattedDuration += ' '
        formattedDuration += `${minutes} min`
        if (minutes > 1) formattedDuration += 's'
    }
    return formattedDuration;
  }


  const adjustedWidth = (itinerary.legs[0].duration.value/longestDuration * 100) + '%'
  const markerPosition = (distance) => {
    let totalDistance = 0;
    for(let i = 0; i < itinerary.legs[0].steps.length; i++) {
      totalDistance += itinerary.legs[0].steps[i].distance.value
    }
    const position = ((distance/totalDistance) * 100) + '%'
    return position;
  }


  const legColors = (leg) => {
    if (leg.travel_mode === "WALKING"){
      return "#FF7F7F"
    }
    if (leg.travel_mode === "TRANSIT") {
      if (leg.transit_details.line.vehicle.type === "BUS") {
        return "#45B6FE"
      } else if (leg.transit_details.line.vehicle.type === "TRAM") {
        return "#FFA756"
      }
    }
  }

  const travelMode = (leg) => {
    if (leg.travel_mode === "WALKING") {
      return "WALK"
    }
    if (leg.travel_mode === "TRANSIT") {
      return leg.transit_details.line.vehicle.type
    }
  }
  
  
  return (
    <>
      {!itinerary ? (
        <></>
      ) : (
        <div>
          <div onClick={handleItineraryClick} className='main-grid'>
            <div style={styles.mainGridHeader}>
              <p style={{fontWeight: 'bold'}}>{formatDuration(itinerary.legs[0].duration.value)}</p>
              <ul style={styles.modeOfTranspo}>
                {itinerary.legs[0].steps.map((leg, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 60,
                    backgroundColor: legColors(leg),
                    margin: 2,
                    padding: 2,
                    borderRadius: 6,
                    fontWeight: 'bold',
                    color: 'white'}}>
                    {travelMode(leg)}
                  </div>
                ))}
              </ul>
            </div>

            {itinerary.legs[0].departure_time ? (
              <div className='distance-time' style={{fontSize: 13, marginBottom: 5, marginTop: 5}}>
                <p>{itinerary.legs[0].departure_time.text}</p>
                <p>{itinerary.legs[0].arrival_time.text}</p>
              </div>
            ) : (
              <></>
            )}


            <div style={styles.grayBar}>
              <div style={{ 
                width: adjustedWidth, 
                height: '100%', 
                backgroundColor: '#880015', 
                borderRadius: 10}}>
                  <ul style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    {itinerary.legs[0].steps.map((leg, index) => (
                      <div key={index} style={{width: markerPosition(leg.distance.value), height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <div key={index} style={{width: 10, height: 10, backgroundColor: '#880015', borderRadius: '50%', top: -2, position: 'relative'}}>
                          &nbsp;
                        </div>
                      </div>
                    ))}
                  </ul>
              </div>
            </div>
          </div>


          {showDetails ? (
            <div>
              <div className='send-route-div'>
                <button onClick={() => setSendEmailPopup(true)} className='send-route-email'>Send route via Email</button>
              </div>
              <ul>
                {itinerary.legs[0].steps.map((leg, index) => (
                  <RouteDetail 
                    key={index} 
                    leg={leg}
                    selectRouteDetailCenter={selectRouteDetailCenter}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

      {sendEmailPopup && 
        <SendEmailModal 
          onClose={() => setSendEmailPopup(false)}
          itinerary={itinerary}
          origin={origin}
          destination={destination}
        />
      }
      
    </>
  )
}

export default Route

const styles = {
  mainGrid: {
    display: 'flex',
    backgroundColor: 'lightblue',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,

    height: 120,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    borderRadius: 10
  },

  modeOfTranspo: {
    display: 'flex',
    flexDirection: 'row'
  },

  mainGridHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center'
  },

  grayBar: {
    backgroundColor: "gray",

    height: '5%',
    width: '90%',

    borderRadius: 10
  },

  circleMarker: {
    width: 20,
    height: '100%',
    backgroundColor: 'white',

    borderRadius: '50%',

    position: 'relative',
    right: 0
  }
}