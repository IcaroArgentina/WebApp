import styled from 'styled-components';
import theme from '../../../Theme/base';

const Loader = (props) => {
	return (
		<LoaderContainer {...props}>
			<StyledLoader {...props}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</StyledLoader>
		</LoaderContainer>
	);
};

const LoaderContainer = styled.div`
	display: ${({ flex }) => (flex ? 'flex' : 'block')};
	${({ flex }) => flex && 'align-items: center'};
	width: fit-content;
	${({ marginVertical }) =>
		marginVertical ? `margin: ${marginVertical}px auto` : 'margin: 20px auto'};
	${({ height }) => height && `height: ${height}`};
`;

const StyledLoader = styled.div`
	display: inline-block;
	position: relative;
	${({ size }) => (size ? `width: ${size + 16}px ` : 'width: 80px')};
	${({ size }) => (size ? `height: ${size + 16}px` : 'height: 80px')};

	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		${({ size }) => (size ? `width: ${size}px ` : 'width: 64px')};
		${({ size }) => (size ? `height: ${size}px` : 'height:64px')};

		margin: 8px;
		${({ border }) =>
			border
				? `border: ${border}px solid ${theme.color.blue}`
				: `border: 8px solid ${theme.color.blue}`};
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${theme.color.blue} transparent transparent transparent;
	}
	div:nth-child(1) {
		animation-delay: -0.45s;
	}
	div:nth-child(2) {
		animation-delay: -0.3s;
	}
	div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loader;
