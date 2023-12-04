import { useState } from 'react'
import Select from 'react-select'
import ModalHeader from '../../components/ModalHeader'
import routeIcon from '../../assets/img/route-modal-map-icon.png'
import routePlaceholder from '../../assets/img/placeholder.png'
import routeService from '../../services/routeService'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/modals.css'



const RouteModal = () => {

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [transportation, setTransportation] = useState([])
  const [routeList, setRouteList] = useState([])

  // Functions
  const getRoutes = () => {
    const data = {
      origin,
      destination,
      transportation
    }
    console.log(data)

    routeService
      .create(data)
      .then(() => {
        setOrigin('')
        setDestination('')
        setTransportation('')
      })
      .catch((error) => {
        console.log(error)
      })

    routeService
      .getAll()
      .then((result) => {
        console.log(result.data)
        setRouteList(result.data)
      })
  }

  const handleSelectChange = (selectedValues) => {
    setTransportation(selectedValues)
  }

  return (
    <>
      <ModalHeader 
        title='Planner'
      />

      <div className='route-modal-top'>
        <div className='route-modal-top-title'>
          <h4>Find your Public Transportation Route</h4>
        </div>

        <div className='route-modal-search'>
          <div className='route-modal-top-left'>
            <img className='route-modal-icon' src={ routeIcon } alt="route-icon" />

            <div className='route-modal-search-box'>
                <input 
                  id='origin'
                  className='route-modal-combo-box' 
                  type="text" 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder='Origin'
                />
                <input 
                  id='destination'
                  className='route-modal-combo-box' 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder='Destination'
                />
            </div>
          </div>
          <div className='route-modal-top-right'>
            <FontAwesomeIcon icon="rotate" className="route-modal-reset-icon"/>
          </div>
        </div>

        <div className='route-modal-top-options'>
          <FontAwesomeIcon icon="car" className="route-modal-reset-icon"/>
          <Select
              options={transportationOptions}
              isMulti
              placeholder="Select a transportation option"
              onChange={handleSelectChange}
              value={transportation}
              styles={customStyles}
          />
        </div>

        <div className='route-modal-button'>
          <button className='route-modal-btn' onClick={getRoutes}>Find Route</button>
        </div>
      </div>

      <div className='route-modal-bottom'>
        {routeList.length === 0 ? (
          <div className='route-modal-bottom-nonexist'>
            <img className='route-modal-bottom-placeholder' src={ routePlaceholder } alt='route'></img>
            <p>Please enter both origin and destination.</p>
          </div>
        ) : 
          <div className='route-modal-list'>
            <p>Suggested Routes</p>
            {routeList.map((route) => (
              <li key={route.id}>
                <div className='route-modal-list-box'>
                  <div>
                    <h4>{ route.origin }</h4>
                  </div>
                  <div>
                    <div>
                      <p>{ route.destination }</p>
                    </div>
                    <div>
                      <p>{ route.firstRoute }</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        }
      </div>
    </>
  )
}

export default RouteModal

const transportationOptions = [
  { value: '0', label: 'Jeepney'},
  { value: '1', label: 'Carousel'},
  { value: '2', label: 'Train'},
  { value: '3', label: 'UV Express'},
  { value: '4', label: 'Walking'}
]

const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => Icons[icon])
  library.add(...iconList)

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: '15px',
    border: '2px inset #EBE9ED',
    width: '290px',
    height: '100px',
  }),
};