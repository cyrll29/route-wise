import { useState } from 'react'
import ModalHeader from "../../components/ModalHeader";
import "../../assets/styles/modals.css";
import Select from "react-select";
import axios from "axios";
import { useSnackbar } from 'notistack'

const reportCategory = [
  { value: 1, label: "Traffic" },
  { value: 2, label: "Accident" },
  { value: 3, label: "Road Blockage" },
  { value: 4, label: "Flood" },
];

const ReportModal = () => {
  const [location, setLocation] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      location,
      title,
      category,
      body
    }
    console.log(data)
    setLoading(true)
    axios
      .post('http://localhost:3001/reports', data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Report Created successfully', { variant: 'success' })
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error)
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
              Mark the Location
            </button>
            <input
              id="report-location"
              className="report-modal-mark-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              // disabled
            />
          </div>

          <div className="report-modal-title-div">
            <div className="report-modal-title">
              <p>Title:</p>
            </div>
            <div className="report-modal-title-input-div">
              <input
                id="report-title"
                className="report-modal-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Report TItle"
                maxLength={50}
              />
            </div>
          </div>
          <div className="report-modal-category-div">
            <button className="report-modal-category" disabled>
              Category
            </button>
            <Select
              id="report-category"
              className="report-modal-select"
              options={reportCategory}
              isSearchable={true}
              value={category.label}
              onChange={(cat) => setCategory(cat.label)}
              placeholder="Select a category"
            />
          </div>
          <div className="report-modal-body-div">
            <div className="report-modal-body">
              <p>Body:</p>
            </div>
            <div className="report-modal-body-input-div">
              <textarea
                id="report-description"
                className="report-modal-body-input"
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe the situation"
              ></textarea>
            </div>
          </div>
          <div className="report-modal-button">
            <button className="report-modal-submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportModal;
