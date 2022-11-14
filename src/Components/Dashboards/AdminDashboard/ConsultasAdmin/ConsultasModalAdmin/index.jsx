import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import ReactModal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from 'react-icons/vsc';
import WhiteLoader from '../../../../Shared/WhiteLoader';
import db from '../../../../../Firebase/index';
import styled from 'styled-components';
import theme from '../../../../../Theme/base';
import { useIsMobile } from '../../../../../Hooks/Client';

const ConsultasModalAdmin = ({
	currentConsulta,
	chatModalOpen,
	setChatModalOpen,
	loggedUser,
	showToast,
}) => {
	const [question, setQuestion] = useState('');
	const mobile = useIsMobile();
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [submitLoading, setSubmitLoading] = useState(false);

	function handleCloseModal() {
		setChatModalOpen(false);
		setQuestion('');
		setIsButtonDisabled(true);
		setSubmitLoading(false);
	}

	const customStyles = {
		overlay: {
			position: 'fixed',
			zIndex: 4,
		},
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '500px',
			height: '600px',
			padding: '40px',
			paddingTop: '0px',
		},
	};

	const customMobileStyles = {
		overlay: {
			position: 'fixed',
			zIndex: 4,
		},

		content: {
			width: '85%',
			height: '80%',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			padding: '7.5%',
			border: 'none',
			borderRadius: '0px',
		},
	};

	const handleInputChange = (value) => {
		if (value.length > 1) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		if (isButtonDisabled) {
			return;
		}

		const date = Date.now();
		const newMessage = {
			date: new Date(date).toLocaleDateString(),
			hour: new Date(date).toLocaleTimeString(),
			respuestaIcaro: question,
			read: false,
		};

		currentConsulta.mensajes = [...currentConsulta.mensajes, newMessage];

		const ref = doc(db, 'Consultas', currentConsulta.id);
		updateDoc(ref, { mensajes: currentConsulta.mensajes });

		setSubmitLoading(false);
		setIsButtonDisabled(true);
		setQuestion('');
		showToast();

		setTimeout(() => {
			setChatModalOpen(false);
		}, 2500);
	};

	return (
		<>
			<ReactModal
				isOpen={chatModalOpen}
				onRequestClose={setChatModalOpen}
				style={mobile ? customMobileStyles : customStyles}
				closeTimeoutMS={500}
				ariaHideApp={false}>
				<CloseButton onClick={handleCloseModal}>
					<VscClose size={20} />
				</CloseButton>
				<Title>
					Consulta de {loggedUser?.name} {loggedUser?.lastname}
				</Title>
				<Parragraph mobile={mobile}>
					Asunto: {currentConsulta?.motivo}
				</Parragraph>
				<MessagesConainer>
					{currentConsulta?.mensajes?.length > 0 &&
						currentConsulta?.mensajes.map((msg, index) => {
							return msg?.preguntaEstudiante?.length > 0 ? (
								<Message key={index}>
									<MessageData>
										<span>{loggedUser.name}</span> {msg.date}
									</MessageData>
									<br />
									<p>{msg.preguntaEstudiante}</p>
								</Message>
							) : (
								<Message key={index} isIcaro>
									<MessageData>
										<span>Icaro</span> {msg.date}
									</MessageData>
									<br />
									<p>{msg.respuestaIcaro}</p>
								</Message>
							);
						})}
				</MessagesConainer>

				{currentConsulta?.isDeleted ? (
					<ConsultaEliminadaBox>
						<>Consulta eliminada no visible para el usuario</>
					</ConsultaEliminadaBox>
				) : (
					<StyledForm mobile={mobile}>
						<FormLabel mobile={mobile} htmlFor='question'>
							Mensaje
							<TextareaAutosize
								onChange={(e) => {
									setQuestion(e.target.value);
									return handleInputChange(e.target.value);
								}}
								name='question'
								maxRows={3}
								minRows={3}
								style={{ width: '96%', padding: '2%' }}
								className='styled-text-area'
								value={question}
							/>
						</FormLabel>
						<EnviarMail onClick={handleSubmit} disabled={isButtonDisabled}>
							{submitLoading ? <WhiteLoader /> : 'Enviar'}
						</EnviarMail>
					</StyledForm>
				)}
			</ReactModal>
		</>
	);
};

export default ConsultasModalAdmin;

const Title = styled.h3`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	width: 100%;
	color: ${theme.color.darkBlue};
	margin-top: 0;
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

const CloseButton = styled.div`
	background: transparent;
	border: unset;
	font-size: 20px;
	cursor: pointer;
	text-align: right;
	margin-top: 20px;
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

const MessagesConainer = styled.div`
	height: 44%;
	width: 100%;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
const Message = styled.div`
	width: 80%;
	margin: 0.8rem auto;
	padding: 0.7rem 1.25rem 0.7rem 1.25rem;
	background-color: ${({ icaro }) =>
		icaro ? null : `${theme.color.lightGrey}`};
	border-radius: 25px;
	word-wrap: break-word;
	font-family: ${theme.fontFamily.primary};
	font-size: 1rem;
	p {
		margin: 0.5rem 0 0 0;
	}

	::after {
		content: '';
		position: relative;
		width: 0;
		height: 0;
		border-bottom: 17px solid ${theme.color.lightGrey};
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		bottom: 5px;
		left: ${({ isIcaro }) => (isIcaro ? '400px' : '-34px')};
	}
`;

const MessageData = styled.span`
	color: ${theme.color.grey};
	font-weight: 400;
	font-size: 0.8rem;
	line-height: 1rem;

	span {
		font-size: 1rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: ${theme.color.darkBlue};
	}
`;

const ConsultaEliminadaBox = styled.div`
	width: 100%;
	margin: auto;
	height: 30%;
	background-color: ${theme.color.lightGrey};

	display: flex;
	align-items: center;
	justify-content: center;
	word-wrap: break-word;
	font-family: ${theme.fontFamily.primary};
`;
const StyledForm = styled.form`
	width: 90%;
	margin: auto;
	height: 30%;

	.styled-text-area {
		display: block;
		width: 100%;
		border: 1px solid #e6e6e6;
		resize: none;
		margin-top: 10px;
		padding: 0;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		font-family: ${theme.fontFamily.primary};

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
	display: block;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	line-height: 24px;
	color: ${theme.color.grey};
	margin: 10px 0px;
`;
