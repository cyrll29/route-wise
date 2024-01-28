import Route from './Route'



const RouteList = ({ routes, onItinerarySelect, selectCenterLat, selectCenterLng }) => {

  // ---------Duration Bar------------
  let routesDuration = []

  for (let i = 0; i < routes.itineraries.length; i++) {
    routesDuration.push(routes.itineraries[i].duration)
  }
  // --------------END----------------

  return (
    <div style={{padding: 10}}>
      {routes ? (
        <ul>
          {routes.itineraries.map((itinerary, index) => (
            <div key={index}>
              <Route 
                itinerary={itinerary} 
                routesDuration={routesDuration} 
                index={index}
                onItinerarySelect={onItinerarySelect}
                selectCenterLat={selectCenterLat}
                selectCenterLng={selectCenterLng}
              />
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
