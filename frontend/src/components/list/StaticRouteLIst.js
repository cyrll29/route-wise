import '../../assets/styles/routelist.css'
import StaticRoute from './StaticRoute'

const StaticRouteList = (props) => {

  const {testHandleClick} = props

  const handleClick = (index) => {
    testHandleClick(index)
    console.log(index)
  }

  const RouteList = [
    {
      origin: "MRT Line 3",
      destination: "North Avenue - Taft Avenue",
      stops: [
        "North Avenue",
        "Quezon Avenue",
        "GMA-Kamuning",
        "Araneta-Cubao",
        "Santolan-Annapolis",
        "Ortigas",
        "Shaw Boulevard",
        "Boni",
        "Guadalupe",
        "Buendia",
        "Ayala",
        "Magallanes",
        "Taft Avenue"
      ]
    },
    {
      origin: "LRT Line 1",
      destination: "Fernando Poe Jr. - Baclaran",
      stops: [
        "Fernando Poe Jr.",
        "Balintawak",
        "YAMAHA Monumento",
        "5th Avenue",
        "R. Papa",
        "Abad Santos",
        "Blumentritt",
        "Tayuman",
        "Bambang",
        "Doroteo Jose"
      ]
    }, 
    {
      origin: "MRT Line 7",
      destination: "North Avenue - San Jose Del Monte",
      stops: [
        "North Avenue",
        "Quezon Memorial Circle",
        "University Avenue",
        "Tandang Sora",
        "Don Antonio",
        "Batasan",
        "Manggahan",
        "Dona Carmen",
        "Regalado",
        "Mindanao Avenue",
        "Quirino",
        "Sacred Heart",
        "Tala",
        "San Jose Del Monte",
      ]
    }
  ]

  return (
    <>
      <div>
        <p>ROUTES</p>
        <ul className='static-routes-div'>
          {RouteList.map((points, index) => (
            <div key={index} onClick={() => handleClick(index)}>
              <StaticRoute 
              points={points}/>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default StaticRouteList