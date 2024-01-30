import "../../assets/styles/modals.css";
import Reports from "./Reports"



const ReportList = ({reports, searchQuery}) =>  {
  
  const filteredReports = reports.filter(report =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="hindrance-modal-reports">
      <ul>
        {filteredReports.map((report, index) => (
          <Reports key={index} report={report} />
        ))}
      </ul>
    </div>
  );
}

export default ReportList