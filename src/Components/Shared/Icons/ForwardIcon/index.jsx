import { TiArrowForwardOutline } from 'react-icons/ti';

import styled from 'styled-components';
import theme from '../../../../Theme/base';

const ForwardIcon = () => {
  return (
    <Container>
      <TiArrowForwardOutline size={30} className="edit" />
    </Container>
  );
};

const Container = styled.div`
  .edit {
    :hover {
      color: ${theme.color.darkBlue};
    }
  }
`;
export default ForwardIcon;
