import { useState } from 'react'
import Select from "react-select";
import ModalHeader from "../../components/ModalHeader";
import reportService from '../../services/reportService'
import "../../assets/styles/modals.css";

const ReportModal = () => {
  
  const reportCategory = [
    { value: 1, label: "Traffic" },
    { value: 2, label: "Accident" },
    { value: 3, label: "Road Blockage" },
    { value: 4, label: "Flood" },
  ]

  const [location, setLocation] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(null)
  const [body, setBody] = useState('')
  const [msg, setMsg] = useState("");
  const [error, setError] = useState('')

  // Functions
  const clearInputFields = () => {
    setLocation('')
    setTitle('')
    setCategory(null)
    setBody('')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      location,
      title,
      category,
      body
    }

    reportService
      .create(data)
      .then((response) => {
        setMsg(response.message)
        setError('')
        clearInputFields()
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        }
      })
  }

  return (
    <>
      <ModalHeader title="Report" />
      <div className="report-modal-main">
        <div className="report-modal-instruction">
          <p>
            Submit traffic and road reports for other users. Mark the location,
            set proper titles, and describe the situation in the body.
          </p>
        </div>
        <form className="report-modal-form" onSubmit={handleSubmit}>
          <div className="report-modal-mark">
            <button className="report-modal-mark-button">
              Mark Location
            </button>
            <input
              id="report-location"
              className="report-modal-mark-location"
              type="text"
              value={location}
              onChange={e => {
                setLocation(e.target.value)
                setMsg('')
                setError('')
              }} 
              placeholder="Location"
              // disabled
            />
          </div>

          <div className="report-modal-title-div">
            <div className="report-modal-title">
              <p><span className='red-asterisk'>*</span>Title:</p>
            </div>
            <div className="report-modal-title-input-div">
              <input
                id="report-title"
                className="report-modal-title-input"
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value)
                  setMsg('')
                  setError('')
                }} 
                placeholder="Report TItle"
                maxLength={50}
              />
            </div>
          </div>
          <div className="report-modal-category-div">
            <div className="report-modal-category">
              <p><span className='red-asterisk'>*</span>Category:</p>
            </div>
            <Select
              id="report-category"
              className="report-modal-select"
              options={reportCategory}
              isSearchable={true}
              value={category}
              onChange={(selectedOption) => setCategory(selectedOption)}
              placeholder="Select a category"
              styles={customStyles}
            />
          </div>
          <div className="report-modal-body-div">
            <div className="report-modal-body">
              <p><span className='red-asterisk'>*</span>Body:</p>
            </div>
            <div className="report-modal-body-input-div">
              <textarea
                id="report-description"
                className="report-modal-body-input"
                type="text"
                value={body}
                onChange={e => {
                  setBody(e.target.value)
                  setMsg('')
                  setError('')
                }} 
                placeholder="Describe the situation"
              ></textarea>
            </div>
          </div>

          {error && <div className="error-msg">{error}</div>}
          {msg && <div className="success-msg">{msg}</div>}

          <div className="report-modal-button">
            <button className="report-modal-submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportModal;

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid black',
    height: '35px',
  }),
};
