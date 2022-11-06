import React from 'react';
import UserProfile from './../../Components/Dashboards/UserDashboard/UserProfile/index';
import styled from 'styled-components';

const UserProfileContainer = () => {
	return (
		<Container>
			<UserProfile />
		</Container>
	);
};

export default UserProfileContainer;

const Container = styled.div`
	width: 90%;
	max-width: 1095px;
	background-color: 'white';
	padding: 6.45rem 0 9.2% 0;
	margin: 0 auto 0 auto;
`;
