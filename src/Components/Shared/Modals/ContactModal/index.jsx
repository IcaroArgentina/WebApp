import '../ModalStyles/ModalStyles.css';

import React, { useContext, useState } from 'react';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';

import ReactModal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import { UseSendEmail } from '../../../../Hooks/SendEmail';
import { VscClose } from 'react-icons/vsc';
import WhiteLoader from '../../WhiteLoader';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const ContactModal = ({ modalIsOpen, closeModal }) => {
	const mobile = useIsMobile();
	const [mensaje, setMensaje] = useState('');
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [contactData, setContactData] = useState({
		titular: 'Ha recibido un mensaje de contacto de parte de:',
		send_to: 'info@icaro.org.ar',
	});
	const { toastList, setToastList } = useContext(projectContext);

	function showToast(type, content) {
		let selectedToast = [];
		switch (type) {
			case 'success':
				selectedToast = successToast(content, toastList);
				break;
			case 'error':
				selectedToast = errorToast(content, toastList);
				break;
			default:
				break;
		}
		setToastList([selectedToast]);
	}

	function handleCloseModal() {
		setContactData({
			titular: 'Ha recibido un mensaje de contacto de parte de:',
			send_to: 'info@icaro.org.ar',
		});
		setMensaje('');
		closeModal();
	}

	function handleChange(name, value) {
		setContactData((contactData) => ({ ...contactData, [name]: value }));
		if (
			contactData?.fullname?.length > 0 &&
			mensaje.length > 0 &&
			contactData?.telefono?.length > 0 &&
			contactData?.['correo-electronico']?.length > 0 &&
			contactData?.['correo-electronico']?.includes('@')
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}

	const sendEmail = (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		if (isButtonDisabled) {
			return;
		}
		UseSendEmail(contactData, showToast, setSubmitLoading, null);

		setTimeout(() => {
			setContactData({
				titular: 'Ha recibido un mensaje de contacto de parte de:',
				send_to: 'info@icaro.org.ar',
			});
			setMensaje('');
			setSubmitLoading(false);
			setIsButtonDisabled(true);
			closeModal();
			setToastList([]);
		}, 2500);
	};

	const customStyles = {
		overlay: {
			position: 'fixed',
			zIndex: `${theme.zIndex.modals}`,
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '500px',
			padding: '40px',
			paddingTop: '0px',
		},
	};

	const customMobileStyles = {
		overlay: {
			position: 'fixed',
			zIndex: `${theme.zIndex.modals}`,
		},

		content: {
			width: '85%',
			height: '92%',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			padding: '7.5%',
			border: 'none',
			borderRadius: '0px',
		},
	};

	return (
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={handleCloseModal}
				style={mobile ? customMobileStyles : customStyles}
				closeTimeoutMS={500}
				ariaHideApp={false}>
				<CloseButton>
					<VscClose onClick={handleCloseModal} size={20} />
				</CloseButton>
				<Title>Contactanos</Title>
				<Parragraph mobile={mobile}>
					Dejá tu información de contacto y te brindaremos toda la información
					que necesites. ¡Tu futuro te espera!
				</Parragraph>
				<StyledForm mobile={mobile} onSubmit={sendEmail}>
					<FormLabel mobile={mobile} htmlFor='fullname'>
						Nombre
						<FormInput
							id='fullname'
							name='fullname'
							type='text'
							onChange={(e) => handleChange('fullname', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='telefono'>
						Teléfono
						<FormInput
							id='telefono'
							name='telefono'
							type='number'
							onChange={(e) => handleChange('telefono', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='correo-electronico'>
						Correo Electrónico
						<FormInput
							id='correo-electronico'
							name='correo-electronico'
							type='email'
							onChange={(e) =>
								handleChange('correo-electronico', e.target.value)
							}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='mensaje'>
						<TextareaAutosize
							minRows={3}
							id='mensaje'
							name='mensaje'
							placeholder='Mensaje'
							value={mensaje}
							className='styled-text-area'
							onChange={(e) => {
								setMensaje(e.target.value);
								return handleChange('mensaje', e.target.value);
							}}
						/>
					</FormLabel>
					<EnviarMail onClick={sendEmail} disabled={isButtonDisabled}>
						{submitLoading ? <WhiteLoader /> : 'Enviar'}
					</EnviarMail>
				</StyledForm>
			</ReactModal>
		</>
	);
};

const Title = styled.h3`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	width: 100%;
	color: #1744ff;
`;
const CloseButton = styled.div`
	background: transparent;
	border: unset;
	font-size: 20px;
	cursor: pointer;
	text-align: right;
	margin-top: 20px;
`;

const Parragraph = styled.div`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	width: ${({ mobile }) => (mobile ? '75%' : null)};
	line-height: 19.5px;
	text-align: center;
	margin: 20px auto;
	color: #3d3d3d;
`;
const StyledForm = styled.form`
	width: 90%;
	margin: auto;

	.styled-text-area {
		display: block;
		width: 100%;
		height: 35px !important;
		border: none;
		border-bottom: 1px solid #e6e6e6;
		resize: none;
		margin-top: 20px;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		font-family: ${theme.fontFamily.primary};

		::placeholder {
			display: block;
			font-family: ${theme.fontFamily.primary};
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;
			color: ${theme.color.grey};
			margin: 10px 0px;
		}

		:focus {
			font-family: ${theme.fontFamily.primary};
			border-bottom: 2px solid ${theme.color.darkBlue};
			outline: none;
			border-radius: 5px;
			font-size: 1rem;
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;
		}
	}
`;

const FormLabel = styled.label`
	display: block;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	line-height: 24px;
	color: ${theme.color.grey};
	margin: 10px 0px;
`;

const FormInput = styled.input`
	display: block;
	width: 100%;
	height: 30px;
	border: none;
	border-bottom: 1px solid #e6e6e6;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;

	:focus {
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		border-bottom: 2px solid ${theme.color.darkBlue};
		outline: none;
		border-radius: 5px;
		font-size: 1rem;
		font-family: ${theme.fontFamily.primary};
	}

	::placeholder {
		display: block;
		font-family: ${theme.fontFamily.primary};
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		color: ${theme.color.grey};
		margin: 10px 0px;
	}
`;

const EnviarMail = styled.button`
	width: 58%;
	margin: 20px 21%;
	padding: 16px;
	background-color: ${({ disabled }) =>
		disabled ? theme.color.disabledBlue : theme.color.darkBlue};
	color: #fff;
	font-family: Montserrat, sans-serif !important;
	font-size: 1.18rem !important;
	color: white;
	border: none;
	cursor: ${({ disabled }) => !disabled && 'pointer'};
`;

export default ContactModal;
