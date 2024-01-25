import { useState } from 'react'
import RouteDetail from './RouteDetail'

const Route = ({ itinerary, routesDuration, index }) => {

  console.log(itinerary)

  const [showDetails, setShowDetails] = useState(null)
  const colors = ['#FF9AA2', '#FFDAC1', '#C7CEEA', '#E2F0CB', '#FFB7B2']
  const longestDuration = Math.max(...routesDuration)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
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

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Formatting with leading zeros for minutes
    const formattedMinutes = ('0' + minutes).substr(-2);

    return `${formattedHours}:${formattedMinutes} ${amPM}`;
  }
  
  return (
    <>
      {!itinerary ? (
        <></>
      ) : (
        <div>
          <div style={styles.mainGrid} onClick={handleShowDetails}>
            <p>{formatDuration(itinerary.duration)}</p>
            <p>{formatTime(itinerary.startTime)}</p>
            <p>{formatTime(itinerary.endTime)}</p>
            <div style={styles.grayBar}>
              <div style={{width: (itinerary.duration/longestDuration * 100)*3, height: '100%', backgroundColor: colors[index], borderRadius: 10}}>
              </div>
            </div>
          </div>
          {showDetails ? (
            <div>
              <ul>
                {itinerary.legs.map((leg, index) => (
                  <RouteDetail key={index} leg={leg}/>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  )
}

export default Route

const styles = {
  mainGrid: {
    display: 'flex',
    backgroundColor: 'lightblue',
    marginTop: 5,
    marginBottom: 5,

    height: 70,
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  grayBar: {
    backgroundColor: "gray",

    height: '20%',
    width: '90%',

    borderRadius: 10
  },

  durationBar: {
    height: '100%',
    width: ''
  }
}