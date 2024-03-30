import '../../assets/styles/routelist.css'
import { useState } from 'react'
import parse from 'html-react-parser'



const RouteDetail = ({ leg, selectRouteDetailCenter }) => {

  const [showMoreDetails, setShowMoreDetails] = useState(null)

  const modeContainer = () => {
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

  const travelMode = () => {
    if (leg.travel_mode === "WALKING") {
      return "WALK"
    }
    if (leg.travel_mode === "TRANSIT") {
      return leg.transit_details.line.vehicle.type
    }
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


  // -------Distance Formatter---------
  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`
    } else if (distance > 1000) {
      return `${(distance/1000).toFixed(2)} km`
    }
  }


  const handleDetailClick = () => {
    selectRouteDetailCenter({lat: leg.start_location.lat, lng: leg.start_location.lng, zoom: 18})
    setShowMoreDetails(!showMoreDetails)
  }

  
  return (
    <div onClick={handleDetailClick}>
      <div className="route-detail-leg">
        <div className='route-detail-top'>
          <div>
            <p style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: modeContainer(), 
              width: 60,
              height: 25,
              color: 'white',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5
            }}>
              {travelMode()}
            </p>
          </div>
          <div>
            <p style={{
              fontWeight: 'bold'
            }}>
              {formatDuration(leg.duration.value)}
            </p>
          </div>
        </div>


        <div className="distance-bar-div">
          <div className="distance-bar">
            <div className="distance-marker"></div>
            <div className="distance-marker"></div>
          </div>
        </div>



        {leg.travel_mode === "TRANSIT" ? (
          <div className='origin-and-destination'>

            <div className='distance-time'>
              <p style={{fontSize: 14}}>{leg.transit_details.departure_time.text}</p>
              <p style={{fontSize: 12}}>{formatDistance(leg.distance.value)}</p>
              <p style={{fontSize: 14}}>{leg.transit_details.arrival_time.text}</p>
            </div>

            <div className='origin-and-destination-from'>
              <div>
                <p className='origin-and-destination-subtitle'>FROM: </p>
              </div>
              <div>
                <p className='origin-and-destination-name'>{leg.transit_details.departure_stop.name}</p>
              </div>
            </div>

            <div className='dot-dot-dot'>
              <div className='dot'></div>
              <div className='dot'></div>
            </div>

            <div className='origin-and-destination-from'>
              <div>
                <p className='origin-and-destination-subtitle'>TO: </p>
              </div>
              <div>
                <p className='origin-and-destination-name'>{leg.transit_details.arrival_stop.name}</p>
              </div>
            </div>

            <div className='dot-dot-dot'>
              <div className='dot'></div>
              <div className='dot'></div>
            </div>

            <div className='route-detail-route'>
              <div>
                <p className='route-detail-route-subtitle'>ROUTE:</p>
              </div>
              <div>
                <p className='route-detail-route-name'>{leg.transit_details.line.name}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='origin-and-destination'>

            <div className='distance-time-detail'>
              <p style={{fontSize: 12, textAlign: "center"}}>{formatDistance(leg.distance.value)}</p>
            </div>

            <div className='origin-and-destination-from'>
              <div>
                <p className='origin-and-destination-subtitle'>INSTRUCTION: </p>
              </div>
              <div>
                <p className='origin-and-destination-name'>{leg.html_instructions}</p>
              </div>
            </div>
            {showMoreDetails ? (
              <div>
                <ul>
                  {leg.steps.map((step, index) => (
                    <div className='walk-more-details'>
                      <p>{index+1}. {parse(step.html_instructions)}</p>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
            <></>
            )}
          </div>
        )}

      </div>
  </div>
  )
}

export default RouteDetail