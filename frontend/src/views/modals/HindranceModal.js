import { useState, useEffect } from 'react'
import ModalHeader from "../../components/ModalHeader";
import ReportList from "../../components/hindrance/ReportList"
import reportService from '../../services/reportService'

import "../../assets/styles/modals.css";

const HindranceModal = () => {
  const [reports, setReports] = useState([])

  const timeComparison = (dateCreated) => {
    const now = new Date()
    const createdAt = new Date(dateCreated)

    const diffInMilliseconds = now - createdAt
    const diffInMinutes = Math.round(diffInMilliseconds / (60 * 1000))

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes === 1) {
      return 'Posted 1 minute ago';
    } else if (diffInMinutes <= 60){
      return `Posted ${diffInMinutes} minutes ago`;
    } else {
      return `Posted ${Math.round(diffInMinutes/60)} hours ago`
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      reportService
      .getAll()
      .then((response) => {
        const updatedReports = response.data.map((report) => ({
          ...report,
          postedAgo: timeComparison(report.createdAt),
        }));

        console.log(updatedReports)
        setReports(updatedReports)
      })
      .catch ((error) => {
        console.log(error)
      })
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   reportService
  //   .getAll()
  //   .then((response) => {
  //     const updatedReports = response.data.map((report) => ({
  //       ...report,
  //       postedAgo: timeComparison(report.createdAt),
  //     }));

  //     console.log(updatedReports)
  //     setReports(updatedReports)
  //   })
  //   .catch ((error) => {
  //     console.log(error)
  //   })
  // }, []);

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
