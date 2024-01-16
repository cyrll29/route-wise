import { useState } from 'react'
import RouteDetail from './RouteDetail'

const Route = ({route}) => {

  const [showDetails, setShowDetails] = useState(null)

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <>
      {!route.departure_time ?
        <></>
        : 
        <div className='routelist-section'>
          <div onClick={handleShowDetails}>
            <p>{route.departure_time.text}</p>
            <p>{route.arrival_time.text}</p>
            <p>{route.distance.text}</p>
          </div>
  
          {showDetails ? (
            <div>
              <ul>
                {route.steps.map((instruction, index) => (
                  <RouteDetail key={index} instruction={instruction}/>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      }
    </>
  )
}

export default Route