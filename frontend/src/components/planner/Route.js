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
    selectPlannerCenter({lat: itinerary.legs[0].from.lat, lng: itinerary.legs[0].from.lon, zoom: 15})
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

  // -------Time Formatter---------
  const formatTime = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedMinutes = ('0' + minutes).substr(-2);
    return `${formattedHours}:${formattedMinutes} ${amPM}`;
  }

  const adjustedWidth = (itinerary.duration/longestDuration * 100) + '%'


  const markerPosition = (distance) => {
    // const position = (duration/(itinerary.endTime) * 100) + '%'
    // return position;
    let totalDistance = 0;
    for(let i = 0; i < itinerary.legs.length; i++) {
      totalDistance += itinerary.legs[i].distance
    }
    const position = ((distance/totalDistance) * 100) + '%'
    return position;
  }


  const legColors = (leg) => {
    let legColor = "black"
    if(leg.mode === "WALK"){
      legColor = "#FF7F7F"
    } else if(leg.mode === "BUS") {
      legColor = "#45B6FE"
    } else if(leg.mode === "RAIL") {
      legColor = "#FFA756"
    }
    return legColor
  }
  
  
  return (
    <>
      {!itinerary ? (
        <></>
      ) : (
        <div>
          <div onClick={handleItineraryClick} className='main-grid'>
            <div style={styles.mainGridHeader}>
              <p style={{fontWeight: 'bold'}}>{formatDuration(itinerary.duration)}</p>
              <ul style={styles.modeOfTranspo}>
                {itinerary.legs.map((leg, index) => (
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
                    {leg.mode}
                  </div>
                ))}
              </ul>
            </div>
            <div className='distance-time' style={{fontSize: 13, marginBottom: 5, marginTop: 5}}>
              <p>{formatTime(itinerary.startTime)}</p>
              <p>{formatTime(itinerary.endTime)}</p>
            </div>
            <div style={styles.grayBar}>
              <div style={{ 
                width: adjustedWidth, 
                height: '100%', 
                backgroundColor: '#880015', 
                borderRadius: 10}}>
                  <ul style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    {itinerary.legs.map((leg, index) => (
                      <div key={index} style={{width: markerPosition(leg.distance), height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                {itinerary.legs.map((leg, index) => (
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