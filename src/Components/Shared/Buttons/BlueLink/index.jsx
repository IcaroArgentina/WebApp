import styled from 'styled-components';
import theme from '../../../../Theme/base';

const BlueLink = (props) => {
  return (
    <StyledButton {...props} type="submit" disabled={props.disabled}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.a`
  ${({ width }) => width && `width: ${width}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ backgroundColor }) =>
    backgroundColor
      ? `background-color: ${backgroundColor}`
      : `background-color:${theme.color.darkBlue}`};
  ${({ color }) => (color ? `color: ${color} !important` : theme.color.white)};
  color: white;
  border: none;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  ${({ fontFamily }) =>
    fontFamily
      ? `font-family: ${fontFamily}`
      : `font-family: ${theme.fontFamily.primary}`};
  font-weight: 700;
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize}` : 'font-size: 1rem'};
  ${({ lineHeight }) =>
    lineHeight ? `line-height: ${lineHeight}` : 'line-height: 1.5rem'};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
  text-align: center;
  text-decoration: none;
  display: block;
`;
export default BlueLink;
