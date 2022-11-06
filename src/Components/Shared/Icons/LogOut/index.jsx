import { FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const Logout = ({ props }) => {
  return (
    <Container {...props}>
      <FiLogOut size={20} className="delete" />
    </Container>
  );
};

const Container = styled.div`
  .delete {
    color: ${theme.color.darkGrey};
  }
`;
export default Logout;
