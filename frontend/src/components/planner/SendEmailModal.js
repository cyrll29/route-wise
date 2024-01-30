import { useState } from 'react'
import axios from "axios"
import '../../assets/styles/modals.css'
import config from '../../utils/config.js'

const SendEmailModal = (props) => {

  const {
    onClose,
    itinerary,
    origin,
    destination
  } = props

  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")

  // --------Duration Formatter----------
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    seconds %= 3600
    const minutes = Math.floor(seconds / 60)
  
    let formattedDuration = ''
  
    if (hours > 0) {
        formattedDuration += `${hours} hr`
        if (hours > 1) formattedDuration += 's'
    }
  
    if (minutes > 0) {
        if (formattedDuration !== '') formattedDuration += ' '
        formattedDuration += `${minutes} min`
        if (minutes > 1) formattedDuration += 's'
    }
    return formattedDuration;
  }

  const details = {
    duration: formatDuration(itinerary.duration),
    origin: origin,
    destination: destination,
    legs: itinerary.legs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = `${config.URL_USED}/api/routes/sendemail`
      const { data } = await axios.post(url, { email, details })
      setMsg(data.message)
      setError("")
      setEmail("")
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
            <h2>Send Route via Email</h2>
          </div>
          <div>
            <input
              type='email'
              placeholder="Enter your email..."
              onChange={(e) => {
                setEmail(e.target.value)
                setMsg("")
                setError("")
              }}
              value={email}
              className="route-send-input"
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

export default SendEmailModal