import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { turnTimestampIntoDate } from '../../../Utils';
import { useGetColors } from '../../../Hooks/Client';

const ProximosCard = ({ isProximos, info, overridecolor, isMobile }) => {
	const { fechaInicio, clasesSemanales, duracion, modalidad } = info;

	return (
		<CardContainer isMobile={isMobile} isProximos={isProximos}>
			<TitleContainer
				to={`/cursos/${info.href}`}
				categoriacolor={info.CategoriaID}
				overridecolor={overridecolor}>
				<CardTitle
					isProximos={isProximos}
					isMobile={isMobile}
					categoriacolor={info.CategoriaID}
					overridecolor={overridecolor}>
					{info.nombre}
				</CardTitle>
			</TitleContainer>

			<CardContent isProximos={isProximos}>
				<>
					<CardInfoContainer>
						<p>
							<span>Fecha de inicio:</span> {turnTimestampIntoDate(fechaInicio)}
						</p>
						<p>
							<span>Duración:</span> {duracion}
						</p>
						<p>
							<span>Modalidad:</span> {modalidad}
						</p>
						<p>
							<span>Clases semanales:</span> {clasesSemanales}
						</p>
					</CardInfoContainer>
					<ConoceMasBttn to={`/cursos/${info.href}`}>Conoce Mas</ConoceMasBttn>
				</>
			</CardContent>
		</CardContainer>
	);
};

export default ProximosCard;

const CardContainer = styled.div`
	width: ${({ isMobile, isProximos }) =>
		isProximos ? (isMobile ? '250px' : '29%') : isMobile ? '185px' : '20%'};
	max-width: ${({ isMobile, isProximos }) =>
		isProximos ? !isMobile && '295px' : !isMobile && '185px'};
	background: #ffffff;
	box-shadow: ${theme.shadow.boxShadow};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	font-family: ${theme.fontFamily.primary};
	justify-content: space-between;
	margin: ${({ isMobile }) => isMobile && '10px auto'};
	padding-top: ${({ isMobile }) => (isMobile ? '5%' : null)};
`;
const TitleContainer = styled(Link)`
	background-color: ${theme.color.white};
	width: 80%;
	margin: auto;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: ${({ isProximos, categoriacolor }) =>
			isProximos ? theme.color.black : useGetColors(categoriacolor)};
	}
`;

const CardTitle = styled.h5`
	font-weight: 700;
	font-size: 1.12rem;
	text-align: center;
	margin-bottom: ${({ isProximos }) => !isProximos && '0px'};
	margin-top: ${({ isMobile }) => isMobile && '0px'};

	color: ${({ categoriacolor, overridecolor }) =>
		overridecolor
			? theme.categories[overridecolor]
			: useGetColors(categoriacolor)};
`;
const CardContent = styled.div`
	padding: ${({ isProximos }) => (isProximos ? '0px' : '20px')};
	p {
		font-size: 1rem;
		line-height: 1.18rem;
		color: ${theme.color.black};
		span {
			font-weight: 700;
		}
	}
`;
const CardInfoContainer = styled.div`
	padding: 20px;
`;

const ConoceMasBttn = styled(Link)`
	background: #1744ff;
	border-radius: 0px 0px 10px 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	font-family: ${theme.fontFamily.primary};
	text-decoration: none;
	font-weight: 600;
	color: white;
	margin: 0;
	text-align: center;
	padding: 9% 0 9% 0;
	cursor: pointer;
`;
