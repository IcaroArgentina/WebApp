import { ImCross } from 'react-icons/im';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const RejectIcon = (props) => {
  const handleClick = (e) => {
    props.onClick && props.onClick();
  };
  return (
    <Container onClick={handleClick} {...props}>
      <ImCross size={20} className="reject" />
    </Container>
  );
};

const Container = styled.div`
  .reject {
    :hover {
      color: ${theme.color.redError};
    }
  }
`;
export default RejectIcon;
