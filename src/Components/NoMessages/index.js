import React from 'react';
import styled from 'styled-components';
import theme from '../../Theme/base';

const NoMessages = () => {
	return (
		<Container>
			<TextContainer>
				<StyledTitle>Aún no tienes mensajes</StyledTitle>
				<StyledText>
					Si tienes dudas o consultas, puedes escribirnos y te responderemos lo
					más pronto posible.
				</StyledText>
			</TextContainer>
			<Img
				src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/NoMessages.png?alt=media&token=192a7f4e-7e26-4a1a-a79f-dbba77eb2814'
				alt='Sin mensajes para mostrar'
			/>
		</Container>
	);
};

export default NoMessages;

const Container = styled.div`
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	justify-content: space-evenly;
	margin: auto 0;
	width: 100%;
	height: 100%;
`;

const TextContainer = styled.div`
	width: 80%;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const StyledTitle = styled.span`
	font-size: 1.125rem;
	font-weight: 600;
	line-height: 1.5rem;
	font-family: ${theme.fontFamily.primary};
`;

const StyledText = styled.p`
	font-family: ${theme.fontFamily.primary};
	text-align: center;
`;

const Img = styled.img`
	width: 205px;
`;
