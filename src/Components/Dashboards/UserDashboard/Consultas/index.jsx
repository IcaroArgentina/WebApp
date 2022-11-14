import React, { useContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';

import AddButton from '../../../Shared/Buttons/AddButton';
import { AiOutlineMail } from 'react-icons/ai';
import ConfirmationModal from '../../../Shared/Modals/ConfirmationModal';
import Loader from '../../../Shared/Loader';
import ModalChat from './ModalChat';
import ModalConsulta from './ModalConsulta';
import NoMessages from '../../../NoMessages/index';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';
import { userContext } from '../../../../Context/UserContext';

const Consultas = ({ loggedUser }) => {
	const { currentUser } = useContext(userContext);
	const mobile = useIsMobile();
	const [modalOpen, setModalOpen] = useState(false);
	const [chatModalOpen, setChatModalOpen] = useState(false);
	const [consultas, setConsultas] = useState();
	const [currentConsultaId, setCurrentConsultaId] = useState(null);
	const [confirm, setConfirm] = useState(false);
	const modalEvent = () => setModalOpen(true);
	const [pending, setPending] = useState(true);
	const hidden = consultas?.filter((msg) => msg.isDeleted === true).length;
	const { toastList, setToastList } = useContext(projectContext);

	useEffect(() => {
		if (currentUser) {
			onSnapshot(
				collection(db, 'Consultas'),
				(snapshot) =>
					setConsultas(
						snapshot.docs
							.map((doc) => ({ ...doc.data(), id: doc.id }))
							.filter((e) => e.userUid === currentUser.uid)
					),

				(error) => console.log('error', error)
			);

			setPending(false);
		}
	}, [currentUser]);

	const markAsRead = async (id, currentConsulta, msg) => {
		const currentLength = currentConsulta.mensajes.length - 1;
		const msgs = currentConsulta.mensajes.slice(0, currentLength);

		const readMsg = {
			date: msg.date,
			hour: msg.hour,
			respuestaIcaro: msg.respuestaIcaro,
			read: true,
		};
		const ref = doc(db, 'Consultas', id);

		await updateDoc(ref, { mensajes: [...msgs, readMsg] });
	};

	const handleMessageClick = (id, currentConsulta, msg) => {
		setCurrentConsultaId(id);
		setChatModalOpen(true);
		msg.respuestaIcaro && markAsRead(id, currentConsulta, msg);
	};

	const handleCancel = () => setConfirm(false);

	const handleConfirm = () => {
		const ref = doc(db, 'Consultas', currentConsultaId);

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

		updateDoc(ref, { isDeleted: true });
		showToast('success', 'La consulta se eliminó correctamente correctamente');
		setTimeout(() => setToastList([]), 1000);
	};

	return (
		<ConsultasMainContainer mobile={mobile}>
			<TitleContainer mobile={mobile}>
				<Title mobile={mobile}>Consultas</Title>
				<AddButton alt='Nueva Consulta' clickEvent={modalEvent} />
			</TitleContainer>
			<MessageContainer mobile={mobile}>
				{pending || !consultas ? (
					<Loader />
				) : consultas.length === 0 || consultas.length === hidden.length ? (
					<NoMessages />
				) : (
					<>
						{consultas.map((item, index) => {
							const lastMsg = item?.mensajes[item.mensajes.length - 1];

							const secundaryLines = lastMsg.preguntaEstudiante
								? lastMsg.preguntaEstudiante.slice(0, 70)
								: lastMsg.respuestaIcaro.slice(0, 70);

							return (
								!item?.isDeleted && (
									<Message
										isRead={lastMsg.read}
										respuestaIcaro={lastMsg.respuestaIcaro}
										mobile={mobile}
										key={index}
										onClick={() => handleMessageClick(item.id, item, lastMsg)}>
										<AiOutlineMail style={{ marginRight: 13 }} size={18.5} />

										<p>
											<span>{item.motivo}</span> <br />
											{secundaryLines}
											{secundaryLines.length > 68 && ' ...'}
										</p>
									</Message>
								)
							);
						})}
					</>
				)}
			</MessageContainer>
			{chatModalOpen && (
				<ModalChat
					currentConsultaId={currentConsultaId}
					setChatModalOpen={setChatModalOpen}
					loggedUser={loggedUser}
					confirm={setConfirm}
				/>
			)}
			{modalOpen && (
				<ModalConsulta loggedUser={loggedUser} setModalOpen={setModalOpen} />
			)}
			{confirm && (
				<ConfirmationModal
					modalIsOpen={true}
					closeModal={handleCancel}
					modalTitle='Eliminar mensajes'
					cancelButtonContent='Cancelar'
					confirmButtonContent='Confirmar'
					confirmButtonSubmit={handleConfirm}
					withCloseButton={true}
					mainColor={theme.color.darkBlue}>
					<ModalText confirm={true}>
						¿Estás seguro de que deseas eliminar la consulta?
					</ModalText>
				</ConfirmationModal>
			)}
		</ConsultasMainContainer>
	);
};

export default Consultas;

const ConsultasMainContainer = styled.div`
	width: ${({ mobile }) => (mobile ? '100%' : '35%')};
	height: ${({ mobile }) => (mobile ? '20rem' : '25.93rem')};
	background: #ffffff;
	box-shadow: 0px 0px 10px #dadada;
	border-radius: 5px;
	margin-bottom: ${({ mobile }) => mobile && '2.5rem'};
`;

const TitleContainer = styled.div`
	display: ${({ mobile }) => (mobile ? 'flex' : 'flex')};
	flex-direction: ${({ mobile }) => (mobile ? 'row' : 'row')};
	justify-content: ${({ mobile }) =>
		mobile ? 'space-between' : 'space-between'};
	align-items: center;
	padding: 1.25rem 0 1.5rem 0;
	margin: 0 1.87rem;
`;
const Title = styled.h5`
	font-family: ${theme.fontFamily.primary};
	margin: 0;
	font-weight: 700;
	font-size: ${({ mobile }) => (mobile ? '1rem' : '1.25rem')};
	line-height: ${({ mobile }) => (mobile ? '1.25rem' : '1.5rem')};
	color: #29343e;
`;
const MessageContainer = styled.div`
	height: 80%;
	overflow-y: scroll;

	${({ mobile }) =>
		!mobile &&
		`::-webkit-scrollbar {
		display:none;
	}`};
`;
const Message = styled.div`
	background-color: ${({ isRead, respuestaIcaro }) =>
		!isRead && respuestaIcaro ? theme.color.grey2 : theme.color.white};
	height: ${({ mobile }) => (mobile ? '26%' : '21%')};
	border-top: 1px solid ${theme.color.lightGrey};
	display: flex;
	flex-direction: row;
	cursor: pointer;
	padding: 0.5rem 0.8rem 0 1.5rem;
	font-family: ${theme.fontFamily.primary};
	line-height: 1.2rem;
	color: ${theme.color.grey};
	overflow: hidden;

	p {
		font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1rem')};
		height: 85%;
		flex: 1;
		margin: 0;
		padding: 0;
		overflow-y: hidden;
		overflow-x: hidden;
		word-wrap: break-word;
		white-space: initial;
		text-overflow: ellipsis;
	}
	span {
		font-weight: 600;
		padding: 0;
		white-space: nowrap;
	}
`;

const ModalText = styled.span`
	text-align: center;
	font-family: ${theme.fontFamily.primary};
`;
