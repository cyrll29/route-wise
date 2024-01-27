import '../../assets/styles/routelist.css'

const StaticRouteList = () => {
  const RouteList = [
    {
      origin: "SM NORTH",
      destination: "KALAW",
      stops: [
        {
          start: "xxx",
          end: "xxx"
        },
        {
          start: "xxx",
          end: "xxx"
        },
        {
          start: "xxx",
          end: "xxx"
        }
      ]
    },
    {
      origin: "SM NORTH",
      destination: "MONUMENTO",
      stops: [
        {
          start: "xxx",
          end: "xxx"
        },
        {
          start: "xxx",
          end: "xxx"
        },
        {
          start: "xxx",
          end: "xxx"
        }
      ]
    }, 
    {
      origin: "SM NORTH",
      destination: "NIA-NPC",
      stops: [
        "xxx",
        "xxx",
        "xxx",
        "xxx",
        "xxx",
      ]
    }
  ]


  return (
    <>
      <div>
        <p>ROUTES</p>
        <ul className='static-routes-div'>
          {RouteList.map((points, index) => (
            <div key={index} className='static-routes-modal'>
              <h3>{points.origin}</h3>
              &nbsp; - &nbsp; 
              <h3>{points.destination}</h3>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default StaticRouteList