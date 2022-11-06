import { BiHide } from 'react-icons/bi';
import styled from 'styled-components';

const HideIcon = ({ props }) => {
	return (
		<Container {...props}>
			<BiHide size={20} className='delete' {...props} />
		</Container>
	);
};

const Container = styled.div`
	.delete {
		${({ width }) => width && `width: ${width}`};
		${({ height }) => height && `height: ${height}`};

		:hover {
			${({ color }) => color && `color: ${color}`};
			cursor: pointer;
		}
	}
`;
export default HideIcon;
