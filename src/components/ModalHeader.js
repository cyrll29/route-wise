import '../assets/styles/modals.css'
import logoBG from '../assets/img/logo-test.png'

const ModalHeader = ({ title, isRoute = false }) => {
  return (
    <>
      <div className="header-modal">
        <div className='header-modal-col1'>
          <div className='header-modal-col1-title'>
            <img className='header-logo' src={logoBG} alt="logo" />
          </div>
          <div>
            <h2><span>Route</span>Wise</h2>
          </div>
        </div>
        <div className='header-modal-col2'>
          <div>
            {isRoute ? (<h4>Route<span>Planner</span></h4>)
            : <h4><span>{ title }</span></h4>
            }
          </div>
          <div>
            <p>Optimized Routes, Save Time</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalHeader
