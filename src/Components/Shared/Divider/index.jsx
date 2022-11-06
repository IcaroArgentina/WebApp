import styled from 'styled-components';
import theme from '../../../Theme/base';

const Divider = () => <DividerContent />;

const DividerContent = styled.hr`
  border: 0;
  margin: 0;
  border-top: 1px solid ${theme.color.lightGrey};
`;

export default Divider;
