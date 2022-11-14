import Banners from '../../Components/Banners/index';
import CursosCards from '../../Components/CursosCards';
import { Helmet } from 'react-helmet';
import MainCarousel from '../../Components/MainCarousel/index';
import QuienesSomos from '../../Components/QuienesSomos/index';
import Sponsors from '../../Components/Sponsors/index';
import { projectContext } from '../../Context/ProjectContext';
import styled from 'styled-components';
import { useContext } from 'react';

const HomeContainer = ({ setIsLoginOpen, loggedUser }) => {
	const { isLogin, setIsLogin } = useContext(projectContext);

	return (
		<>
			<Helmet>
				<title>ICARO</title>
				<link rel='canonical' href='http://icaro.org.ar' />
				<meta
					name='description'
					content='Cursos online en vivo con Certificación Universitaria de Desarrollo Web, Datos, Ambiente, Calidad y mucho más. ¡Da un salto en tu carrera junto a ICARO!'
				/>
				<meta
					name='keywords'
					content='Icaro, cursos, diplomaturas, UNC, tecnología, online, certificación, universitaria, educación a distancia, UNC, universidad, Córdoba, Argentina'
				/>
			</Helmet>

			{isLogin ? (
				<Container>
					<div className='sesion'>
						<p>Estás logueado</p>
						<button className='boton' onClick={() => setIsLogin(false)}>
							Cerrar
						</button>
					</div>
				</Container>
			) : (
				<>
					<MainCarousel
						setIsLoginOpen={setIsLoginOpen}
						loggedUser={loggedUser}
					/>
					<Sponsors />
					<Container>
						<CursosCards />
						<CursosCards isProximos />
						<QuienesSomos />
					</Container>
					<Banners />
				</>
			)}
		</>
	);
};

export default HomeContainer;

const Container = styled.div`
	height: auto;

	.sesion {
		margin-top: 30%;
	}
`;
