import ModalHeader from "../../components/ModalHeader";
import "../../assets/styles/modals.css";

const ReportModal = () => {
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

        <div className="report-modal-mark">
          <button className="report-modal-mark-button">
            Mark the Location
          </button>
          <input
            className="report-modal-mark-location"
            type="text"
            placeholder="Location"
            disabled
          />
        </div>

        <div className="report-modal-title">
          <p>Title:</p>
          <input
            className="report-modal-title-input"
            type="text"
            placeholder="Report TItle"
            maxLength={50}
          />
        </div>
        <div className="report-modal-category">
          <div className="report-modal-category-div">Category</div>
        </div>
        <div className="report-modal-body">
          <p>Body</p>
          <input
            className="report-modal-body-input"
            type="text"
            placeholder="Describe the situation"
          />
        </div>
        <div className="report-modal-button">
          <button className="report-modal-submit">SUBMIT</button>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
