import React, { useContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';

import DeleteIcon from './../../../../Shared/Icons/DeleteIcon/index';
import EnviaBttn from '../../../../Shared/Buttons/EnviaBttn';
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from 'react-icons/vsc';
import db from '../../../../../Firebase/index';
import styled from 'styled-components';
import theme from '../../../../../Theme/base';
import { useIsMobile } from '../../../../../Hooks/Client';
import { userContext } from '../../../../../Context/UserContext';

const ModalChat = ({
	currentConsultaId,
	setChatModalOpen,
	loggedUser,
	confirm,
}) => {
	const { currentUser } = useContext(userContext);
	const [messages, setMessages] = useState([]);
	const [question, setQuestion] = useState('');
	const mobile = useIsMobile();

	useEffect(() => {
		currentConsultaId &&
			onSnapshot(
				collection(db, 'Consultas'),
				(snapshot) =>
					setMessages(
						snapshot.docs
							.filter((doc) => doc.id === currentConsultaId)
							.map((doc) => doc.data())
					),
				(error) => console.log('error', error)
			);
	}, [currentUser, currentConsultaId]);

	const handleInputChange = (e) => {
		setQuestion(e.target.value);
	};

	const handleSubmit = (e) => {
		const date = Date.now();
		const newMessage = {
			date: new Date(date).toLocaleDateString(),
			hour: new Date(date).toLocaleTimeString(),
			preguntaEstudiante: question,
			read: false,
		};

		let msgs = messages && messages[0].mensajes;

		const ref = doc(db, 'Consultas', currentConsultaId);

		updateDoc(ref, { mensajes: [...msgs, newMessage] });
		setQuestion('');
	};

	const handleDelete = () => {
		confirm(true);
		setChatModalOpen(false);
	};

	return (
		<MainContainer>
			<ModalContainer mobile={mobile}>
				<OptionButtons>
					<DeleteIcon onClick={handleDelete} />
					<VscClose
						onClick={() => setChatModalOpen(false)}
						style={mobile && { marginTop: 15 }}
						size={mobile ? 25 : 30}
					/>
				</OptionButtons>
				<MessagesConainer>
					{messages &&
						messages[0] &&
						messages[0].mensajes?.map((msg, i) => {
							const datoFecha = Date.now();
							const fechaParseada = new Date(datoFecha).toLocaleDateString();
							return (
								<Message
									isIcaro={msg.preguntaEstudiante ? false : true}
									key={i}>
									<MessageData>
										<span>
											{msg.preguntaEstudiante ? loggedUser.name : 'Icaro'}
										</span>{' '}
										{fechaParseada}
									</MessageData>
									<br />
									<p>
										{msg.preguntaEstudiante
											? msg.preguntaEstudiante
											: msg.respuestaIcaro}
									</p>
								</Message>
							);
						})}
				</MessagesConainer>
				<StyledForm mobile={mobile}>
					<FormLabel mobile={mobile} htmlFor='question'>
						Mensaje
						<TextareaAutosize
							onChange={handleInputChange}
							name='question'
							maxRows={3}
							minRows={3}
							style={{ width: '96%', padding: '2%' }}
							className='styled-text-area'
							value={question}
						/>
					</FormLabel>
					<EnviaBttn
						disabled={question === '' ? true : false}
						fontFamily='Montserrat, sans-serif'
						fontSize={mobile ? '1rem' : '1.18rem'}
						width={mobile ? '100%' : '58%'}
						margin={mobile ? '30px 0 0 0' : '20px 21%'}
						padding={mobile ? '10px' : '16px'}
						backgroundColor={theme.color.darkBlue}
						onClick={handleSubmit}
					/>
				</StyledForm>
			</ModalContainer>
		</MainContainer>
	);
};

export default ModalChat;

const MainContainer = styled.div`
	position: fixed;
	z-index: ${theme.zIndex.modals};
	height: 100%;
	width: 100%;
	background-color: #00000080;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: start;
`;

const ModalContainer = styled.div`
	margin: ${({ mobile }) => (mobile ? '0' : '5% 0 0 0')};
	width: ${({ mobile }) => (mobile ? '100%' : '35rem')};
	height: ${({ mobile }) => (mobile ? '100%' : null)};
	padding: ${({ mobile }) => (mobile ? '0' : '2rem 0')};
	background: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
`;

const OptionButtons = styled.div`
	align-self: flex-end;
	margin-right: 1.75rem;
	display: flex;
	column-gap: 1rem;
	> * {
		cursor: pointer;
	}
`;

const MessagesConainer = styled.div`
	height: 22.5rem;
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
	background-color: ${theme.color.lightGrey};
	border-radius: 25px;
	word-wrap: break-word;
	font-family: ${theme.fontFamily.primary};
	font-size: 1rem;

	::after {
		content: '';
		position: relative;
		width: 0;
		height: 0;
		border-bottom: 17px solid ${theme.color.lightGrey};
		border-left: 16px solid transparent;
		border-right: 16px solid transparent;
		bottom: 6px;
		left: ${({ isIcaro }) => (isIcaro ? '445px' : '-31px')};
	}

	p {
		margin: 0.5rem 0 0 0;
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
