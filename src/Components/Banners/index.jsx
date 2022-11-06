import EnsenaConIcaroModal from '../Shared/Modals/EnsenaConIcaroModal';
import IcaroInCompanyModal from '../Shared/Modals/IcaroInCompanyModal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../Theme/base';
import { useIsMobile } from '../../Hooks/Client';
import { useState } from 'react';

const Banners = () => {
	const mobile = useIsMobile();
	const [ensenaModalIsOpen, setEnsenaModalIsOpen] = useState(false);
	const [inCompanyModalIsOpen, setInCompanyModalIsOpen] = useState(false);

	function closeModal() {
		setEnsenaModalIsOpen(false);
		setInCompanyModalIsOpen(false);
	}

	return (
		<Container mobile={mobile}>
			<div className='banner1' onClick={setEnsenaModalIsOpen}>
				<StyledLink to='/'>
					<h2>Enseñá con ICARO</h2>
				</StyledLink>
			</div>
			<div className='banner2' onClick={setInCompanyModalIsOpen}>
				<StyledLink to='/'>
					<h2>ICARO in company</h2>
				</StyledLink>
			</div>
			<EnsenaConIcaroModal
				modalIsOpen={ensenaModalIsOpen}
				closeModal={closeModal}
			/>
			<IcaroInCompanyModal
				modalIsOpen={inCompanyModalIsOpen}
				closeModal={closeModal}
			/>
		</Container>
	);
};

export default Banners;

const Container = styled.div`
	display: flex;
	flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
	justify-content: center;
	margin: 0 auto 0 auto;
	width: 100%;
	cursor: pointer;

	.banner1 {
		width: ${({ mobile }) => (mobile ? '100%' : '50%')};
		position: relative;
		background: rgba(54, 54, 54);
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			background: black;
		}

		h2 {
			font-family: 'Montserrat', sans-serif !important;
			position: relative;
			z-index: ${theme.zIndex.banners};
			width: 65%;
			color: white;
			font-weight: 900;
			font-size: 2.5rem;
			line-height: 2.5rem;
			text-align: center;
			margin: 24% auto 24% auto;
		}
	}
	.banner1:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: ${theme.zIndex.banners};
		opacity: 0.6;
		background-image: url('https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/banner1.png?alt=media&token=1c123642-94bd-4747-ad74-180edc927f58');
		background-position: center;
		background-size: cover;
	}

	.banner2 {
		width: ${({ mobile }) => (mobile ? '100%' : '50%')};
		position: relative;

		background: rgba(54, 54, 54);
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			background: black;
		}

		h2 {
			font-family: 'Montserrat', sans-serif !important;
			position: relative;
			${theme.zIndex.banners};
			width: 50%;
			color: white;
			font-weight: 900;
			font-size: 40px;
			line-height: 40px;
			text-align: center;
			margin: 24% auto 24% auto;
		}
	}
	.banner2:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		${theme.zIndex.banners};
		opacity: 0.6;
		background-image: url('https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/banner2.png?alt=media&token=fa58d4ef-9dad-4ea9-bf3b-ab1ac24765cf');
		background-position: center;
		background-size: cover;
	}
`;
const StyledLink = styled(Link)`
	text-decoration: none !important;
`;
