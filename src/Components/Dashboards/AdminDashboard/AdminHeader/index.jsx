import { Link, useNavigate } from 'react-router-dom';

import UserDisplay from '../../../UserDisplay';
import { auth } from '../../../../Firebase';
import { projectContext } from '../../../../Context/ProjectContext';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useContext } from 'react';
import { useState } from 'react';

const AdminHeader = ({ handleClick, toggleState, loggedUser }) => {
	const [isScroll, setIsScroll] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isAdmin } = useContext(projectContext);
	const navigate = useNavigate();

	window.addEventListener('scroll', changeNavColor);

	function handleLogout() {
		signOut(auth);
		setTimeout(() => {
			navigate('/');
		}, 100);
	}

	function changeNavColor() {
		if (window.scrollY >= 85) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	}

	return (
		<>
			{isAdmin && (
				<Container isScroll={isScroll}>
					<HeaderContent>
						<Link to='/' className='logo'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/logo.svg?alt=media&token=b47dccac-e962-48ab-99f1-f3d250f879f5'
								alt='Logo de Ícaro'
							/>
						</Link>
						{loggedUser && (
							<div style={{ width: '200px' }}>
								<UserDisplay
									onClick={handleLogout}
									userName={loggedUser.name}
									userRol={loggedUser.rol}
									isMenuOpen={isMenuOpen}
									setIsMenuOpen={setIsMenuOpen}
								/>
							</div>
						)}
					</HeaderContent>
				</Container>
			)}
		</>
	);
};

export default AdminHeader;

const Container = styled.div`
	font-family: ${theme.fontFamily.primary};
	width: 100%;
	background-color: ${({ isScroll }) =>
		isScroll ? theme.color.darkBlue : theme.color.darkBlue};
	transition: all 0.3s ease-out 0s;
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${theme.zIndex.header};

	.header {
	}

	.logo {
		img {
			object-fit: cover;
		}
	}
	.menu {
		width: 26.71%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		list-style-type: none;
		margin: 0;
		padding: 0;
		width: 300px;
		justify-content: space-between;

		li {
			margin: 0 2.6% 0 0;
		}
		& li:last-child {
			margin: 0;
		}
	}
`;
const HeaderContent = styled.div`
	width: 80%;
	max-width: 1095px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;

	padding: 20px 0;
	margin: auto;
`;
