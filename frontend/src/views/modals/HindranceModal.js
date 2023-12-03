import { useState, useEffect } from 'react'
import ModalHeader from "../../components/ModalHeader";
import ReportList from "../../components/hindrance/ReportList"
import "../../assets/styles/modals.css";
import axios from 'axios'

const HindranceModal = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3001/reports")
      .then((response) => {
        console.log(response.data.data)
        setReports(response.data.data)
        setLoading(false)
      })
      .catch ((error) => {
        console.log(error)
        setLoading(false)
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
