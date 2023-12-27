const CmnPopupModal = ({ message, onClose }) => {
  return (
    <div className="common-popup-modal">
      <div className="common-popup-modal-container">
        <div>
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