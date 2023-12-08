

const ReportDetail = ({report, onClose}) => {

  return (
    <div className="report-detail-modal">
      <div className="report-detail-content">
        <button onClick={onClose}>close</button>
        <h1>HELLO</h1>
        <p>{report.title}</p>
        <p>{report.location}</p>
        <p>{report.category}</p>
        <p>{report.body}</p>
        <p>{report.postedAgo}</p>
      </div>
    </div>
  )

}

export default ReportDetail