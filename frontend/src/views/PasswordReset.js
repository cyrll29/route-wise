import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/passwordreset.css"

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:3001/api/password-reset/${param.id}/${param.token}`;
	console.log(url)
	useEffect(() => {
		const verifyUrl = async () => {
			console.log(url)
			try {
				console.log("run boi")
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/LoginPage";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<>
			{validUrl ? (
				<div className="password-reset-container">
					<form className="password-reset-form-container" onSubmit={handleSubmit}>
						<h1>Add New Password</h1>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="password-reset-input"
						/>
						{error && <div className="password-reset-error-msg">{error}</div>}
						{msg && <div className="password-reset-success-msg">{msg}</div>}
						<button type="submit" className="password-reset-green-btn">
							Submit
						</button>
					</form>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default PasswordReset;