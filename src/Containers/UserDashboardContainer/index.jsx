import React, { useContext, useEffect, useState } from 'react';

import Certificados from './../../Components/Dashboards/UserDashboard/Certificado/index';
import Consultas from '../../Components/Dashboards/UserDashboard/Consultas';
import CursosInteres from './../../Components/Dashboards/UserDashboard/CursosInteres/index';
import TusCursos from '../../Components/Dashboards/UserDashboard/TusCursos';
import styled from 'styled-components';
import { userContext } from '../../Context/UserContext';

const UserPage = () => {
	const { users, currentUser } = useContext(userContext);
	const [loggedUser, setLoggedUser] = useState(null);
	const [inscribedCourses, setInscribedCourses] = useState([]);

	useEffect(() => {
		const match =
			currentUser && users.find((user) => user.email === currentUser.email);
		match && setLoggedUser(match);
	}, [users, currentUser]);

	return (
		<>
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
