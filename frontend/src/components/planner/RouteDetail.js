import '../../assets/styles/routelist.css'



const RouteDetail = ({ leg, selectRouteDetailCenter }) => {

  const modeContainer = () => {
    let color = 'black'
    if(leg.mode === 'WALK') {
      color = '#FF7F7F'
    } else if (leg.mode === 'BUS') {
      color = '#45B6FE'
    } else if (leg.mode === 'RAIL') {
      color = '#FFA756'
    }
    return color;
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


  const handleDetailClick = () => {
    selectRouteDetailCenter({lat: leg.from.lat, lng: leg.from.lon})
  }

  
  return (
    <div onClick={handleDetailClick}>
      <div className="route-detail-leg">
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
          {leg.mode}
        </p>
        <div className="distance-bar-div">
          <div className="distance-bar">
            <div className="distance-marker">
            
            </div>
            <div className="distance-marker">

            </div>
          </div>
        </div>
        <div className='distance-time'>
          <p>{formatTime(leg.startTime)}</p>
          <p style={{fontSize: 12}}>{leg.distance} M</p>
          <p>{formatTime(leg.endTime)}</p>
        </div>
        <div className='time-and-fare'>
          <p>{formatDuration(leg.duration)}</p>
          <p>P XX.XX</p>
        </div>
        <div className='origin-and-destination'>
          <p>{leg.from.name}</p>
          <div className='dot-dot-dot'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          <p>{leg.to.name}</p>
        </div>
        
        {leg.mode !== "WALK" ? (
          <p style={{fontWeight: 'bold'}}>{leg.route.longName}</p>
        ) : (
          <></>
        )}
      </div>
  </div>
  )
}

export default RouteDetail