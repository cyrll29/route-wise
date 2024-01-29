import { useState } from "react"
import "../../assets/styles/routelist.css"
import StaticRouteDetail from "./StaticRouteDetail"

const  StaticRoute = ({ points }) => {
  const [showDetails, setShowDetails] = useState(null)

  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  return(
    <>
      <div className="static-routes-modal" onClick={handleClick}>
        {points.origin}
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