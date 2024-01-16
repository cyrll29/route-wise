import { useState } from "react";

const RouteDetail = ({ instruction }) => {
  const [showMoreDetails, setShowMoreDetails] = useState(null);

  // const removeBoldTags = (htmlString) => {
  //   return htmlString.replace(/<\/?b>/g, "");
  // };

  return (
    <div className="routelist-details-section">
      <div
        onClick={() => {
          setShowMoreDetails(!showMoreDetails);
          console.log(instruction.steps);
        }}
      >
        <p>{instruction.html_instructions}</p>
        <p>Distance: {instruction.distance.text}</p>
        <p>Duration: {instruction.duration.text}</p>
      </div>

      {showMoreDetails && instruction.steps ? (
        <ul>
          {instruction.steps.map((step, stepIndex) => (
            <li key={stepIndex}>
              <p
                dangerouslySetInnerHTML={{
                  __html: step.html_instructions,
                }}
              ></p>
              <p>Distance: {step.distance.text}</p>
              <p>Duration: {step.duration.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RouteDetail;
