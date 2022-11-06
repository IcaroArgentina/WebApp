import { BiUserCircle } from 'react-icons/bi';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const UserIcon = ({ props }) => {
  return (
    <Container {...props}>
      <BiUserCircle size={20} className="delete" />
    </Container>
  );
};

const Container = styled.div`
  .delete {
    color: ${theme.color.darkGrey};
  }
`;
export default UserIcon;
