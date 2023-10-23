import { useState } from 'react'
import ModalHeader from '../../components/ModalHeader'
import routeIcon from '../../assets/img/route-modal-map-icon.png'
import routePlaceholder from '../../assets/img/placeholder.png'
import SearchComboBox from '../../components/SearchComboBox'
import Select from 'react-select'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/modals.css'

const RouteModal = () => {

  const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => Icons[icon]);
  library.add(...iconList);
    

  const transportationOptions = [
    { value: '0', label: 'All'},
    { value: '1', label: 'Jeepney'},
    { value: '2', label: 'Carousel'},
    { value: '3', label: 'Train'},
    { value: '4', label: 'UV Express'},
    { value: '5', label: 'Walking'}
  ]


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [routeList, setRouteList] = useState([]);


  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  
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
              {/* <input 
                className='route-modal-combo-box' 
                type="text" 
                placeholder='Origin'
              /> */}
              {/* <input 
                className='route-modal-combo-box' 
                type="text" 
                placeholder='Destination'
              /> */}
              <div className='route-modal-combo-box'>
                <SearchComboBox />
              </div>
              <div className='route-modal-combo-box'>
                <SearchComboBox />
              </div>

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
              isSearchable={true}
              isMulti
              placeholder="Select a transportation option"
              onChange={handleSelectChange}
              value={selectedOptions}
              styles={customStyles}
          />
        </div>


        <div className='route-modal-button'>
          <button className='route-modal-btn'>Find Route</button>
        </div>
      </div>

      <div className='route-modal-bottom'>
        {routeList.length === 0 ? (
          <div className='route-modal-bottom-nonexist'>
            <img className='route-modal-bottom-placeholder' src={ routePlaceholder } alt='route'></img>
            <p>Please enter both origin and destination.</p>
          </div>
        ) : 
          <div>
            <p>Waiting for data</p> 
          </div>
        }
      </div>
    </>
  )
}

export default RouteModal

const customStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: '15px',
    border: '2px inset #EBE9ED',
    width: '290px',
    height: '10%',
  }),
};