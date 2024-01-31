import { useState } from "react"
import "../../assets/styles/routelist.css"
import StaticRouteDetail from "./StaticRouteDetail"

const  StaticRoute = ({ points }) => {
  const [showDetails, setShowDetails] = useState(null)

  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  let color = () => {
    let temporaryColor  = 'white'
    if(points.type === "Train") {
      temporaryColor  = 'Lightgray'
    } else if(points.type  ===  'Jeep') {
      temporaryColor = 'lightblue'
    } else if(points.type === "Bus") {
      temporaryColor= 'lightpink'
    }

    return temporaryColor
  }

  return(
    <>
      <div className="static-routes-modal" onClick={handleClick} style={{backgroundColor: color()}}>
        <div>
          {points.origin}
        </div>
        <div>
          {points.destination}
        </div>
      </div>
      {showDetails ? (
        <div>
          <ul>
            {points.stops.map((leg, index) => (
              <StaticRouteDetail key={index} leg={leg}/>
            ))}
          </ul>
          <div className="static-routes-modal-extra-div">
            END
          </div>
        </div>
      ) : 
      (
        <div>
        </div>
      )}
    </>
  )
}

export default StaticRoute