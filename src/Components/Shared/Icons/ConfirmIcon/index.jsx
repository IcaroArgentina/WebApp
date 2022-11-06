import { GiConfirmed } from 'react-icons/gi';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const ConfirmIcon = (props) => {
  const handleClick = (e) => {
    props.onClick && props.onClick();
  };
  return (
    <Container onClick={handleClick} {...props}>
      <GiConfirmed size={25} className="confirm" />
    </Container>
  );
};

const Container = styled.div`
  .confirm {
    :hover {
      color: ${theme.color.successGreen};
    }
  }
`;
export default ConfirmIcon;
