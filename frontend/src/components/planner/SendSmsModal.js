import { useState } from 'react'
import axios from "axios"
import '../../assets/styles/modals.css'
import config from '../../utils/config.js'

const SendSmsModal = (props) => {
  const {
    onClose,
    itinerary,
    origin,
    destination
  } = props

  const [phoneNumber, setPhoneNumber] = useState("")
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")

  const details = {
    duration: itinerary.duration,
    origin: origin,
    destination: destination,
    legs: itinerary.legs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = `${config.URL_USED}/api/routes/sendsms`
      const { data } = await axios.post(url, { phoneNumber, details })
      setMsg(data.message)
      setError("")
      setPhoneNumber("")
    } catch (error) {
      setError(error.response.data.message)
      setMsg("")
    }
  }

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
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                setMsg("")
                setError("")
              }}
              value={phoneNumber}
            />
          </div>
          {error && <div className="route-send-error-msg">{error}</div>}
				  {msg && <div className="route-send-success-msg">{msg}</div>}
        </div>
        
        <div className="route-send-btm">
          <button onClick={handleSubmit} className="route-send-submit">Send Route</button>
        </div>

      </div>
    </div>
  )
}

export default SendSmsModal