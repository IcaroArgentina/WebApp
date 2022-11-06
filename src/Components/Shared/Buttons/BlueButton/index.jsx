import styled from 'styled-components';
import theme from '../../../../Theme/base';

const BlueButton = (props) => {
	const handleClick = (e) => {
		e.preventDefault();
		props.onClick && props.onClick();
	};

	return (
		<StyledButton
			{...props}
			type='submit'
			disabled={props.disabled}
			onClick={handleClick}>
			{props.children}
		</StyledButton>
	);
};

const StyledButton = styled.button`
	${({ width }) => width && `width: ${width}`};
	${({ margin }) => margin && `margin: ${margin}`};
	${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
	${({ padding }) => padding && `padding: ${padding}`};
	${({ backgroundColor, disabled }) =>
		backgroundColor
			? disabled
				? `background-color:${theme.color.disabledBlue}`
				: `background-color: ${backgroundColor}`
			: disabled
			? `background-color:${theme.color.disabledBlue}`
			: `background-color:${theme.color.darkBlue}`};
	${({ color }) => (color ? `color: ${color} !important` : theme.color.white)};
	color: white;
	border: none;
	cursor: ${({ disabled }) => !disabled && 'pointer'};
	${({ fontFamily }) =>
		fontFamily
			? `font-family: ${fontFamily}`
			: `font-family: ${theme.fontFamily.primary}`};
	font-weight: 700;
	${({ fontSize }) =>
		fontSize ? `font-size: ${fontSize}` : 'font-size: 1rem'};
	${({ lineHeight }) =>
		lineHeight ? `line-height: ${lineHeight}` : 'line-height: 1.5rem'};
	${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
`;
export default BlueButton;
