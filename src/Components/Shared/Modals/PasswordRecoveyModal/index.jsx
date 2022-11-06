import React, { useState } from 'react';
import { useIsCompact, useIsMobile } from '../../../../Hooks/Client';

import EnviaBttn from '../../Buttons/EnviaBttn';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { VscClose } from 'react-icons/vsc';
import { auth } from '../../../../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const PasswordRecoveryModal = ({
	isPasswordRecoveryOpen,
	setIsPasswordRecoveryOpen,
	setIsLoginOpen,
}) => {
	const [user, setUser] = useState('');
	const [confirm, setConfirm] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [pending, setPending] = useState(false);
	const mobile = useIsMobile();
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
	const closeModal = (e) => {
		e.preventDefault();
		setIsPasswordRecoveryOpen(false);
		setIsLoginOpen(false);
	};

	const handleChange = (e) => {
		setUser(e.target.value);
		setHasError(false);
	};

	const handleRecovery = async (e) => {
		await sendPasswordResetEmail(auth, user)
			.then(() => {
				setPending(true);
				setTimeout(() => {
					setPending(false);
					setConfirm(true);
				}, 1000);
			})
			.catch((error) => {
				if (error.code === 'auth/invalid-email') {
					setHasError('Usuario incorrecto');
				}
				if (error.code === 'auth/user-not-found') {
					setHasError('Usuario inexistente');
				}
			});
	};

	return (
		<ReactModal
			isOpen={isPasswordRecoveryOpen}
			onRequestClose={setIsPasswordRecoveryOpen}
			closeTimeoutMS={500}
			style={customStyles}
			ariaHideApp={false}>
			<Container mobile={mobile} compact={compact}>
				<Image mobile={mobile} compact={compact}></Image>
				<CloseButton
					mobile={mobile}
					compact={compact}
					className='close'
					onClick={closeModal}>
					<VscClose size={20} />
				</CloseButton>
				{confirm ? (
					<ConfirmContainer>
						<IoIosCheckmarkCircleOutline
							size={125}
							color={theme.color.darkBlue}
						/>
						<ConfirmMessage>
							¡Revisa tu bandeja de entrada!
							<br />
							<span>Te contactaremos en la brevedad</span>
						</ConfirmMessage>
						<Paragraph confirm={true}>
							En pocos minutos recibirás un correo con el enlace para recuperar
							tu contraseña.
						</Paragraph>
						<Link onClick={closeModal} className='home' to='/'>
							Volver al inicio
						</Link>
					</ConfirmContainer>
				) : (
					<RecoveryContainer mobile={mobile} compact={compact}>
						<Title>Recuperá tu contraseña</Title>
						<Paragraph>
							Ingrese la dirección de correo electrónico que utilizó cuando se
							unió y le enviaremos instrucciones para restablecer su contraseña.
						</Paragraph>
						<InputContainer>
							<Label htmlFor='user'>
								Email <span className='error'>{hasError}</span>
							</Label>
							<Input
								id='usuario'
								onChange={handleChange}
								type='email'
								name='user'
							/>
						</InputContainer>
						<EnviaBttn
							padding='10px 0'
							borderRadius='10px'
							fontSize='1.25rem'
							fontWeight='700'
							margin='3.15rem auto 0 auto'
							backgroundColor={theme.color.darkBlue}
							disabled={
								user === '' || user.includes('@') === false ? true : false
							}
							onClick={handleRecovery}
							pending={pending}
						/>
						<Link
							onClick={() => {
								setIsPasswordRecoveryOpen(false);
								setIsLoginOpen(false);
							}}
							className='goRegister'
							to='/register'>
							¿No tenés cuenta? Únete a Icaro
						</Link>
					</RecoveryContainer>
				)}
			</Container>
		</ReactModal>
	);
};

export default PasswordRecoveryModal;

const Container = styled.div`
	z-index: ${theme.zIndex.logInModal};
	height: ${({ mobile, compact }) => (mobile || compact ? '100vh' : '65vh')};
	min-height: 500px;
	top: 17%;
	left: 24%;
	margin: 0;
	border: white;
	background-color: white;
	display: flex;
	border-radius: 10px;
	font-family: ${theme.fontFamily.primary};
	background: transparent;
	flex-direction: ${({ mobile, compact }) =>
		mobile || compact ? 'column' : 'row'};

	.goRegister {
		font-family: ${theme.fontFamily.primary};
		color: ${theme.color.black};
		font-weight: 500 !important;
		text-align: center;
		margin-top: 5% !important;
		background-color: transparent;
		border: none;
		text-decoration: underline;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1.125rem;
	}
`;

const Image = styled.div`
	width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '50%')};
	height: ${({ mobile, compact }) => (mobile || compact ? '35%' : '100%')};
	background-image: url('https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/loginImg.png?alt=media&token=70a74179-9437-4a47-9efb-0f70d0281341');
	background-position: ${({ mobile, compact }) =>
		mobile || compact ? '100% 35%' : 'right top'};
	border-radius: ${({ mobile, compact }) =>
		mobile || compact ? '0' : '10px 0 0 10px'};
	background-repeat: no-repeat;
`;

const CloseButton = styled.button`
	border: unset;
	font-size: 1.6rem;
	position: absolute;
	bottom: ${({ mobile, compact }) => (mobile || compact ? '95%' : '90%')};
	left: 90%;
	background-color: transparent;
	cursor: pointer;
`;
const RecoveryContainer = styled.form`
	width: ${({ mobile, compact }) => (mobile || compact ? '100%' : '50%')};
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${({ mobile, compact }) =>
		mobile || compact ? 'space-evenly' : 'center'};
	> * {
		width: 71%;
		margin: 3% auto 0 auto;
	}
`;
const Title = styled.h3`
	font-style: normal;
	font-weight: 700;
	font-size: 1.25rem;
	line-height: 1.5rem;
`;
const Paragraph = styled.p`
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5rem;
	${({ confirm }) => confirm && 'margin-top: 2.25rem !important;'}
`;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const Label = styled.label`
	font-size: 1rem;
	margin-bottom: 1%;
	.error {
		color: ${theme.color.alertIcon};
	}
`;
const Input = styled.input`
	border-radius: 5px;
	border: 1px solid #e6e6e6;
	height: 1.875rem;
	font-size: 1rem;
	font-family: 'Montserrat', sans-serif;

	&:focus {
		border: 1px solid blue;
		outline: none;
		border-radius: 5px;
		font-size: 1rem;
		font-family: 'Montserrat', sans-serif;
	}

	&::placeholder {
		display: none;
	}
`;

const ConfirmContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	> * {
		width: 80%;
		margin: 3% auto 0 auto;
		text-align: center;
	}

	.goHome {
		padding: 10px 0;
		color: ${theme.color.black};
		background-color: ${theme.color.darkBlue};
		font-weight: 700;
		font-size: 1.25rem;
		line-height: 1.5rem;
		text-align: center;
		text-decoration: none;
		border-radius: 10px;
		margin-top: 3.2rem !important;
	}
`;

const ConfirmMessage = styled.h3`
	font-weight: 700;
	font-size: 1.5rem;
	line-height: 2rem;

	span {
		font-weight: 400;
	}
`;
