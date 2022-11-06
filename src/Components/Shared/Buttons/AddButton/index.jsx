import React from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../../../Hooks/Client';

const AddButton = ({ alt, clickEvent, width = '16', background }) => {
	const handleClick = () => (clickEvent ? clickEvent() : null);
	const mobile = useIsMobile();
	return (
		<StyledButton
			mobile={mobile}
			backgorundColor={background}
			onClick={handleClick}>
			<img
				width={width}
				src={
					'https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/addDesktopIcon.png?alt=media&token=bfcf6375-33c9-467d-960b-994e91b77f20'
				}
				alt={alt}
			/>
		</StyledButton>
	);
};

export default AddButton;

const StyledButton = styled.button`
	background-color: ${({ backgroundColor }) =>
		backgroundColor ? backgroundColor : 'transparent'};
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;
`;
