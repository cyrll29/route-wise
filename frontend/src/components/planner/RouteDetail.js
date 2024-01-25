import '../../assets/styles/routelist.css'

const RouteDetail = ({ leg }) => {
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
      <div className="route-detail-leg">
        <p>{formatTime(leg.startTime)}</p>
        <p>{formatTime(leg.endTime)}</p>
        <p>{leg.mode}</p>
        <p>{leg.distance}</p>
        <p>{formatDuration(leg.duration)}</p>
        <p>{leg.from.name}</p>
        <p>{leg.to.name}</p>
        {leg.mode !== "WALK" ? (
          <p>{leg.route.longName}</p>
        ) : (
          <></>
        )}
      </div>
  </>
  )
}

export default RouteDetail