import { useState, useEffect } from 'react'
import ModalHeader from "../../components/ModalHeader";
import ReportList from "../../components/hindrance/ReportList"
import reportService from '../../services/reportService'

import "../../assets/styles/modals.css";

const HindranceModal = () => {
  const [reports, setReports] = useState([])

  useEffect(() => {
    reportService
      .getAll()
      .then((reports) => {
        console.log(reports.data)
        setReports(reports.data)
      })
      .catch ((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <ModalHeader title="Hindrance" />
      <div className="hindrance-modal-search">
        <div>
          <input className="hindrance-modal-searchbar" />
        </div>
      </div>
      <div className="hindrance-modal-buttons">
        <button className="hindrance-modal-newpost">NEW POSTS</button>
      </div>
      <div>
        <ReportList reports={reports}/>
      </div>
    </>
  );
};

export default HindranceModal;
