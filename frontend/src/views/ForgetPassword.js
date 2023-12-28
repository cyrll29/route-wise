import { useState } from "react";
import axios from "axios";
import "../assets/styles/forgetpassword.css"

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:3001/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
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
		<div className="forget-password-container">
			<form className="forget-password-form-container" onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="forget-password-input"
				/>
				{error && <div className="forget-password-error-msg">{error}</div>}
				{msg && <div className="forget-password-success-msg">{msg}</div>}
				<button type="submit" className="forget-password-green-btn">
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;