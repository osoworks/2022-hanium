import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './Login';
import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const email_REGEX = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://kangtong1105.codns.com:8000/auth/signup';

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validpassword, setValidpassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchpassword, setMatchpassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidEmail(email_REGEX.test(email));
	}, [username]);

	useEffect(() => {
		setValidpassword(password_REGEX.test(password));
		setValidMatch(password === matchpassword);
	}, [password, matchpassword]);

	useEffect(() => {
		setErrMsg('');
	}, [username, password, matchpassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USER_REGEX.test(username);
		const v2 = email_REGEX.test(email);
		const v3 = password_REGEX.test(password);
		if (!v1 || !v3) {
			setErrMsg('Invalid Entry');
			return;
		}
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ username, email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			// TODO: remove console.logs before deployment
			console.log(JSON.stringify(response?.data));
			setSuccess(true);
			//clear state and controlled inputs
			setUser('');
			setPassword('');
			setMatchpassword('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<Login />
			) : (
				<section >
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Username:
							<FontAwesomeIcon
								icon={faCheck}
								className={validName ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validName || !username ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={username}
							required
							aria-invalid={validName ? 'false' : 'true'}
							aria-describedby="uidnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>
						<p
							id="uidnote"
							className={
								emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>


						<label htmlFor="email">
							Email:
							<FontAwesomeIcon
								icon={faCheck}
								className={validName ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validName || !email ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="text"
							id="email"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							aria-invalid={validEmail ? 'false' : 'true'}
							aria-describedby="emailnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p
							id="emailnote"
							className={
								userFocus && username && !validName ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Write your email address.
							<br />
							Only email-form is allowed.
						</p>


						<label htmlFor="password">
							Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validpassword ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validpassword || !password ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							aria-invalid={validpassword ? 'false' : 'true'}
							aria-describedby="passwordnote"
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
						/>
						<p
							id="passwordnote"
							className={passwordFocus && !validpassword ? 'instructions' : 'offscreen'}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a
							special character.
							<br />
							Allowed special characters:{' '}
							<span aria-label="exclamation mark">!</span>{' '}
							<span aria-label="at symbol">@</span>{' '}
							<span aria-label="hashtag">#</span>{' '}
							<span aria-label="dollar sign">$</span>{' '}
							<span aria-label="percent">%</span>
						</p>

						<label htmlFor="confirm_password">
							Confirm Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchpassword ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchpassword ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type="password"
							id="confirm_password"
							onChange={(e) => setMatchpassword(e.target.value)}
							value={matchpassword}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id="confirmnote"
							className={
								matchFocus && !validMatch ? 'instructions' : 'offscreen'
							}
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button
							disabled={!validName || !validpassword || !validMatch ? true : false}
						>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<a href="/login">Sign In</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Register;
