import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = 'https://kangtong1105.codns.com:8000/auth/signin';

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUser] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ email, password, roles, accessToken });
			setUser('');
			setPassword('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing User or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>{/* <a href="#">Go to Home</a> */}</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={email}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
						<button>Sign In</button>
					</form>
					<p>
						Need an Account?
						<br />
						<span className="line">
							<a href="/">Sign Up</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Login;
