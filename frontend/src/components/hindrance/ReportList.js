import "../../assets/styles/modals.css";
import Reports from "./Reports"

const ReportList = ({reports}) =>  {
  
  return (
    <div className="hindrance-modal-reports">
      <ul>
        {reports.map((report, index) => (
          <Reports key={index} report={report} />
        ))}
      </ul>
    </div>
  );
}

export default ReportList