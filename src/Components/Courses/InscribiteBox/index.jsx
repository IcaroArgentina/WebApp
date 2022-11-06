import { collection, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useGetColors, useIsMobile } from '../../../Hooks/Client';

import InscribirmeModal from '../../Shared/Modals/InscribirmeModal';
import LinearBttn from '../../Shared/Buttons/LinearBttn';
import LogIn from '../../LogIn';
import PreInscribirmeModal from '../../Shared/Modals/PreInscribirmeModal';
import { Timestamp } from 'firebase/firestore';
import db from '../../../Firebase/index';
import { projectContext } from '../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { turnTimestampIntoDate } from '../../../Utils';
import { userContext } from '../../../Context/UserContext';

const InscribiteBox = ({ course }) => {
	const { nextCourses } = useContext(projectContext);
	const { currentUser, users } = useContext(userContext);
	const { CategoriaID } = course;
	const [courseDates, setCoursesDates] = useState([]);
	const mobile = useIsMobile();
	const [preinscripcionModalOpen, setPreinscripcionModalOpen] = useState(false);
	const [inscripcionModalOpen, setInscripcionModalOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [loggedUser, setLoggedUser] = useState(false);
	const [userInfo, setUserInfo] = useState('');
	const [currentInscripcion, setCurrentInscripcion] = useState(null);
	const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false); //eslint-disable-line

	useEffect(() => {
		if (currentUser) {
			onSnapshot(
				collection(db, `Usuarios/${currentUser.uid}/Inscripciones`),
				(snapshot) =>
					setCurrentInscripcion(
						snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
					),
				(error) => console.log('error', error)
			);
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser) {
			const match =
				currentUser && users.find((user) => user.email === currentUser.email);
			match && setUserInfo(match);
			setLoggedUser(true);
		} else {
			setLoggedUser(false);
		}
	}, [users, currentUser]);

	useEffect(() => {
		const date = Timestamp.now().toDate();

		const filteredComision = nextCourses.filter((crs) => {
			return (
				crs.nombreCurso === course.nombre && crs.fechaInicio.toDate() > date
			);
		});

		return setCoursesDates(filteredComision);
	}, [nextCourses, course]);

	function openPreinscripcionModal() {
		setPreinscripcionModalOpen(true);
	}

	function closePreinscripcionModal() {
		setPreinscripcionModalOpen(false);
	}

	function openInscripcionModal() {
		if (loggedUser) {
			setInscripcionModalOpen(true);
		} else {
			setIsLoginOpen(true);
		}
	}

	function closeInscripcionModal() {
		setInscripcionModalOpen(false);
	}

	return (
		<InscribiteBoxContainer mobile={mobile}>
			<TitleBoxContainer mobile={mobile} colorFilter={CategoriaID}>
				<Title mobile={mobile}>Inscribite hoy</Title>
				{courseDates.length > 1 && (
					<>
						<Description mobile={mobile}>12 cuotas sin interés de</Description>
						<Title mobile={mobile}>${courseDates[0]?.precioComision}</Title>
					</>
				)}
			</TitleBoxContainer>
			<IcribiteContent mobile={mobile}>
				{courseDates.length < 1 ? (
					<NoComisionBox>
						<p>
							¡Dejanos tus datos y nos comunicaremos apenas se abra una
							comisión!{' '}
						</p>
						<LinearBttn mobile={mobile} onClick={openPreinscripcionModal}>
							Pre-inscribirme
						</LinearBttn>
					</NoComisionBox>
				) : (
					<TableContent mobile={mobile}>
						<TableHeader mobile={mobile}>
							<TableColumn mobile={mobile} isHeader>
								{mobile ? 'Fecha' : 'Fecha de inicio'}
							</TableColumn>
							{!mobile && (
								<TableColumn mobile={mobile} isHeader>
									Duración
								</TableColumn>
							)}
							<TableColumn mobile={mobile} isHeader>
								Días de cursado
							</TableColumn>
							<TableColumn extraSpace={11}>{''}</TableColumn>
						</TableHeader>
						{courseDates.map((nextCourse, i) => {
							const inicio = turnTimestampIntoDate(nextCourse.fechaInicio);
							const currentComision = currentInscripcion?.filter(
								(com) => nextCourse.uuid === com.inscripcionComision
							);
							return (
								<TableRow mobile={mobile} key={i}>
									<TableColumn mobile={mobile}>{inicio}</TableColumn>
									{!mobile && (
										<TableColumn>{nextCourse.duracionSemanas}</TableColumn>
									)}
									<TableColumn mobile={mobile}>
										{nextCourse.diaDeClases}
									</TableColumn>
									<TableColumn mobile={mobile}>
										{currentComision?.length > 0 &&
										currentComision[0].estadoInscripcion === 'Aprobada' ? (
											'Inscripto'
										) : (
											<LinearBttn
												mobile={mobile}
												onClick={openInscripcionModal}>
												Inscribirme
											</LinearBttn>
										)}
									</TableColumn>
								</TableRow>
							);
						})}
					</TableContent>
				)}
			</IcribiteContent>
			<PreInscribirmeModal
				modalIsOpen={preinscripcionModalOpen}
				closeModal={closePreinscripcionModal}
				cursoInteres={course}
			/>
			<InscribirmeModal
				modalIsOpen={inscripcionModalOpen}
				closeModal={closeInscripcionModal}
				cursoInteres={course}
				comision={courseDates[0]}
				userInfo={{ ...userInfo, uuid: currentUser.uid }}
			/>
			{isLoginOpen && (
				<LogIn
					setIsLoginOpen={setIsLoginOpen}
					isLoginOpen={isLoginOpen}
					setIsPasswordRecoveryOpen={setIsPasswordRecoveryOpen}
				/>
			)}
		</InscribiteBoxContainer>
	);
};

const InscribiteBoxContainer = styled.div`
	${({ mobile }) => mobile && 'width:100%'};
	margin: auto;
	background: #ffffff;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
`;

const TitleBoxContainer = styled.div`
	padding: ${({ mobile }) => (mobile ? '0.5rem' : '1.25rem')};
	border-radius: 10px 10px 0px 0px;
	background: ${({ colorFilter }) => useGetColors(colorFilter)};
	color: ${theme.color.white};
	text-align: center;
`;
const Title = styled.h5`
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: bold;
	font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1.25rem')};
	line-height: 20px;
	color: ${theme.color.white};
	margin: 0px;
`;

const Description = styled.p`
	font-family: ${theme.fontFamily.primary};
	color: ${theme.color.white};
	font-style: normal;
	font-weight: normal;
	font-size: ${({ mobile }) => (mobile ? '0.75rem' : '1rem')};
	line-height: 24px;
	margin: 0px;
`;

const IcribiteContent = styled.div`
	display: block;
`;

const TableContent = styled.div`
	padding: ${({ mobile }) =>
		mobile ? '9px 5px 10px 13px ' : '20px 60px 60px 60px'};
`;
const TableHeader = styled.header`
	display: flex;
	gap: 30px;
	text-align: center;
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: bold;
	font-size: ${({ mobile }) => (mobile ? '10px' : '16px')};
	line-height: 24px;
	color: ${theme.color.darkBlue};
`;
const TableRow = styled.div`
	display: flex;
	text-align: center;
	gap: 30px;
	padding: 10px 0;
	font-size: ${({ mobile }) => mobile && '0.625rem'};
`;
const TableColumn = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ mobile }) => (mobile ? '12px' : '16px')};
	${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
	${({ extraSpace }) => extraSpace && `padding: ${extraSpace}px`}
`;

const NoComisionBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 20px 60px 60px 60px;
`;

export default InscribiteBox;
