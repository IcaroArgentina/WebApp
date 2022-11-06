import { FaRegUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiGraduateCap } from 'react-icons/gi';
import React from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { auth } from '../../Firebase';
import { scrollTo } from '../../Utils';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import theme from '../../Theme/base';

const MenuMobile = ({
	openModal,
	setMobileMenuIsOpen,
	setDisplayUser,
	displayUser,
}) => {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const handleGoToCourses = () => {
		setMobileMenuIsOpen(false);
		scrollTo(location, navigate, '/cursos', 70);
	};
	const handleGoToAboutUs = () => {
		setMobileMenuIsOpen(false);
		scrollTo(location, navigate, '/quienes-somos', 70);
	};

	const handleGoToContact = () => {
		setMobileMenuIsOpen(false);
		openModal();
	};

	const handleCloseModal = () => setMobileMenuIsOpen(false);

	const handleLogOut = () => {
		signOut(auth);
		navigate('/');
		setTimeout(() => {
			setDisplayUser(null);
		}, 1000);
	};

	return (
		<BackgroundMenu onClick={handleCloseModal}>
			<Menu>
				<WelcomeContainer>
					<WelcomeText>¡Bienvenido!</WelcomeText>
					<GoBack onClick={handleCloseModal}>
						<ArrowLeft size={20} />
					</GoBack>
				</WelcomeContainer>
				<OptionContainer>
					{displayUser ? (
						<ul>
							<li>
								<Link to='/user'>
									<RiDashboardLine
										size={24}
										color={theme.color.login}
										style={{ marginRight: 8 }}
									/>
									Dashboard
								</Link>
							</li>
							<li>
								<Link to='/user/profile'>
									<FaRegUser
										size={24}
										color={theme.color.login}
										style={{ marginRight: 8 }}
									/>
									Mi Perfil
								</Link>
							</li>
							<li>
								<Button onClick={handleGoToCourses}>
									<GiGraduateCap
										size={26}
										style={{ marginRight: 6 }}
										color={theme.color.login}
									/>
									Nuestros cursos
								</Button>
							</li>
							<li>
								<Button onClick={handleLogOut}>
									<FaSignOutAlt
										size={24}
										style={{ marginRight: 8 }}
										color={theme.color.login}
									/>
									Cerrar sesión
								</Button>
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<Link to='/'>Inicio</Link>
							</li>
							<li>
								<Button onClick={handleGoToCourses}>Cursos</Button>
							</li>
							<li>
								<Button onClick={handleGoToAboutUs}>Quienes Somos</Button>
							</li>
							<li>
								<Button onClick={handleGoToContact}>Contacto</Button>
							</li>
						</ul>
					)}
				</OptionContainer>
			</Menu>
		</BackgroundMenu>
	);
};

export default MenuMobile;

const BackgroundMenu = styled.div`
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background: rgba(26, 27, 28, 0.502267);
`;

const Menu = styled.div`
	width: 280px;
	height: 295px;
	font-family: ${theme.fontFamily.primary};
`;

const WelcomeContainer = styled.div`
	height: 20%;
	padding: 0 1.62rem 0 2.43rem;
	background: ${theme.color.darkBlue};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const OptionContainer = styled.div`
	height: 80%;
	background: white;
	ul {
		margin: 0;

		padding: 1.25rem 0 0 2.43rem;
		list-style-type: none;

		li {
			margin-bottom: 1.5rem;
			cursor: pointer;

			a {
				text-decoration: none;
				font-weight: 400;
				font-size: 1rem;
				line-height: 1.5rem;
				color: ${theme.color.black};
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
`;
const WelcomeText = styled.span`
	font-weight: 500;
	font-size: 0.8rem;
	line-height: 1.5rem;
	color: #ffffff;
`;
const GoBack = styled.button`
	background-color: transparent;
	border: unset;
`;
const Button = styled.div`
	text-decoration: none;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5rem;
	color: ${theme.color.black};
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ArrowLeft = styled(AiOutlineArrowLeft)`
	color: ${theme.color.white};
	cursor: pointer;
`;
