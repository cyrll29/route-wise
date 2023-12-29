import { useState } from 'react'
import "../../assets/styles/modals.css";
import ReportDetail from '../ReportDetail'

const Reports = ({ report }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <ul>
      <div className="hindrance-modal-reportlist">
        <li>Location: {report.location}</li>
        <li>Title: {report.title}</li>
        <li>Category: {report.category.label}</li>
        <li>Body: {report.body}</li>
        <li>Posted Ago: {report.postedAgo}</li>
        <button onClick={() => setShowModal(true)}>open</button>
      </div>
      <br />
      <div>
        {showModal 
          ? <ReportDetail report={report} onClose={() => setShowModal(false)}/>
          : <></>
        }
      </div>
    </ul>
  );
}

export default Reports