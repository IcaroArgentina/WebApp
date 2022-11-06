import EmptyButton from '../../Shared/Buttons/EmptyButton';
import IngresaBttn from '../../Shared/Buttons/IngresaBttn';
import { hexcodeToRGBA } from '../../../Helpers/colors';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useIsMobile } from '../../../Hooks/Client';

const CarouselCard = ({ src, slide, setIsLoginOpen, loggedUser }) => {
	const mobile = useIsMobile();
	const { Description, Title, ButtonLink, ButtonText } = slide;

	return (
		<ImageContainer mobile={mobile} src={src}>
			<StyledTextContainer mobile={mobile}>
				<StyledH1 mobile={mobile}>{Title}</StyledH1>
				<StyledParragraph mobile={mobile}>{Description}</StyledParragraph>
				{ButtonLink?.length && ButtonText?.length && !loggedUser ? (
					ButtonText === 'Ingresá' ? (
						<div style={{ width: 'min-content' }}>
							<IngresaBttn setIsLoginOpen={setIsLoginOpen} />
						</div>
					) : (
						<EmptyButton href={ButtonLink} content={ButtonText} />
					)
				) : null}
			</StyledTextContainer>
		</ImageContainer>
	);
};

const ImageContainer = styled.div`
	background-image: url(${({ src }) => src});
	background-position: center;
	background-size: cover;
	height: ${({ mobile }) => mobile && '650px'};
	box-shadow: inset 0 0 0 1000px ${hexcodeToRGBA(theme.color.darkBlue, 0.8)};
`;

const StyledTextContainer = styled.div`
	position: relative;

	max-width: 1095px;
	margin: auto;
	width: ${({ mobile }) => (mobile ? '82.66%' : '80%')};
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const StyledH1 = styled.h1`
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: 900;
	font-size: ${({ mobile }) => (mobile ? '29px' : '48px')};
	line-height: ${({ mobile }) => (mobile ? '2.43rem' : '48px')};
	color: #ffffff;
	width: ${({ mobile }) => (mobile ? '100%' : '55%')};
	text-transform: uppercase;
	${({ mobile }) => mobile && 'hyphens: auto; overflow-wrap: break-word;'}
`;

const StyledParragraph = styled.p`
	font-family: ${theme.fontFamily.primary};
	font-style: normal;
	font-weight: 500;
	font-size: ${({ mobile }) => (mobile ? '14px' : '24px')};
	line-height: 24px;
	color: #ffffff;
	width: ${({ mobile }) => (mobile ? '87%' : '80%')};
`;

export default CarouselCard;
