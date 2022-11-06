import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { hexcodeToRGBA } from '../../../../Helpers/colors';

const GreyBkgrBottom = styled.div`
  min-height: ${({ height }) => height + 900}px;
  background: ${theme.color.white};
  background: linear-gradient(
    13deg,
    ${hexcodeToRGBA(theme.color.white, 1)} 60%,
    ${hexcodeToRGBA(theme.color.lightGrey, 1)} 60%
  );
`;

export default GreyBkgrBottom;
