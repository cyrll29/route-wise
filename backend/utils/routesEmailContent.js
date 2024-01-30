const routesEmailContent = (email, origin, destination, duration, legs) => {

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

  const legDetails = legs.map((leg, index) => {
    return `
      <div>
        <p>Leg ${index + 1}: ${leg.mode}</p>
        <p>Start: ${leg.from.name}</p>
        <p>End: ${leg.to.name}</p>
        ${leg.mode !== "WALK" ? `
          <p>Route: ${leg.route.longName}</p>
        ` : ``
        }
        <p>Duration: ${formatDuration(leg.duration)}</p>
        <p>Distance: ${formatDistance(leg.distance)}</p>
      </div>
    `;
  }).join('');

  return `
    <html>
    <head>
      <style>
        /* Add your custom styles here */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
        }
        .anchor {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #880015;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
        }
        .anchor:hover {
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Public Transit Itinerary Details</h1>
        <p>Origin: ${origin}</p>
        <p>Destination: ${destination}</p>
        <p>Duration: ${formatDuration(duration)}</p>
        ${legDetails}
        <p>Thank you for using KyusiTrip,</p>
        <p>The KyusiTrip team</p>
      </div>
    </body>
    </html>
  `;
};

export default routesEmailContent;