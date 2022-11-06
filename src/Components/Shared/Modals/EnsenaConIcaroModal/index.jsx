import '../ModalStyles/ModalStyles.css';

import React, { useContext, useState } from 'react';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';

import { CONTACTMEDIA } from '../../../../Constants/ConatctMedia';
import ReactModal from 'react-modal';
import Select from 'react-select';
import { UseSendEmail } from '../../../../Hooks/SendEmail';
import { VscClose } from 'react-icons/vsc';
import WhiteLoader from '../../WhiteLoader';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const EnsenaConIcaroModal = ({ modalIsOpen, closeModal }) => {
	const mobile = useIsMobile();
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [contactData, setContactData] = useState({
		titular: 'Ha recibido un mensaje desde la seccion Enseñá con ICARO:',
		send_to: 'rrhh@icaro.org.ar',
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
			titular: 'Ha recibido un mensaje desde la seccion Enseñá con ICARO:',
			send_to: 'rrhh@icaro.org.ar',
		});
		closeModal();
	}

	function handleChange(name, value) {
		if (name === 'contactMedia') {
			setContactData((contactData) => ({
				...contactData,
				[name]: `Medio de preferencia para contacto: ${value}`,
			}));
		} else if (name === 'enterprise') {
			setContactData((contactData) => ({
				...contactData,
				[name]: `Empresa: ${value}`,
			}));
		} else if (name === 'profesion') {
			setContactData((contactData) => ({
				...contactData,
				[name]: `Profesion: ${value}`,
			}));
		} else if (name === 'linkedinProfile') {
			setContactData((contactData) => ({
				...contactData,
				[name]: `Perfil de Linkedin: ${value}`,
			}));
		} else {
			setContactData((contactData) => ({ ...contactData, [name]: value }));
		}

		if (
			contactData?.name?.length > 0 &&
			contactData?.telefono?.length > 0 &&
			contactData?.['correo-electronico']?.length > 0 &&
			contactData?.['correo-electronico']?.includes('@') &&
			contactData?.linkedinProfile?.length > 0
		) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		setSubmitLoading(true);
		if (isButtonDisabled) {
			return;
		}
		UseSendEmail(contactData, showToast, setSubmitLoading, null);

		setTimeout(() => {
			setContactData({
				titular: 'Ha recibido un mensaje desde la seccion Enseñá con ICARO:',
				send_to: 'rrhh@icaro.org.ar',
			});
			setSubmitLoading(false);
			setIsButtonDisabled(true);
			closeModal();
			setToastList([]);
		}, 5000);
	}

	const customStyles = {
		overlay: { position: 'fixed', zIndex: 4 },
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '80%',
			maxWidth: '1020px',
			padding: '20px 40px',
			borderRadius: '0px 0px 15px 15px',
		},
	};

	const customMobileStyles = {
		overlay: { position: 'fixed', zIndex: 4 },

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
				<CloseButton onClick={handleCloseModal}>
					<VscClose size={20} />
				</CloseButton>
				<div>
					<Title>¡Trabajá con nosotros!</Title>
					<Parragraph mobile={mobile}>
						Si sos profesional especializado en la industria, si te apasiona la
						educación y trabajar en equipo ¡nos gustaría conocerte!
					</Parragraph>
				</div>

				<StyledForm mobile={mobile}>
					<FormLabel mobile={mobile} htmlFor='name'>
						Nombre
						<FormInput
							id='name'
							name='name'
							type='text'
							onChange={(e) => handleChange('name', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='lastName'>
						Apellido
						<FormInput
							id='lastName'
							name='lastName'
							type='text'
							onChange={(e) => handleChange('lastName', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='enterprise'></FormLabel>
					<FormLabel mobile={mobile} htmlFor='enterprise'>
						Empresa
						<FormInput
							id='enterprise'
							name='enterprise'
							type='text'
							onChange={(e) => handleChange('enterprise', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='profesion'>
						Profesión
						<FormInput
							id='profesion'
							name='profesion'
							type='text'
							onChange={(e) => handleChange('profesion', e.target.value)}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='contactMedia'>
						Medio de contacto preferido
						<div style={{ width: '100%' }}>
							<Select
								options={CONTACTMEDIA}
								id='contactMedia'
								name='contactMedia'
								onChange={(value) => handleChange('contactMedia', value.name)}
								placeholder='Seleccione...'
							/>
						</div>
					</FormLabel>

					<FormLabel mobile={mobile} htmlFor='correoElectronico'>
						Correo electrónico
						<FormInput
							id='correo-electronico'
							name='correo-electronico'
							type='email'
							onChange={(e) =>
								handleChange('correo-electronico', e.target.value)
							}
						/>
					</FormLabel>

					<FormLabel mobile={mobile} htmlFor='linkedinProfile'>
						Perfil Linkedin
						<FormInput
							id='linkedinProfile'
							name='linkedinProfile'
							type='url'
							onChange={(e) => handleChange('linkedinProfile', e.target.value)}
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

					<div style={{ width: '100%' }}>
						<EnviarMail onClick={handleSubmit} disabled={isButtonDisabled}>
							{submitLoading ? <WhiteLoader /> : 'Enviar'}
						</EnviarMail>
					</div>
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
	color: #1744ff;
	width: ${({ mobile }) => (mobile ? '100%' : '60%')};
	margin: auto;
`;
const CloseButton = styled.div`
	background: transparent;
	border: unset;
	font-size: 20px;
	cursor: pointer;
	text-align: right;
	margin-top: 10px;
`;

const Parragraph = styled.div`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	width: ${({ mobile }) => (mobile ? '100%' : '60%')};
	line-height: 19.5px;
	text-align: center;
	margin: 20px auto;
	color: #3d3d3d;
`;
const StyledForm = styled.form`
	margin: 0 10px;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: space-between;

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
			border: 1px solid ${theme.color.darkBlue};
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
	width: ${({ mobile }) => (mobile ? '100%' : '30%')};
	display: block;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	line-height: 24px;
	color: ${theme.color.grey};
	margin: 10px 0px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
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
		border-radius: 0;
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
export default EnsenaConIcaroModal;
