import ModalHeader from "../../components/ModalHeader";
import "../../assets/styles/modals.css";
import Select from "react-select";

const reportCategory = [
  { value: 1, label: "Traffic" },
  { value: 2, label: "Accident" },
  { value: 3, label: "Road Blockage" },
  { value: 4, label: "Flood" },
];

const ReportModal = () => {
  function handleSubmit(e) {
    e.preventDefault();
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
              placeholder="Location"
              disabled
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
