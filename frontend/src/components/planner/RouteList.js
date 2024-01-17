import Route from './Route.js'
import '../../assets/styles/routelist.css'

const RouteList = ({routes}) => {
  const handleClick = (index) => {
    window.localStorage.setItem("polyline", routes[index].overview_polyline.points)
  }
  console.log(routes)
  return (
    <div>
      <ul>
        {routes.map((route, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            <Route route={route.legs[0]}/>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default RouteList
