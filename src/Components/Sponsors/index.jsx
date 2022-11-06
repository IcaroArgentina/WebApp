import React from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../Hooks/Client';

const Sponsors = () => {
	const mobile = useIsMobile();

	return (
		<SponsorsContainer mobile={mobile}>
			<SponsorsImage
				mobile={mobile}
				src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/sponsor1.png?alt=media&token=26c00c25-a87b-44eb-9a21-53c4af4a2a81'
				alt=''
			/>
			<SponsorsImage
				mobile={mobile}
				src='https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/sponsor2.png?alt=media&token=cbb0352f-f502-4822-9c2b-05bcb48e959c'
				alt=''
			/>
		</SponsorsContainer>
	);
};

const SponsorsContainer = styled.div`
	margin: ${({ mobile }) => (mobile ? '20px 20px  40px 20px' : '20px')};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const SponsorsImage = styled.img`
	width: ${({ mobile }) => mobile && '40%'};
	margin: ${({ mobile }) => (mobile ? '0 16px' : '0 25px')};
	height: auto;
`;

export default Sponsors;
