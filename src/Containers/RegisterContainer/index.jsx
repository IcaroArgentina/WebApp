import { doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useIsCompact, useIsMobile } from '../../Hooks/Client';

import AlertIcon from '../../Components/Shared/Icons/AlertIcon';
import HideIcon from '../../Components/Shared/Icons/HideIcon';
import Loader from '../../Components/Shared/Loader';
import ShowIcon from '../../Components/Shared/Icons/ShowIcon';
import { auth } from '../../Firebase/index';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import db from '../../Firebase';
import { projectContext } from '../../Context/ProjectContext';
import styled from 'styled-components';
import theme from './../../Theme/base';
import { useNavigate } from 'react-router-dom';

const Register = ({ history }) => {
	const { usuariosList } = useContext(projectContext);
	const [newUser, setNewUser] = useState({});
	const [repeatUser, setRepeatUser] = useState(false);
	const [alertErrorPassword, setAlertErrorPassword] = useState(false);
	const [required, setRequired] = useState({});
	const [alertError, setAlertError] = useState({});
	const [pending, setPending] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const mobile = useIsMobile();
	const compact = useIsCompact();
	const navigate = useNavigate();

	const formatEmail =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

	/*NEW USER */

	function handleChange(name, value, id) {
		setNewUser((newUser) => ({ ...newUser, [name]: value }));

		if (name === 'password' && value.length < 6 && value.length > 0) {
			setAlertErrorPassword(true);
		} else {
			setAlertErrorPassword(false);
		}
	}

	/* REQUIRED VALIDATION */

	function inputValidation(newUser, name) {
		if (name === 'name') {
			if (!newUser.name || newUser.name === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}
		}
		if (name === 'lastname') {
			if (!newUser.lastname || newUser.lastname === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}
		}

		if (name === 'email') {
			if (
				!newUser.email ||
				newUser.email === '' ||
				!formatEmail.test(newUser.email)
			) {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}
		}

		if (name === 'dni') {
			if (!newUser.dni || newUser.dni === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}

			if (isNaN(newUser.dni) || newUser.dni.length < 7) {
				setAlertError((current) => ({
					...current,
					[name]: 'El número ingresado no es válido',
				}));
			} else {
				setAlertError((current) => ({ ...current, [name]: false }));
			}
		}

		if (name === 'phonenumber') {
			if (!newUser.phonenumber || newUser.phonenumber === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}

			if (isNaN(newUser.phonenumber)) {
				setAlertError((current) => ({
					...current,
					[name]: 'El número ingresado no es válido',
				}));
			} else {
				if (newUser.phonenumber.length < 8) {
					setAlertError((current) => ({
						...current,
						[name]: 'El número ingresado no es válido',
					}));
				} else {
					setAlertError((current) => ({ ...current, [name]: false }));
				}
			}
		}

		if (name === 'password') {
			if (!newUser.password || newUser.password === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}
		}

		if (name === 'personalInformation') {
			if (!newUser.personalInformation || newUser.personalInformation === '') {
				setRequired({ ...required, [name]: 'required' });
			} else {
				setRequired({ ...required, [name]: 'ok' });
			}
		}
	}

	function handleBlur(e) {
		inputValidation(newUser, e.target.name);
	}

	function toggleShowPassword() {
		setIsShowPassword(!isShowPassword);
	}

	/*CREATE USER */

	function handleSubmit(e) {
		e.preventDefault();

		const repeatEmail = usuariosList.find(
			(user) => user.email === newUser.email
		)
			? true
			: false;
		const repeatDNI = usuariosList.find((user) => user.dni === newUser.dni)
			? true
			: false;

		if (repeatEmail || repeatDNI) {
			setRepeatUser({ email: repeatEmail, dni: repeatDNI });
		} else {
			setRepeatUser({ email: repeatEmail, dni: repeatDNI });
			createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
				.then((userCredential) => {
					setPending(true);
					const userId = userCredential.user.uid;
					setDoc(doc(db, 'Usuarios', userId), {
						email: newUser.email,
						dni: newUser.dni,
						phonenumber: newUser.phonenumber,
						name: newUser.name,
						lastname: newUser.lastname,
						personalInformation: newUser.personalInformation,
						rol: 'estudiante',
					});
					setTimeout(() => {
						navigate('/user');
					}, 1500);
				})
				.catch(() => {})
				.finally(() => {
					setPending(false);
				});
		}
	}

	return (
		<Container id='register' mobile={mobile} compact={compact}>
			<div className='register'>
				<div className='registerImage'></div>

				<div className='registerData' id='form'>
					<p>Únete a Ícaro</p>
					<label htmlFor='name'>
						Nombre {required.name === 'required' && <AlertIcon />}
					</label>
					<input
						id='name'
						className={required.name === 'required' ? 'required' : undefined}
						name='name'
						type='text'
						onBlur={handleBlur}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
					<label htmlFor='lastname'>
						Apellido {required.lastname === 'required' && <AlertIcon />}
					</label>
					<input
						id='lastname'
						className={
							required.lastname === 'required' ? 'required' : undefined
						}
						name='lastname'
						type='text'
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						onBlur={handleBlur}
					/>
					<label htmlFor='email'>
						Email
						{required.email === 'required' ? (
							<AlertIcon />
						) : (
							repeatUser.email && (
								<span className='repeat'>Email ya existente</span>
							)
						)}
					</label>
					<input
						id='email'
						className={required.email === 'required' ? 'required' : undefined}
						name='email'
						type='email'
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						onBlur={handleBlur}
					/>
					<label htmlFor='dni'>
						DNI{' '}
						{required.dni === 'required' ? (
							<AlertIcon />
						) : alertError.dni ? (
							<span className='alertError'>{alertError.dni}</span>
						) : (
							repeatUser.dni && <span className='repeat'>DNI ya existente</span>
						)}
					</label>
					<input
						maxLength={8}
						id='dni'
						className={required.dni === 'required' ? 'required' : undefined}
						name='dni'
						type='text'
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						onBlur={handleBlur}
					/>
					<label htmlFor='phonenumber'>
						Teléfono{' '}
						{required.phonenumber === 'required' ? (
							<AlertIcon />
						) : alertError.phonenumber ? (
							<span className='alertError'>{alertError.phonenumber}</span>
						) : (
							!newUser.phonenumber && '(Ejemplo: 351 865-6685)'
						)}
					</label>
					<input
						id='phonenumber'
						className={
							required.phonenumber === 'required' ? 'required' : undefined
						}
						name='phonenumber'
						type='text'
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						onBlur={handleBlur}
					/>
					<label htmlFor='password'>
						Contraseña{required.password === 'required' ? <AlertIcon /> : null}{' '}
						{alertErrorPassword ? (
							<span class='alertError'> (Mínimo de 6 caracteres) </span>
						) : null}
					</label>
					<input
						id='password'
						className={
							required.password === 'required' ? 'required' : undefined
						}
						name='password'
						type={isShowPassword ? 'password' : 'text'}
						onBlur={handleBlur}
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
					<ShowIconContainer onClick={toggleShowPassword}>
						{isShowPassword ? (
							<ShowIcon
								width='16px'
								height='16px'
								color={theme.color.darkBlue}
							/>
						) : (
							<HideIcon
								width='16px'
								height='16px'
								color={theme.color.darkBlue}
							/>
						)}
					</ShowIconContainer>
					<label htmlFor='personalInformation'>
						Información Profesional
						{required.personalInformation === 'required' ? <AlertIcon /> : null}
					</label>
					<textarea
						id='personalInformation'
						className={
							required.personalInformation === 'required'
								? 'required'
								: undefined
						}
						name='personalInformation'
						rows='6'
						onBlur={handleBlur}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}></textarea>

					<button
						id={
							Object.values(required).includes('required') ||
							Object.keys(newUser).length < 7 ||
							alertErrorPassword
								? 'disabled'
								: null
						}
						disabled={
							Object.values(required).includes('required') ||
							Object.keys(newUser).length < 7 ||
							alertErrorPassword
								? true
								: false
						}
						className='unirme'
						onClick={handleSubmit}>
						{pending ? (
							<Loader size={20} marginVertical={4} border={2} flex={true} />
						) : (
							'Registrarse'
						)}
					</button>
				</div>
			</div>
		</Container>
	);
};

export default Register;

const Container = styled.div`
	.required {
		border-color: ${theme.color.redError} !important;
	}

	#disabled {
		background: grey;
		cursor: default;
	}

	width: 100%;
	background: #757575;
	display: flex;

	padding: ${({ mobile, compact }) => (mobile || compact ? '0' : ' 10.3rem 0')};

	flex-direction: row;
	justify-content: center;
	align-items: center;

	.register {
		width: 100%;
		height: ${({ mobile, compact }) =>
			mobile || compact ? 'fit-content' : '41.25rem'};
		max-width: 1080px;
		max-height: ${({ mobile, compact }) =>
			mobile || compact ? 'fit-content' : '660px'};
		margin: auto 0;
		display: flex;
		flex-direction: ${({ mobile, compact }) =>
			mobile || compact ? 'column' : 'row'};
		justify-content: center;
	}

	.registerImage {
		background-image: url('https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/registerImg.png?alt=media&token=c307e822-44e5-49b2-bdb1-d63e081ddf61');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '70%')};
		height: ${({ mobile, compact }) => (mobile || compact ? '300px' : '100%')};
		border-radius: ${({ mobile, compact }) =>
			mobile || compact ? '0' : '10px 0 0 10px'};
	}

	.registerData {
		padding: 4% 0 4% 0;
		width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '90%')};
		display: flex;
		flex-direction: column;

		background: white;

		border-radius: ${({ mobile, compact }) =>
			mobile || compact ? '0' : '0 10px 10px 0'};
		p {
			font-weight: 700;
			font-size: 1.25rem;
			line-height: 1.5rem;
			margin-bottom: 3.5%;
		}

		label {
			font-size: 1rem;
			line-height: 1.5rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			svg {
				margin-left: 1rem;
			}
		}

		input {
			border-radius: 5px;
			border: 1px solid ${theme.color.registerInputs};
			height: 1.75rem;
			margin-bottom: 1%;
			padding: 0;
			font-size: 1rem;
		}

		input:focus {
			border: 1px solid ${theme.color.darkBlue};
			outline: none;
			border-radius: 5px;
			font-size: 1rem;
			font-family: 'Montserrat', sans-serif;
		}

		textarea {
			border-radius: 5px;
			border: 1px solid ${theme.color.registerInputs};
			margin-bottom: 1%;
			font-size: 1rem;
		}

		textarea:focus {
			border: 1px solid ${theme.color.darkBlue};
			outline: none;
			border-radius: 5px;
			font-size: 1rem;
			font-family: 'Montserrat', sans-serif;
		}
		.alertError {
			color: ${theme.color.redError};
			margin-left: 0.5rem;
		}

		.repeat {
			color: ${theme.color.redError};
			margin-left: 0.5rem;
		}
	}

	.registerData > * {
		width: 73%;
		margin: 0 auto;
		font-family: 'Montserrat', sans-serif;
	}

	.unirme {
		cursor: pointer;
		height: 2.8rem;
		background: ${theme.color.darkBlue};
		border-radius: 10px;
		border: unset;
		color: white;
		font-family: 'Montserrat', sans-serif;
		font-size: 1.25rem;
		line-height: 1.5rem;
		font-weight: 700;
		margin-top: 2%;
	}
`;

const ShowIconContainer = styled.div`
	height: 16px;
	width: 10%;
	position: relative;
	top: -28px;
	left: 66%;
`;
