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
      type: "Train",
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
      type: "Train",
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
      type: "Train",
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
    },
    {
      origin: "SM North EDSA -",
      destination: "PROJ 6",
      type: "Jeep",
      stops: [
        "SM North EDSA via North Avenue",
        "Mindanao Avenue",
        "Ernesto Rondon High School",
        "Project 6 - Road 3",
        "Visayas Avenue",
        "Project 6 - Road 1"
      ]
    },
    {
      origin: "SM North EDSA  -",
      destination: "Monumento",
      type: "Jeep",
      stops: [
        "SM North EDSA",
        "Munoz",
        "Royal",
        "Oliveros",
        "Balintawak",
        "Bagong Barrio",
        "Monumento",
      ]
    },
    {
      origin: "SM North EDSA -",
      destination: "Fairview",
      type: "Bus",
      stops: [
        "SM North EDSA",
        "Munoz",
        "Mindanao Avenue",
        "Quirino Avenue",
        "Novaliches Bayan",
        "Fairview",
      ]
    },
    {
      origin: "Monumento -",
      destination: "PITX",
      type: "Bus",
      stops: [
        "Monumento",
        "Bagong Barrio",
        "Balintawak",
        "Kaingin Road",
        "Roosevelt Station",
        "North Avenue",
        "Quezon Avenue",
        "Nepa Q-Mart",
        "Main Avenue (Cubao)",
        "Santolan",
        "Ortigas",
        "Guadalupe",
        "Buendia",
        "Ayala Avenue",
        "Taft Avenue",
        "Roxas Blvd.",
        "Macapagal - DFA",
        "Macapagal - City Of Dreams",
        "PITX",
      ]
    }
  ]

  return (
    <>
      <div style={{fontWeight:'bold'}}>
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