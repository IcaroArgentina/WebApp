import styled from 'styled-components';
import theme from '../../../../Theme/base';

const LinearBttn = (props) => {
  const { mobile } = props;

  return (
    <StyledButton mobile={mobile} {...props} type="submit">
      <Content mobile={mobile}>{props.children}</Content>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.darkBlue};
  border-radius: 10px;
  padding: ${(mobile) => (mobile ? '4px 12px 2px 12px' : '5px 13px')};
  cursor: pointer;
  ${({ width }) => width && `width: ${width}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
`;
const Content = styled.p`
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ mobile }) => (mobile ? '12px' : '16px')};
  line-height: ${({ mobile }) => (mobile ? '14px' : '24px')};
  text-align: center;
  color: ${theme.color.darkBlue};
  margin: 0;
`;
export default LinearBttn;
