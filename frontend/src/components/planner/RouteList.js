const RouteList = ({ routes }) => {
  console.log(routes)

  let routesDuration = []

  for (let i = 0; i < routes.itineraries.length; i++) {
    routesDuration.push(routes.itineraries[i].duration)
  }

  const colors = ['#FF9AA2', '#FFDAC1', '#C7CEEA', '#E2F0CB', '#FFB7B2']
  
  const longestDuration = Math.max(...routesDuration)
  console.log(longestDuration)
  return (
    <div style={{padding: 10}}>
      {routes ? (
        <ul>
          {routes.itineraries.map((itinerary, index) => (
            <div style={styles.mainGrid} key={index}>
              {itinerary.duration}
              <div style={styles.grayBar}>
                <div style={{width: (itinerary.duration/longestDuration * 100)*3, height: '100%', backgroundColor: colors[index], borderRadius: 10}}>

                </div>
              </div>
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
