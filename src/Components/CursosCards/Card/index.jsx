import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useGetColors } from '../../../Hooks/Client';

const Card = ({
	maxLeght,
	isProximos,
	info,
	overridecolor,
	isMobile,
	comision,
}) => {
	const { duracion } = info;

	return (
		<CardContainer
			isMobile={isMobile}
			isProximos={isProximos}
			maxLeght={maxLeght}>
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
					<CourseContent isItalic>{duracion || `  `}</CourseContent>
					<CourseContent>
						{comision & comision?.precioComision
							? `$${comision?.precioComision}`
							: info.precioInfo}
					</CourseContent>
					<VerMasButton to={`/cursos/${info.href}`}>Ver Mas</VerMasButton>
				</>
			</CardContent>
		</CardContainer>
	);
};

export default Card;

const CardContainer = styled.div`
	width: ${({ isMobile, isProximos, maxLeght }) =>
		isProximos
			? isMobile
				? '250px'
				: `${100 / 4}%`
			: isMobile
			? '145px'
			: `${100 / 5}%`};
	max-width: ${({ isMobile, isProximos }) =>
		isProximos ? !isMobile && '295px' : !isMobile && '200px'};
	background: #ffffff;
	box-shadow: ${theme.shadow.boxShadow};
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	font-family: ${theme.fontFamily.primary};
	justify-content: space-between;
	margin: ${({ isMobile }) => isMobile && '10px auto'};
	padding: 20px;
`;
const TitleContainer = styled(Link)`
	background-color: ${theme.color.white};
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
	margin: 0px;

	color: ${({ categoriacolor, overridecolor }) =>
		overridecolor
			? theme.categories[overridecolor]
			: useGetColors(categoriacolor)};
`;
const CardContent = styled.div`
	p {
		font-size: 1rem;
		line-height: 1.18rem;
		color: ${theme.color.black};
		span {
			font-weight: 700;
		}
	}
`;

const CourseContent = styled.p`
	font-family: ${theme.fontFamily.tertiary};
	${({ isItalic }) => isItalic && 'font-style: italic;'}
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	text-align: center;
	color: #282828;
`;

const VerMasButton = styled(Link)`
	display: block;
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	text-align: center;
	text-decoration-line: underline;
	cursor: pointer;
	color: #282828;
`;
