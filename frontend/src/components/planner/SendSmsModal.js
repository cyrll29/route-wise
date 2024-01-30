import '../../assets/styles/modals.css'

const sendSmsModal = ({onClose}) => {
  return (
    <div className='route-send'>
      <div className='route-send-content'>
        <div className='route-send-top'>
          <div>
            <p></p>
          </div>
          <div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>

        <div className='route-send-body'>
          <div className='route-send-body-title'>
            <h2>Send Route via SMS</h2>
          </div>
          <div>
            <input
              className="route-send-input"
              placeholder="Enter your number..."
            />
          </div>
        </div>
        
        <div className="route-send-btm">
          <button className="route-send-submit">Send Route</button>
        </div>

      </div>
    </div>
  )
}

export default sendSmsModal