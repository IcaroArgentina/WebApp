import { useLocation, useNavigate } from 'react-router-dom';

import AlertIcon from '../../../Shared/Icons/AlertIcon';
import Loader from '../../Loader';
import React from 'react';
import ReactModal from 'react-modal';
import { VscClose } from 'react-icons/vsc';
import { scrollTo } from '../../../../Utils';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsCompact } from '../../../../Hooks/Client';
import { useIsMobile } from '../../../../Hooks/Client';

const LoginModal = ({
	isLoginOpen,
	setIsLoginOpen,
	handleChange,
	passwordError,
	hasError,
	handleSubmit,
	setIsPasswordRecoveryOpen,
	pending,
}) => {
	const closeModal = (e) => {
		e.preventDefault();
		setIsLoginOpen(false);
	};
	const mobile = useIsMobile();
	const navigate = useNavigate();
	const location = useLocation();
	const compact = useIsCompact();
	const customStyles = {
		overlay: { position: 'fixed', zIndex: `${theme.zIndex.modals}` },
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: `${mobile || compact ? '100%' : '80%'}`,
			maxWidth: '1020px',
			overflow: 'hidden',
			borderRadius: `${mobile || compact ? '0' : '15px'}`,
			padding: '0',
		},
	};

	const openRecoveryPasswordModal = (e) => {
		e.preventDefault();
		setIsLoginOpen(false);
		setIsPasswordRecoveryOpen(true);
	};

	const handleGoRegister = (e) => {
		e.preventDefault();
		setIsLoginOpen(false);
		scrollTo(location, navigate, '/register');
		// navigate('/register');
	};
	return (
		<ReactModal
			isOpen={isLoginOpen}
			onRequestClose={closeModal}
			closeTimeoutMS={500}
			style={customStyles}
			ariaHideApp={false}>
			<Container mobile={mobile} compact={compact}>
				<div className='loginImage'></div>
				<div className='loginData'>
					<p>Inicia Sesión</p>
					<div className='input'>
						<label htmlFor='user'>
							Email
							{hasError.email && (
								<span className='error'>
									<AlertIcon className='icon' /> El usuario es incorrecto
								</span>
							)}
						</label>
						<input
							id='usuario'
							onChange={handleChange}
							type='email'
							name='user'
						/>
					</div>
					<div className='input'>
						<label htmlFor='password'>
							Contraseña
							{passwordError ? (
								<span className='error'>
									<AlertIcon className='icon' /> Mínimo 6 caracteres
								</span>
							) : hasError.password & hasError.block ? (
								<span className='error'>
									<AlertIcon className='icon' /> La cuenta se bloqueó por
									múltiples intentos, aguarda unos instantes y probá de nuevo
								</span>
							) : (
								hasError.password && (
									<span className='error'>
										<AlertIcon className='icon' /> La contraseña es incorrecta
									</span>
								)
							)}
						</label>
						<input
							onChange={handleChange}
							id='contraseña'
							type='password'
							name='password'
							className='ok'
						/>
					</div>
					<button className='forgot' onClick={openRecoveryPasswordModal}>
						Olvidé mi contraseña
					</button>
					<button
						className='submit'
						disabled={passwordError ? true : false}
						onClick={handleSubmit}>
						{pending ? (
							<Loader size={20} marginVertical={4} border={2} flex={true} />
						) : (
							'Inicia sesión'
						)}
					</button>
					<button onClick={handleGoRegister} className='register'>
						¿No tenés cuenta? Únete a Icaro
					</button>
					<button className='close' onClick={closeModal}>
						<VscClose size={20} />
					</button>
				</div>
			</Container>
		</ReactModal>
	);
};

const Container = styled.div`
	z-index: ${theme.zIndex.logInModal};
	height: ${({ mobile, compact }) => (mobile || compact ? '100vh' : '65vh')};
	min-height: 500px;
	background-color: ${({ mobile, compact }) =>
		mobile || compact ? 'red' : 'blue'};
	top: 17%;
	left: 24%;
	margin: 0;
	border: white;
	background-color: white;
	display: flex;
	flex-direction: ${({ mobile, compact }) =>
		mobile || compact ? 'column' : 'row'};
	border-radius: 10px;
	font-family: 'Montserrat', sans-serif;

	.loginImage {
		width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '50%')};
		height: ${({ mobile, compact }) => (mobile || compact ? '35%' : '100%')};
		background-image: url('https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/loginImg.png?alt=media&token=70a74179-9437-4a47-9efb-0f70d0281341');
		background-position: ${({ mobile, compact }) =>
			mobile || compact ? '100% 35%' : 'right top'};
		background-size: ${({ mobile, compact }) =>
			mobile || compact ? '150%' : 'cover'};
		background-repeat: no-repeat;
		border-radius: ${({ mobile, compact }) =>
			mobile || compact ? '0' : '10px 0 0 10px'};
	}

	.loginData {
		width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '50%')};
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: ${({ mobile, compact }) =>
			mobile || compact ? 'space-evenly' : 'center'};

		p {
			font-size: 1.25rem;
			font-weight: 700;
		}

		.input {
			display: flex;
			flex-direction: column;
			margin-top: 3%;

			label {
				font-size: 1rem;
				margin-bottom: 1%;
			}

			input {
				border-radius: 5px;
				border: 1px solid #e6e6e6;
				height: 1.875rem;
				font-size: 1rem;
				font-family: 'Montserrat', sans-serif;
			}

			input:focus {
				border: 1px solid blue;
				outline: none;
				border-radius: 5px;
				font-size: 1rem;
				font-family: 'Montserrat', sans-serif;
			}

			input::placeholder {
				display: none;
			}
		}
		.error {
			margin-left: 2%;
			color: ${theme.color.alertIcon};
		}
		.forgot {
			font-family: 'Montserrat', sans-serif;
			font-size: 1rem;
			text-align: start;
			text-decoration: underline;
			margin-top: 2%;
			padding: 0;
			color: black;
			outline: none;
			border: unset;
			background-color: transparent;
			cursor: pointer;
		}

		.submit {
			height: 2.8rem;
			background: #1744ff;
			border-radius: 10px;
			border: unset;
			color: white;
			font-family: 'Montserrat', sans-serif;
			font-size: 1.25rem;
			line-height: 1.5rem;
			font-weight: 700;
			margin-top: 9%;
			cursor: pointer;
		}

		.register {
			color: black;
			font-weight: 500 !important;
			text-align: center;
			margin-top: 5% !important;
			background-color: unset;
			border: unset;
			font-family: ${theme.fontFamily.primary};
			text-decoration: underline;
			font-size: 1rem;
			line-height: 1.5rem;
			cursor: pointer;
		}

		.close {
			background: transparent;
			border: unset;
			font-size: 1.6rem;
			position: absolute;
			bottom: ${({ mobile, compact }) => (mobile || compact ? '95%' : '90%')};
			left: 60%;
			cursor: pointer;
		}
	}

	.loginData > * {
		width: 72%;
		margin: 0 auto;
		font-weight: 400;
	}

	.passwordError {
		color: red;
		border-color: red;
	}

	.passwordError::placeholder {
		color: red;
	}
`;

export default LoginModal;
