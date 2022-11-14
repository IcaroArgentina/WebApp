import React, { useContext, useEffect, useState } from 'react';

import Certificados from './../../Components/Dashboards/UserDashboard/Certificado/index';
import Consultas from '../../Components/Dashboards/UserDashboard/Consultas';
import CursosInteres from './../../Components/Dashboards/UserDashboard/CursosInteres/index';
import { Helmet } from 'react-helmet';
import TusCursos from '../../Components/Dashboards/UserDashboard/TusCursos';
import { projectContext } from '../../Context/ProjectContext';
import styled from 'styled-components';
import { userContext } from '../../Context/UserContext';

const UserPage = () => {
	const { currentUser } = useContext(userContext);
	const { usuariosList } = useContext(projectContext);
	const [loggedUser, setLoggedUser] = useState(null);
	const [inscribedCourses, setInscribedCourses] = useState([]);

	useEffect(() => {
		const match =
			currentUser &&
			usuariosList.find((user) => user.email === currentUser.email);
		match && setLoggedUser(match);
	}, [usuariosList, currentUser]);

	return (
		<>
			<Helmet>
				<title>ICARO - Panel del estudiante</title>
				<meta name='description' content='Panel del estudiante' />
				<meta
					name='keywords'
					content='Icaro, cursos, displomaturas, UNC, tecnología'
				/>
			</Helmet>

			{loggedUser !== null && (
				<UserMainContainer>
					<TusCursos
						currentUser={currentUser}
						inscribedCourses={inscribedCourses}
						setInscribedCourses={setInscribedCourses}
					/>
					<Consultas loggedUser={loggedUser && loggedUser} />
					<CursosInteres inscribedCourses={inscribedCourses} />
					<Certificados
						currentUser={currentUser}
						loggedUser={loggedUser && loggedUser}
					/>
				</UserMainContainer>
			)}
		</>
	);
};

export default UserPage;

const UserMainContainer = styled.div`
	width: 90%;
	max-width: 1095px;
	background-color: 'white';
	padding: 6.45rem 0 5.2rem 0;
	margin: 0 auto 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1.5%;
`;
