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
    let anotherTemporaryColor  = 'white'
    if(points.type === "Train") {
      temporaryColor  = '#f8c107'
    } else if(points.type  ===  'Jeep') {
      temporaryColor = '#880015'
    } else if(points.type === "Bus") {
      temporaryColor= '#F8ECC4'
    }
    return temporaryColor
  }

  const textColor  = () => {
    let temporaryColor = 'white'

    if(points.type === "Jeep") {
      return temporaryColor
    } else {
      return temporaryColor = 'black'
    }
  }

  return(
    <>
      <div className="static-routes-modal" onClick={handleClick} style={{backgroundColor: color(), color:  textColor()}}>
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