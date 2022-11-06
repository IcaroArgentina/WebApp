import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useLocation } from 'react-router-dom';

const IngresaBttn = ({ setIsLoginOpen }) => {
	const handleClick = () => {
		setIsLoginOpen(true);
	};
	const location = useLocation();

	return (
		<>
			<StyledButton
				className='ingresa'
				onClick={handleClick}
				isCourses={location.pathname.includes('cursos')}>
				Ingresá
			</StyledButton>
		</>
	);
};

const StyledButton = styled.button`
	font-family: ${theme.fontFamily.primary};
	font-size: 16px;
	cursor: pointer;
	font-weight: ${({ isCourses }) => (isCourses ? 500 : 'normal')};
	color: ${({ isCourses }) =>
		isCourses ? theme.color.darkBlue : theme.color.white};
	background: ${({ isCourses }) =>
		isCourses ? theme.color.white : theme.color.gradient};
	transition: all 0.5s ease-in-out 0s;
	border-radius: 5px;
	border: none;
	justify-self: end;
	text-align: center;
	line-height: 0.875rem;
	padding: 14px 50px;

	&:hover {
		background-position: 160px;
	}
`;

export default IngresaBttn;
