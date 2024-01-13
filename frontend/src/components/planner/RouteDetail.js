import { useState } from 'react'

const RouteDetail = ({instruction}) => {

  const [showMoreDetails, setShowMoreDetails] = useState(null)

  const removeBoldTags = (htmlString) => {
    return htmlString.replace(/<\/?b>/g, '');
  };

  return (
    <div className='routelist-details-section'>
      <div onClick={() => {
        setShowMoreDetails(!showMoreDetails)
        console.log(instruction.steps)
      }}
    >
        <p>{instruction.html_instructions}</p>
        <p>{instruction.distance.text}</p>
        <p>{instruction.duration.text}</p>
      </div>
      
      {showMoreDetails && instruction.steps ? (
        <ul>
          {instruction.steps.map((step, stepIndex) => (
            <li key={stepIndex}>
              <p dangerouslySetInnerHTML={{ __html: removeBoldTags(step.html_instructions) }}></p>
              <p>{step.distance.text}</p>
              <p>{step.duration.text}</p>
            </li>
          ))}
        </ul>
        ) : (
        <></>
      )}
    </div>
  )
}

export default RouteDetail