import React, { useContext, useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
	errorToast,
	successToast,
} from './../../../Shared/Toasts/ToastList/index';

import AlertIcon from './../../../Shared/Icons/AlertIcon/index';
import BlueButton from '../../../Shared/Buttons/BlueButton';
import LinearBttn from '../../../Shared/Buttons/LinearBttn';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../../Context/UserContext';

const UserProfile = () => {
	const mobile = useIsMobile();
	const { currentUser } = useContext(userContext);
	const [userData, setUserData] = useState({});
	const [phone, setPhone] = useState('');
	const [error, setError] = useState(false);
	const { toastList, setToastList, usuariosList } = useContext(projectContext);
	const navigate = useNavigate();

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
		setToastList([...toastList, selectedToast]);
	}

	function handleClose() {
		navigate('/user', { replace: true });
	}

	useEffect(() => {
		const loggedUser = usuariosList.find(
			(user) => user.email === currentUser.email
		);
		setUserData(loggedUser);
		setPhone(loggedUser.phonenumber);
	}, [usuariosList, currentUser]);

	const handleChange = (e) => {
		setPhone(e.target.value);
	};

	const handleBlur = (e) => {
		if (isNaN(e.target.value)) {
			setError(true);
		} else {
			if (e.target.value.length < 9) {
				setError(true);
			} else {
				setError(false);
			}
		}
	};

	const handleSaveData = () => {
		const ref = doc(db, `Usuarios/${currentUser.uid}`);
		updateDoc(ref, { phonenumber: phone });
		showToast('success', 'Los datos se guardaron correctamente');
		setTimeout(() => setToastList([]), 1000);
	};

	return (
		<Container>
			<TitleContainer mobile={mobile}>
				<Title mobile={mobile}>Mi perfil</Title>
			</TitleContainer>

			<FormContainer>
				<FieldContainer>
					<FormField>
						<FormLabel htmlFor='name'>Nombre</FormLabel>

						<FormInput
							type='text'
							name='name'
							defaultValue={userData && userData.name}
							disabled
						/>
					</FormField>
					<FormField>
						<FormLabel htmlFor='name'>Apellido</FormLabel>

						<FormInput
							type='text'
							name='name'
							defaultValue={userData && userData.lastname}
							disabled
						/>
					</FormField>
					<FormField>
						<FormLabel htmlFor='name'>Mail</FormLabel>

						<FormInput
							type='text'
							name='name'
							defaultValue={userData && userData.email}
							disabled
						/>
					</FormField>
					<FormField>
						<FormLabel htmlFor='name'>
							Teléfono
							{error && (
								<span className='error'>
									<AlertIcon className='icon' /> Número inválido
								</span>
							)}
						</FormLabel>

						<FormInput
							type='text'
							name='name'
							value={phone}
							maxLength={10}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</FormField>

					<FormField>
						<FormLabel htmlFor='dni'>DNI</FormLabel>

						<FormInput
							type='text'
							name='dni'
							defaultValue={userData && userData.dni}
							disabled
						/>
					</FormField>
				</FieldContainer>

				<SubmitContainer mobile={mobile}>
					<LinearBttn mobile={mobile} type='cancel' onClick={handleClose}>
						Cancelar
					</LinearBttn>
					<BlueButton
						fontSize={mobile ? '10px' : '16px'}
						alignSelf='flex-end'
						padding='0.5rem 3.8rem'
						borderRadius='10px'
						disabled={error ? true : false}
						onClick={handleSaveData}>
						Guardar
					</BlueButton>
				</SubmitContainer>
			</FormContainer>
		</Container>
	);
};

export default UserProfile;

const Container = styled.div`
	width: 100%;
	padding: 0;
	margin: 10% auto;
	background: #ffffff;
	box-shadow: 0px 0px 10px #dadada;
	border-radius: 5px;
`;

const TitleContainer = styled.div`
	display: ${({ mobile }) => (mobile ? null : 'flex')};
	flex-direction: ${({ mobile }) => (mobile ? null : 'row')};
	justify-content: ${({ mobile }) => (mobile ? null : 'space-between')};
	align-items: center;
	padding: 1.25rem 0 1.25rem 0;
	margin: 0 1.87rem;
`;
const Title = styled.h5`
	font-family: ${({ mobile }) =>
		mobile ? null : `${theme.fontFamily.primary}`};
	margin: 0;
	font-weight: 700;
	font-size: ${({ mobile }) => (mobile ? null : '1.25rem')};
	line-height: 24px;
	color: #29343e;
`;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	margin: 0.65rem 1.87rem 0 1.87rem;
`;
const FieldContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;
	row-gap: 2rem;
`;
const FormField = styled.div`
	height: 4.25rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	width: 300px;
`;

const FormLabel = styled.label`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.25rem;
	color: #29343e;
	.error {
		margin-left: 2%;
		color: ${theme.color.alertIcon};
	}
`;

const FormInput = styled.input`
	box-sizing: border-box;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.25rem;
	color: #29343e;
	border: 1px solid #a8a8a8;
	box-sizing: border-box;
	padding: 0.5rem 0 0.5rem 0.6rem;
`;

const SubmitContainer = styled.div`
	justify-content: flex-end;
	width: ${({ mobile }) => (mobile ? '100%' : '500px')};
	margin: 20px auto;
	display: flex;
	flex-direction: row;
	gap: 20px;
`;
