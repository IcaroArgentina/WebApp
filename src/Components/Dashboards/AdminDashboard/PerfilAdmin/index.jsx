import { doc, updateDoc } from 'firebase/firestore';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';
import { useContext, useEffect, useState } from 'react';

import { ADMINPERFIL } from '../../../../Constants/Perfil';
import BlueButton from '../../../Shared/Buttons/BlueButton';
import LinearBttn from '../../../Shared/Buttons/LinearBttn';
import Loader from '../../../Shared/Loader';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../../Context/UserContext';

const PerfilAdmin = ({ handleClick, toggleState }) => {
	const mobile = useIsMobile();
	const { currentUser } = useContext(userContext);
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();
	const [newData, setNewData] = useState({});
	const [disabledButton, setDisabledButton] = useState(true);
	const [updateLoading, setUpdateLoading] = useState(false);
	const { toastList, setToastList, usuariosList } = useContext(projectContext);

	useEffect(() => {
		const loggedUser = usuariosList.find(
			(user) => user.email === currentUser.email
		);
		setUserData(loggedUser);
	}, [usuariosList, currentUser]);

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

	useEffect(() => {
		Object.values(newData).length > 0
			? setDisabledButton(false)
			: setDisabledButton(true);
	}, [newData]);

	function handleChange(name, value) {
		setNewData((newData) => ({ ...newData, [name]: value }));
	}

	function handleClose() {
		setNewData({});
		navigate('/admin/', { replace: true });
	}

	function handleSubmit(e) {
		setUpdateLoading(true);
		if (disabledButton) return;
		if (newData) {
			const ref = doc(db, 'Usuarios', currentUser.uid);
			updateDoc(ref, newData);

			showToast('success', 'Se ha modificado el perfil');
		} else {
			showToast('error', 'Ha ocurrido un error');
		}
		setTimeout(() => {
			setUpdateLoading(false);
			handleClose();
		}, 2000);
	}

	if (updateLoading) return <Loader />;

	return (
		<>
			<TitleContainer mobile={mobile}>
				<Title mobile={mobile}>Mi Perfil</Title>
			</TitleContainer>

			<PerfilContainer>
				<StyledForm>
					{ADMINPERFIL.map((elem, index) => {
						return (
							<FormLabel
								key={`${elem.nombre}${elem.id}`}
								htmlFor={elem.nombre}
								elemWidth={elem.width}>
								{index + 1}. {elem.inputLabel}
								{elem.isRequired && (
									<RequiredText>* Campo obligatorio</RequiredText>
								)}
								<FormInput
									hasExtraMargin={!elem.helpText}
									withBorder={elem.type === 'text' || elem.type === 'number'}
									type={elem.type}
									defaultValue={userData[elem.nombre]}
									onChange={(e) => handleChange(elem.nombre, e.target.value)}
									disabled={elem.isDisabled}
								/>
							</FormLabel>
						);
					})}
				</StyledForm>
				<SubmitContainer>
					<LinearBttn type='cancel' onClick={handleClose}>
						Cancelar
					</LinearBttn>
					<BlueButton
						width='100%'
						borderRadius='10px'
						padding='5px 13px'
						backgroundColor={
							disabledButton ? theme.color.disabledBlue : theme.color.darkBlue
						}
						type='submit'
						disabled={disabledButton}
						onClick={(e) => handleSubmit(e)}>
						Guardar
					</BlueButton>
				</SubmitContainer>
			</PerfilContainer>
		</>
	);
};

const PerfilContainer = styled.div`
	width: 90%;
	background: #ffffff;
	margin: auto;

	box-shadow: 0px 0px 10px #dadada;
	border-radius: 5px;
	margin-bottom: 1.3%;
	display: flex;
	flex-direction: column;
	padding: 20px;
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

const StyledForm = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	gap: 30px;
	margin: 0 auto;

	.styled-text-area {
		display: block;
		width: 100%;
		height: 35px !important;
		border: 1px solid #e6e6e6;
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
			border: 2px solid ${theme.color.darkBlue};
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
	width: ${({ elemWidth }) => elemWidth};
	display: block;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.grey};
	margin: 10px 0px;
	text-transform: capitalize;
`;

const RequiredText = styled.p`
	display: inline;
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	color: ${theme.color.redError};
	margin: 10px 0px;
	text-transform: none;
	margin: 0 10px;
`;
const FormInput = styled.input`
	display: block;
	width: 100%;
	height: 30px;
	border: ${({ withBorder }) => withBorder && '1px solid #e6e6e6'};
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	margin-top: ${({ hasExtraMargin }) => (hasExtraMargin ? '26px' : 0)};

	:focus {
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		border: 2px solid ${theme.color.darkBlue};
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

const SubmitContainer = styled.div`
	width: 500px;
	margin: 20px auto;
	display: flex;
	flex-direction: row;
	gap: 20px;
`;

export default PerfilAdmin;
