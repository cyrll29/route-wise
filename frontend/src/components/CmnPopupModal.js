const CmnPopupModal = ({ message, errorType, onClose }) => {
  return (
    <div className="common-popup-modal">
      <div className="common-popup-modal-container">
        <div>
          <p> {errorType} </p>
          <p> {message} </p>
        </div>
        <div>
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  )
}

export default CmnPopupModal