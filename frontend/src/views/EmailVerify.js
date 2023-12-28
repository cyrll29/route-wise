import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../assets/img/success.png";
import "../assets/styles/emailverify.css";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
  console.log(param.id)
  console.log(param.token)

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:3001/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<>
			{validUrl ? (
				<div className="email-verify-container">
					<img src={success} alt="success_img" />
					<h1>Email verified successfully</h1>
					<Link to="/LoginPage">
						<button className="email-verify-green-btn">Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;