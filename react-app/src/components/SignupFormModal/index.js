import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userImage, setUserImage] = useState("")
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, username, email, password, userImage));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="sign-up-modal">
			<h1 id='sign-up-header'>Sign Up</h1>
			<form onSubmit={handleSubmit} className="sign-up-form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
						className='sign-up-input'
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						required
					/>
				</label>
				<label>
					Last Name
					<input
						className='sign-up-input'
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						required
					/>
				</label>
				<label>
					Email
					<input
						className='sign-up-input'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>
				</label>
				<label>
					Username
					<input
						className='sign-up-input'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						required
					/>
				</label>
				<label>
					Profile Image
					<input
						className='sign-up-input'
						type="text"
						value={userImage}
						onChange={(e) => setUserImage(e.target.value)}
						placeholder="Add Profile Image"
						required
					/>
				</label>
				<label>
					Password
					<input
						className='sign-up-input'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						className='sign-up-input'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						required
					/>
				</label>
				<button type="submit" id='sign-up-submit'>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
