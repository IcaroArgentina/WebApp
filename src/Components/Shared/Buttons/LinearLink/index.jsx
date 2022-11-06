import styled from 'styled-components';
import theme from '../../../../Theme/base';

const LinearLink = (props) => {
  const { mobile } = props;

  return (
    <StyledLink mobile={mobile} {...props}>
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled.a`
  display: block;
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.darkBlue};
  border-radius: 10px;
  padding: ${(mobile) => (mobile ? '4px 12px 2px 12px' : '5px 13px')};
  cursor: pointer;
  ${({ width }) => width && `width: ${width}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ mobile }) => (mobile ? '16px' : '16px')};
  line-height: ${({ mobile }) => (mobile ? '14px' : '24px')};
  text-align: center;
  text-decoration: none;
  color: ${theme.color.darkBlue};
`;

export default LinearLink;
