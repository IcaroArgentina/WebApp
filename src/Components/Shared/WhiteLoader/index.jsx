import styled from 'styled-components';
import theme from '../../../Theme/base';

const WhiteLoader = () => {
  return (
    <LoaderContainer>
      <StyledLoader>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoader>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: block;
  width: fit-content;
  margin: 0 auto;
`;

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    margin: 3px;
    border: 3px solid ${theme.color.white};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${theme.color.white} transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default WhiteLoader;
