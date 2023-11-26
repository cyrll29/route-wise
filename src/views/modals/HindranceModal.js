import ModalHeader from "../../components/ModalHeader";
import "../../assets/styles/modals.css";

const report = [
  {
    location: "North Avenue, Quezon City",
    title: "Car Accident at SM North",
    category: "Accident",
    body: "Traffic due to car accident at SM North, two cars involved.",
  },
  {
    location: "Commonwealth Ave., Novaliches, Quezon City",
    title: "Inaccessible road near FCM",
    category: "Flood",
    body: "Bad news for people, the road is flooded. Take care!",
  },
];

function ReportList() {
  return (
    <div className="hindrance-modal-reports">
      <ul>
        {report.map((report) => (
          <Reports report={report} />
        ))}
      </ul>
    </div>
  );
}
function Reports({ report }) {
  return (
    <ul>
      <div className="hindrance-modal-reportlist">
        <li>Location: {report.location}</li>
        <li>Title: {report.title}</li>
        <li>Category: {report.category}</li>
        <li>Body: {report.body}</li>
      </div>
      <br />
    </ul>
  );
}

const HindranceModal = () => {
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
        <ReportList />
      </div>
    </>
  );
};

export default HindranceModal;
