import { useState } from 'react'
import "../../assets/styles/modals.css";
import notif from '../../assets/img/notif.png'
import maximize from '../../assets/img/maximize.png'
import ReportDetail from '../ReportDetail'

const Reports = ({ report }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="hindrance-modal-reportlist">
        <div className='hindrance-modal-reportlist-top'>
          <div className='hindrance-modal-reportlist-top-left'>
            <img src={notif} alt="notif-icon" className='hindrance-notif-icon' />
            <p>{report.user.name}</p>
          </div>
          <div className='hindrance-modal-reportlist-top-right'>
            <img onClick={() => {setShowModal(true)}} src={maximize} alt="maximize-icon" className='hindrance-maximize-icon' />
          </div>
        </div>
        <div className='hindrance-modal-reportlist-bottom'>
          <h4 className='hindrance-modal-reportlist-bottom-title'>{report.title}</h4>
          <p className='hindrance-modal-reportlist-bottom-category-location'>{report.category.label} at {report.location}</p>
          <p className='hindrance-modal-reportlist-bottom-timeframe'>{report.postedAgo}</p>
        </div>
      </div>
      <div>
        {showModal 
          ? <ReportDetail report={report} onClose={() => setShowModal(false)}/>
          : <></>
        }
      </div>
    </div>
  );
}

export default Reports