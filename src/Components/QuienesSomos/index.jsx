import GreyBkgrTop from '../Shared/Backgrounds/TopGrey';
import Sponsors from '../Sponsors';
import styled from 'styled-components';
import theme from '../../Theme/base';
import { useIsMobile } from '../../Hooks/Client';

const QuienesSomos = () => {
	const mobile = useIsMobile();

	return (
		<GreyBkgrTop height={1000}>
			<Container mobile={mobile}>
				<div className='padre' id='quienes-somos'>
					<h3 className='titulo'>Quiénes Somos</h3>
					<p className='parrafo'>
						Somos un equipo de profesionales con un objetivo en común: facilitar
						el acceso a una educación de calidad para democratizar hoy, el
						conocimiento del mañana.
						<br />
						Trabajamos junto a jóvenes, profesionales, instituciones y empresas
						que compartan nuestros valores centrales. Entre nuestras
						actividades, ofrecemos una amplia variedad de capacitaciones en
						temáticas de vanguardia, pensadas y dictadas por profesionales que
						saben hacer, y enseñar.
						<br />
						<span>Encontrá en ICARO</span> la oportunidad de aprender como nunca
						antes lo habías hecho. Donde quiera que estés, te invitamos a formar
						parte de nuestra comunidad y prepararte para el futuro.
					</p>

					<div className='contenedor'>
						<div className='card1'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/haciendo.png?alt=media&token=8d9abb06-a674-4489-8c51-687588aaba10'
								alt=''
							/>

							<h5>Cursos online, sincrónicos y en vivo</h5>
							<p>
								Aprendé con nuestros cursos 100% online, sincrónicos y en vivo
								dictados a través de videoconferencia.
							</p>
						</div>
						<div className='card2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/certificacion.png?alt=media&token=73088be5-d351-40ab-a4bd-ef61c89ad528'
								alt=''
							/>

							<h5>Aprendé haciendo</h5>
							<p>
								Trabajá en proyectos reales junto a profesionales expertos.
								Estudia de una manera diferente y prepárate para el futuro.
							</p>
						</div>
						<div className='card3'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/cursos.png?alt=media&token=7ae4bf15-65ff-4e1a-a0cb-282b782c2bde'
								alt=''
							/>

							<h5>Certificación Universitaria</h5>
							<p>
								Todas nuestras capacitaciones cuentan con certificación oficial
								de la Universidad Nacional de Córdoba. {mobile && <br />}
								Garantizamos formación de calidad a un precio mucho más
								accesible.
							</p>
						</div>
					</div>
					<div className='contenedor2'>
						<h4>
							Calidad y certificación universitaria, al mejor precio del mercado
						</h4>
						<Sponsors />
					</div>
				</div>
			</Container>
		</GreyBkgrTop>
	);
};

export default QuienesSomos;

const Container = styled.div`
	font-family: ${theme.fontFamily.primary};
	padding: ${({ mobile }) => (mobile ? '5% 0 5% 0' : '5% 0 5% 0')};

	.padre {
		max-width: 1095px;
		width: ${({ mobile }) => (mobile ? '85%' : '80%')};
		margin: 0 auto 0 auto;

		.titulo {
			font-size: ${({ mobile }) => (mobile ? '1.5rem' : '2.5rem')};
			font-weight: 700;
			line-height: ${({ mobile }) => (mobile ? '1.625rem' : '2.5rem')};
			margin: ${({ mobile }) => (mobile ? '0 auto auto auto' : null)};
		}

		.parrafo {
			font-weight: 500;
			font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1rem')};
			line-height: ${({ mobile }) => (mobile ? '1.125rem' : '1.43rem')};
			margin: ${({ mobile }) => (mobile ? '4% 1.5% 6.5% 1.5%' : '2% 0 0 0')};
			span {
				font-weight: bold;
			}
		}

		.contenedor {
			margin: 3.2% 0 6% 0;
			display: flex;
			flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
			justify-content: space-between;
			flex-wrap: ${({ mobile }) => mobile && 'wrap'};

			.card1 {
				width: ${({ mobile }) => (mobile ? '100%' : '27.5%')};
				margin: ${({ mobile }) => (mobile ? '0 0 15px 0' : null)};
				background: #ffffff;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;

				img {
					width: ${({ mobile }) => (mobile ? '90px' : null)};
					margin: ${({ mobile }) =>
						mobile ? '7% auto 4.8% auto' : '15% auto 12% auto'};
					border-radius: 100px;
				}

				h5 {
					font-family: ${theme.fontFamily.tertiary};
					text-align: center;
					margin: 0 11% 2% 11%;
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1.25rem')};
					font-weight: 700;
					line-height: ${({ mobile }) => (mobile ? '1rem' : '1.43rem')};
					letter-spacing: 0em;
				}

				p {
					width: ${({ mobile }) => (mobile ? '65%' : null)};
					text-align: center;
					margin: ${({ mobile }) =>
						mobile ? '0 auto 10.33% auto' : '15px 7.8%'};
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1rem')};
					line-height: ${({ mobile }) => (mobile ? '1.125rem' : null)};
				}
			}
			.card2 {
				width: ${({ mobile }) => (mobile ? '100%' : '27.5%')};
				margin: ${({ mobile }) => (mobile ? '0 0 15px 0' : null)};
				background: #ffffff;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;

				img {
					width: ${({ mobile }) => (mobile ? '90px' : null)};
					margin: ${({ mobile }) =>
						mobile ? '7% auto 4.8% auto' : '15% auto 12% auto'};
					border-radius: 100px;
				}

				h5 {
					font-family: ${theme.fontFamily.tertiary};
					text-align: center;
					margin: 0 11% 2% 11%;
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1.25rem')};
					font-weight: 700;
					line-height: ${({ mobile }) => (mobile ? '1rem' : '1.43rem')};
					letter-spacing: 0em;
				}

				p {
					width: ${({ mobile }) => (mobile ? '65%' : null)};
					text-align: center;
					margin: ${({ mobile }) =>
						mobile ? '0 auto 10.33% auto' : '35px 7.8%'};
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1rem')};
					line-height: ${({ mobile }) => (mobile ? '1.125rem' : null)};
				}
			}
			.card3 {
				width: ${({ mobile }) => (mobile ? '100%' : '27.5%')};
				margin: ${({ mobile }) => (mobile ? '0 0 15px 0' : null)};
				background: #ffffff;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
				border-radius: 10px;
				display: flex;
				flex-direction: column;
				align-items: center;

				img {
					width: ${({ mobile }) => (mobile ? '90px' : null)};
					margin: ${({ mobile }) =>
						mobile ? '7% auto 4.8% auto' : '15% auto 12% auto'};
					border-radius: 100px;
				}

				h5 {
					font-family: ${theme.fontFamily.tertiary};
					text-align: center;
					margin: 0 11% 2% 11%;
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1.25rem')};
					font-weight: 700;
					line-height: ${({ mobile }) => (mobile ? '1rem' : '1.43rem')};
					letter-spacing: 0em;
				}

				p {
					width: ${({ mobile }) => (mobile ? '65%' : null)};
					text-align: center;
					margin: ${({ mobile }) =>
						mobile ? '0 auto 10.33% auto' : '10px 7.8%'};
					font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1rem')};
					line-height: ${({ mobile }) => (mobile ? '1.125rem' : null)};
				}
			}
		}
		.contenedor2 {
			h4 {
				width: ${({ mobile }) => mobile && '95%'};
				font-weight: normal;
				font-size: ${({ mobile }) => (mobile ? '1.25rem' : '1.5rem')};
				line-height: 1.5rem;
				text-align: center;
				margin: ${({ mobile }) =>
					mobile ? '0 auto 3.75% auto' : '0 auto 3% auto'};
			}
		}
	}
`;
