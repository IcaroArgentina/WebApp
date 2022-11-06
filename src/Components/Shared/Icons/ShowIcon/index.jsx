import { BiShow } from 'react-icons/bi';
import styled from 'styled-components';

const ShowIcon = ({ props }) => {
	return (
		<Container {...props}>
			<BiShow size={20} className='delete' {...props} />
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
export default ShowIcon;
