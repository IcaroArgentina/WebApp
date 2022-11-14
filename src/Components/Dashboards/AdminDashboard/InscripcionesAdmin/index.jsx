import { Link, useNavigate } from 'react-router-dom';

import EditIcon from '../../../Shared/Icons/EditIcon';
import { INSCRIPCIONESROWS } from '../../../../Constants/Inscripciones';
import Spacer from '../../../Shared/Spacer';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const InscripcionesAdmin = ({ usuariosList, inscripcionesList }) => {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/admin/new/inscripcion', { replace: false });
	}

	return (
		<div>
			<TitleContainer>
				<Title>Listado de Inscripciones</Title>
				<Spacer height={70} />
				<NewCourseButton onClick={handleClick}>
					+ Nueva Inscripcion
				</NewCourseButton>
			</TitleContainer>
			<TableContent>
				<TableHeader>
					{INSCRIPCIONESROWS.map((elem, index) => (
						<TableColumn key={`${elem.index}${elem.id}${index}`} isHeader>
							{elem.nombre}
						</TableColumn>
					))}
				</TableHeader>
				{inscripcionesList.length > 0 ? (
					inscripcionesList.map((el, index) => {
						const user = usuariosList.find((e) => e.uuid === el.userUid);
						return (
							<TableRow key={`${el.id}${index}`}>
								<TableColumn>{index + 1}</TableColumn>
								<TableColumn>
									{user.name} {user.lastname}
								</TableColumn>
								<TableColumn>{el.inscripcionCurso}</TableColumn>
								<TableColumn>{el.inscripcionComision}</TableColumn>
								<TableColumn
									bgcolor={
										el.estadoInscripcion === 'Pendiente'
											? theme.categories.dipYProgEsp
											: el.estadoInscripcion === 'Rechazada'
											? theme.color.redError
											: theme.color.successGreen
									}>
									{el.estadoInscripcion}
								</TableColumn>
								<TableColumn isEditDelete>
									<EditContainer to={`/admin/edit/inscripcion/${el.id}`}>
										<EditIcon />
									</EditContainer>
								</TableColumn>
							</TableRow>
						);
					})
				) : (
					<p>No tienes inscripciones por atender</p>
				)}
			</TableContent>
			<Spacer height={100} />
		</div>
	);
};

const TitleContainer = styled.div`
	display: flex;
	width: 85%;
	margin: auto;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h3`
	font-family: ${({ mobile }) =>
		mobile ? null : `${theme.fontFamily.primary}`};
	margin: 0;
	font-weight: 700;
	font-size: ${({ mobile }) => (mobile ? null : '1.25rem')};
	line-height: 24px;
	color: #29343e;
`;

const NewCourseButton = styled.button`
	background-color: ${theme.color.darkBlue};
	color: ${theme.color.white};
	padding: 10px 25px;
	border-radius: 10px;
	border: 1px solid ${theme.color.darkBlue};
	cursor: pointer;
	margin: 10px;
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 24px;
	text-align: center;
`;
const TableContent = styled.div`
	padding: 10px 20px;
`;
const TableHeader = styled.header`
	display: flex;
	gap: 10px;
	text-align: left;
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.darkGrey};
`;
const TableRow = styled.div`
	display: flex;
	text-align: left;
	gap: 10px;
	padding: 10px 0;
	${({ isHidden }) => isHidden && `background-color: #757575; `}

	:hover {
		background-color: ${({ isHidden }) => !isHidden && ' #f1f1f1'};
		cursor: pointer;
	}
`;
const TableColumn = styled.div`
	flex: 1;
	word-break: break-word;
	max-width: 200px;

	${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
	background-color: ${({ bgcolor }) => bgcolor && bgcolor};
	color: ${({ bgcolor }) => bgcolor && theme.color.white};
	${({ isEditDelete }) =>
		isEditDelete && 'display: flex; justify-content: space-evenly'};
	text-align: center;
`;
const EditContainer = styled(Link)`
	text-decoration: none;
	color: ${theme.color.darkGrey};
`;

export default InscripcionesAdmin;
