import React, { useContext, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import BlueButton from './../../../../Shared/Buttons/BlueButton/index';
import EnviaBttn from '../../../../Shared/Buttons/EnviaBttn';
import Loader from '../../../../Shared/Loader';
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from 'react-icons/vsc';
import db from '../../../../../Firebase/index';
import styled from 'styled-components';
import theme from '../../../../../Theme/base';
import { useIsMobile } from '../../../../../Hooks/Client';
import { userContext } from '../../../../../Context/UserContext';

const ModalConsulta = ({ setModalOpen }) => {
	const { currentUser } = useContext(userContext);
	const [pending, setPending] = useState(false);
	const [reason, setReason] = useState('');
	const [question, setQuestion] = useState('');
	const mobile = useIsMobile();

	const handleInputChange = (e) => {
		const text = e.target.value;
		const type = e.target.name;

		if (type === 'question') setQuestion(text);
		if (type === 'reason') setReason(text);
	};

	const handleSubmit = () => {
		const ref = collection(db, 'Consultas');
		const date = Date.now();

		addDoc(ref, {
			userUid: currentUser.uid,
			motivo: reason,
			mensajes: [
				{
					date: new Date(date).toLocaleDateString(),
					hour: new Date(date).toLocaleTimeString(),
					preguntaEstudiante: question,
					read: false,
				},
			],
			isDeleted: false,
		});
		setPending(true);
		setTimeout(() => {
			setPending(false);
			setModalOpen(false);
		}, 1500);
	};
	return (
		<MainContainer>
			<ModalContainer mobile={mobile}>
				<HeaderTitle mobile={mobile}>
					<CloseButton onClick={() => setModalOpen(false)}>
						<VscClose size={mobile ? 25 : 30} />
					</CloseButton>
					<Title>Nueva Consulta</Title>

					<Parragraph mobile={mobile}>
						Escríbenos y nos contactaremos para brindarte toda la información
						que necesites.
					</Parragraph>
				</HeaderTitle>

				<StyledForm mobile={mobile}>
					<FormLabel mobile={mobile} htmlFor='reason'>
						Motivo
						<FormInput
							onChange={handleInputChange}
							id='reason'
							name='reason'
							type='text'
							maxLength={45}
						/>
					</FormLabel>
					<FormLabel mobile={mobile} htmlFor='question'>
						Mensaje
						<TextareaAutosize
							onChange={handleInputChange}
							name='question'
							minRows={10}
							maxRows={10}
							className='styled-text-area'
						/>
					</FormLabel>

					{pending ? (
						<BlueButton
							width={mobile ? '100%' : '58%'}
							margin={mobile ? '30px 0 0 0' : '20px 21%'}
							padding='0 16px'
							disabled={true}>
							<Loader size={20} marginVertical={9.5} border={2} flex={true} />
						</BlueButton>
					) : (
						<EnviaBttn
							fontFamily='Montserrat, sans-serif'
							fontSize='1.18rem'
							width={mobile ? '100%' : '58%'}
							margin={mobile ? '30px 0 0 0' : '20px 21%'}
							padding='16px'
							backgroundColor={theme.color.darkBlue}
							onClick={handleSubmit}
							disabled={question === '' || reason === '' ? true : false}
						/>
					)}
				</StyledForm>
			</ModalContainer>
		</MainContainer>
	);
};

export default ModalConsulta;

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
	height: ${({ mobile }) => (mobile ? '100%' : '66%')};
	padding: ${({ mobile }) => (mobile ? '0' : '2rem 0')};
	background: white;
	border-radius: ${({ mobile }) => (mobile ? '0' : '0 0 10px 10px')};
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

const HeaderTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	margin: ${({ mobile }) => (mobile ? '1.5rem auto 0 auto' : 'auto')};
`;

const Title = styled.h3`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	margin: 1rem 0 0 0;
	color: #1744ff;
`;
const CloseButton = styled.div`
	align-self: flex-end;
	cursor: pointer;
`;

const Parragraph = styled.div`
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
	width: ${({ mobile }) => (mobile ? '75%' : ' 90%')};
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
		border: 1px solid #e6e6e6;
		resize: none;
		margin-top: 20px;
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
		border: 1px solid ${theme.color.darkBlue};
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
