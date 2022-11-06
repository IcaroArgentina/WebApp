import { keyframes } from 'styled-components';
import styled from 'styled-components';
import theme from './../../../../Theme/base';
import { useCallback, useContext } from 'react';
import { useIsMobile } from '../../../../Hooks/Client';
import { projectContext } from '../../../../Context/ProjectContext';

const ToastListContainer = () => {
  const mobile = useIsMobile();
  const { toastList, setToastList } = useContext(projectContext);

  const deleteToast = useCallback(
    (id) => {
      const toastListItem = toastList.filter((e) => e.id !== id);
      setToastList(toastListItem);
    },
    [toastList, setToastList]
  );

  if (toastList.length === 0) {
    return null;
  }
  return (
    <Container className={`container `} mobile={mobile}>
      {toastList.map((toast, i) => (
        <Notification
          mobile={mobile}
          key={i}
          className={`toast`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <ToastButton onClick={() => deleteToast(toast.id)} mobile={mobile}>
            X
          </ToastButton>
          <div>
            <Description mobile={mobile}>{toast.content}</Description>
          </div>
        </Notification>
      ))}
    </Container>
  );
};

const AnimationToast = keyframes`
    	from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  height: ${({ mobile }) => (mobile ? `auto` : `40px`)};
  width: ${({ mobile }) => (mobile ? `83%` : `500px`)};
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  position: fixed;
  bottom: 40px;
  z-index: ${theme.zIndex.toast};
  animation-name: ${AnimationToast};
`;
const Notification = styled.div`
  padding: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px #999;
  opacity: 0.9;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 0 12px #000;
    opacity: 1;
  }

  .toast {
    height: 50px;
    width: 365px;
    color: #fff;
    padding: ${({ mobile }) =>
      mobile ? `15px 15px 10px 10px` : `20px 15px 10px 10px`};
  }
`;
const Description = styled.p`
  margin: 0;
  text-align: left;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: ${({ mobile }) => (mobile ? `12px` : `16px`)};
  line-height: 18px;
  text-align: center;
  color: #ffffff;
`;
const ToastButton = styled.button`
  float: right;
  background: none;
  border: none;
  color: #fff;
  opacity: 0.8;
  cursor: pointer;
`;

export default ToastListContainer;
