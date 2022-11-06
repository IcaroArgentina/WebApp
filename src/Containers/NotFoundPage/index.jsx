import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useIsCompact, useIsMobile } from '../../Hooks/Client';

import { projectContext } from '../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../Theme/base';

const NotFoundPage = () => {
	const { setIs404 } = useContext(projectContext);
	const mobile = useIsMobile();
	const compact = useIsCompact();

	const location = useLocation();

	
	useEffect(() => {
		setIs404(location.pathname);
	}, []);// eslint-disable-line

	return (
		<NotFoundPageContainer compact={compact} mobile={mobile}>
			<div>
				<p>¡Ups!</p>
				<p>
					Esta página no se encuentra dentro de
					<br />
					nuestro rango.
					{mobile ? null : <br />}
					<br />
					Diculpá las molestias
				</p>
				<Link onClick={() => setIs404(false)} to='/'>
					Volver al inicio
				</Link>
			</div>

			<div>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/alerts%2F404.png?alt=media&token=ffbdc0b5-75ca-41a6-879c-c6be61749905'
					alt='Esta página no se encuentra dentro de nuestro rango'
				/>
			</div>
		</NotFoundPageContainer>
	);
};

const NotFoundPageContainer = styled.div`
	width: 90%;
	height: 100vh;
	margin: 0 auto;
	max-width: 1095px;
	background-color: ${theme.color.white};
	display: flex;
	flex-direction: ${({ mobile, compact }) =>
		mobile ? 'column-reverse' : compact ? 'column-reverse' : 'row'};
	justify-content: ${({ mobile, compact }) =>
		mobile ? 'center' : compact ? 'center' : 'space-between'};

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	div:nth-child(1) {
		p:nth-child(1) {
			text-align: ${({ mobile, compact }) =>
				mobile ? 'center' : compact ? 'center' : null};
			width: 100%;
			margin: 0;
			margin-bottom: ${({ mobile, compact }) =>
				mobile ? '1.8rem' : compact ? '1.8rem' : null};
			font-family: 'Montserrat', sans-serif;
			font-weight: 900;
			font-size: ${({ mobile, compact }) =>
				mobile ? '3.12rem' : compact ? '4.5rem' : '6.25rem'};
			line-height: ${({ mobile, compact }) =>
				mobile ? '3rem' : compact ? '5rem' : '7rem'};
			color: #363636;
		}
		p:nth-child(2) {
			width: 100%;
			text-align: ${({ mobile, compact }) =>
				mobile ? 'center' : compact ? 'center' : null};
			font-family: 'Montserrat', sans-serif;
			font-weight: 500;
			font-size: ${({ mobile, compact }) =>
				mobile ? '0.8rem' : compact ? '1rem' : '1.5rem'};
			line-height: ${({ mobile }) => (mobile ? '1.1rem' : '1.5rem')};
			color: #363636;
			margin-bottom: ${({ mobile }) => (mobile ? '1.8rem' : null)};
		}
		a {
			align-self: ${({ mobile, compact }) =>
				mobile ? 'center' : compact ? 'center' : 'flex-start'};
			background: #1744ff;
			font-family: 'Montserrat', sans-serif;
			text-decoration: none;
			font-weight: ${({ mobile }) => (mobile ? '400' : '700')};
			font-size: ${({ mobile, compact }) =>
				mobile ? '1.18rem' : compact ? '1rem' : '1.37rem'};
			line-height: 1.62rem;
			text-align: center;
			color: #ffffff;
			margin-top: 0.5rem;
			margin-bottom: ${({ compact }) => (compact ? '1.8rem' : null)};
			padding: 1rem 4.21rem;
		}
	}

	div:nth-child(2) {
		img {
			width: ${({ mobile, compact }) =>
				mobile ? '79%' : compact ? '23rem' : '38rem'};
		}
	}
`;

export default NotFoundPage;
