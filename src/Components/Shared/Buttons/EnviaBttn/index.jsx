import Loader from '../../Loader';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const EnviaBttn = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.onClick && props.onClick();
  };

  return (
    <SendButton {...props} onClick={(e) => handleClick(e)} type="submit">
      {props.pending ? (
        <Loader size={20} marginVertical={9.5} border={2} flex={true} />
      ) : (
        'Enviar'
      )}
    </SendButton>
  );
};

const SendButton = styled.button`
  ${({ width }) => width && `width: ${width}`};
  ${({ margin }) => margin && `margin: ${margin} !important`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ backgroundColor, disabled }) =>
    backgroundColor
      ? disabled
        ? `background-color:${theme.color.disabledBlue}`
        : `background-color: ${backgroundColor}`
      : disabled
      ? `background-color:${theme.color.disabledBlue}`
      : `background-color:${theme.color.darkBlue}`};
  ${({ color }) => (color ? `color: ${color} !important` : theme.color.white)};
  ${({ fontFamily }) =>
    fontFamily
      ? `font-family: ${fontFamily} !important`
      : `font-family: ${theme.fontFamily.primary}`};
  ${({ fontSize }) =>
    fontSize ? `font-size: ${fontSize} !important` : 'font-size:1rem'};
  color: white;
  border: none;
  ${({ disabled }) => (disabled ? 'cursor: default' : 'cursor: pointer')};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf} !important`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`}
`;
export default EnviaBttn;
