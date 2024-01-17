import { useState } from "react";
import imagePlaceholder from "../assets/img/img-placeholder.png";
import personIcon from "../assets/img/person-icon.png";
import "../assets/styles/reportdetail.css";

const ReportDetail = ({ report, onClose }) => {
  const [img, setImg] = useState(null);

  if (report.image) {
    setImg(report.image);
  }

  return (
    <div className="report-detail-modal">
      <div className="report-detail-content">
        <div className="report-detail-content-top">
          <div className="report-detail-content-top-user">
            <img
              src={personIcon}
              alt="person-icon"
              className="report-detail-person-icon"
            />
            <div>
              <p className="report-detail-person-name">{report.user.name}</p>
            </div>
          </div>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="report-detail-content-middle">
          <h4>{report.title}</h4>
        </div>

        <div className="report-detail-content-bottom">
          <div className="report-detail-content-bottom-left">
            <div className="report-detail-content-bottom-left-detail">
              <p className="report-detail-content-category-location">
                {report.category.label} at {report.location}
              </p>
              <p className="report-detail-content-timeframe">
                {report.postedAgo}
              </p>
              <p className="report-detail-content-body">{report.body}</p>
            </div>
          </div>

          {!img ? (
            <div className="report-detail-content-bottom-right">
              <img
                src={imagePlaceholder}
                alt="road"
                className="report-detail-image-placeholder"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
