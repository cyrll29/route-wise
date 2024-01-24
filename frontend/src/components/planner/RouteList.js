const RouteList = ({ routes }) => {
  console.log(routes)
  return (
    <div>
      {routes ? (
        <ul>
          {routes.itineraries.map((itinerary, index) => (
            <div key={index}>
              {itinerary.duration}
            </div>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  )
}

export default RouteList