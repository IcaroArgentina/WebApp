import {  useState } from 'react';

import ModalCertificado from './ModalCertificado';
import StyledButton from '../../../Shared/Buttons/StyledButton';
import styled from 'styled-components';
import theme from './../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const Certificados = ({ currentUser, loggedUser }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const modalEvent = () => setModalOpen(true);

	const mobile = useIsMobile();

	return (
		<CertificadosMainContainer mobile={mobile}>
			<BannerContainer>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/certificadosBanner.png?alt=media&token=38ae4bec-354f-4b19-bd64-d58a570757a7'
					alt='Imagen representativa de la sección certificados'
				/>
			</BannerContainer>
			<Container>
				<ContainerTitle>
					¿Sos estudiante de la UNC o de la UTN FR Córdoba?
				</ContainerTitle>
				<ContainerParagraph>
					Cargá aquí tu certificado de alumno regular y aprovecha nuestros
					descuentos especiales!
				</ContainerParagraph>

				<StyledButton
					onClickEvent={modalEvent}
					text='Cargar certificado'
					width='100%'
					borderRadius='10px'
					padding='0.75rem 0'
				/>
			</Container>

			{modalOpen && (
				<ModalCertificado
					setModalOpen={setModalOpen}
					currentUser={currentUser}
					loggedUser={loggedUser}
				/>
			)}
		</CertificadosMainContainer>
	);
};

export default Certificados;

const CertificadosMainContainer = styled.div`
	width: ${({ mobile }) => (mobile ? '100%' : '33%')};
	height: 25.93rem;
	background: #ffffff;
	box-shadow: 0px 0px 10px #dadada;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
`;

const BannerContainer = styled.div`
	img {
		width: 100%;
	}
`;

const Container = styled.div`
	flex: 1;
	width: 77.5%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ContainerTitle = styled.h5`
	font-family: ${theme.fontFamily.primary};
	font-size: ${({ mobile }) => (mobile ? null : '1rem')};
	font-weight: ${({ mobile }) => (mobile ? null : '600')};
	line-height: ${({ mobile }) => (mobile ? null : '1.25rem')};
	margin: ${({ mobile }) => (mobile ? null : '0 0 1.2rem 0')};
	text-align: center;
	color: #363636;
`;
const ContainerParagraph = styled.p`
	font-family: ${theme.fontFamily.primary};
	font-size: ${({ mobile }) => (mobile ? null : '1rem')};
	font-weight: ${({ mobile }) => (mobile ? null : '400')};
	line-height: ${({ mobile }) => (mobile ? null : '1.25rem')};
	margin: ${({ mobile }) => (mobile ? null : '0 0 1.2rem 0')};
	text-align: center;
	color: #363636;
`;
