import ShowMoreText from 'react-show-more-text';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useIsMobile } from '../../../Hooks/Client';

const CoursesDescription = ({ course }) => {
	const mobile = useIsMobile();

	return (
		<>
			{!mobile ? (
				<StyledParragraph mobile={mobile}>
					{course.descripcion ? course.descripcion : 'Texto no disponible...'}
				</StyledParragraph>
			) : (
				<Container>
					<ShowMoreText
						lines={6}
						more='Ver más'
						less='Ver menos'
						className='toggleText'
						anchorClass='toggleButton'
						expanded={false}
						width={0}>
						{course.descripcion ? course.descripcion : 'Texto no disponible...'}
					</ShowMoreText>
				</Container>
			)}
		</>
	);
};

const StyledParragraph = styled.p`
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	color: ${theme.color.grey};
	text-align: justify;
`;
const Container = styled.div`
	margin: 0 8.5% 0 8.5%;
	.toggleText {
		span:nth-child(1) span {
			font-family: ${theme.fontFamily.primary};
			font-style: normal;
			font-weight: 500;
			font-size: 0.875rem;
			line-height: 1.125rem;
			color: ${theme.color.grey};
		}
	}
	.toggleButton {
		color: ${theme.color.darkBlue};
	}
`;

export default CoursesDescription;
