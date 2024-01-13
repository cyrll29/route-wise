import Route from './Route.js'
import '../../assets/styles/routelist.css'

const RouteList = ({routes}) => {
  console.log(routes)
  return (
    <div>
      <ul>
        {routes.map((route, index) => (
          <div key={index}>
            <Route route={route.legs[0]}/>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default RouteList
