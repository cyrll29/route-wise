import { useState } from "react";
import RouteDetail from "./RouteDetail";
import "../../assets/styles/routelist.css";

import etalogo from "../../assets/img/etalogo.png";

const Route = ({ route }) => {
  const [showDetails, setShowDetails] = useState(null);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      {!route.departure_time ? (
        <></>
      ) : (
        <div className="routelist-section">
          <div onClick={handleShowDetails}>
            <img className="route-logo-eta" src={etalogo} alt="etalogo" />
            <p className="route-ETA">ETA</p>
            <p className="route-arrival">{route.arrival_time.text}</p>
            <p className="route-arrival-details">
              {route.distance.text} | {route.duration.text}
            </p>
          </div>

          {showDetails ? (
            <div>
              <ul>
                {route.steps.map((instruction, index) => (
                  <RouteDetail key={index} instruction={instruction} />
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Route;
