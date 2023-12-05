import "../../assets/styles/modals.css";

const Reports = ({ report }) => {
  return (
    <ul>
      <div className="hindrance-modal-reportlist">
        <li>Location: {report.location}</li>
        <li>Title: {report.title}</li>
        <li>Category: {report.category}</li>
        <li>Body: {report.body}</li>
        <li>Posted Ago: {report.postedAgo}</li>
      </div>
      <br />
    </ul>
  );
}

export default Reports