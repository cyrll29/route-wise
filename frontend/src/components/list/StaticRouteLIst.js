import '../../assets/styles/routelist.css'
import StaticRoute from './StaticRoute'

const StaticRouteList = () => {
  const RouteList = [
    {
      origin: "SM NORTH",
      destination: "KALAW",
      stops: [
        "xxx",
        "xxx",
        "xxx",
        "xxx",
      ]
    },
    {
      origin: "SM NORTH",
      destination: "MONUMENTO",
      stops: [
        "xxx",
        "xxx",
        "xxx",
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
            <div key={index}>
              <StaticRoute points={points}/>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default StaticRouteList