import '../ModalStyles/ModalStyles.css';

import React from 'react';
import ReactModal from 'react-modal';
import { VscClose } from 'react-icons/vsc';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const ConfirmationModal = ({
  modalIsOpen,
  closeModal,
  modalTitle,
  children,
  cancelButtonContent,
  confirmButtonContent,
  confirmButtonSubmit,
  withCloseButton,
  mainColor,
}) => {
  const mobile = useIsMobile();

  const customStyles = {
    overlay: { zIndex: `${theme.zIndex.modals}` },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '560px',
      padding: '0 !important',
      borderRadius: '0px 0px 15px 15px',
    },
  };

  const customMobileStyles = {
    overlay: { zIndex: `${theme.zIndex.modals}` },
    content: {
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
    },
  };

  function handleCancel() {
    closeModal();
  }

  function handleConfirm() {
    confirmButtonSubmit();
    closeModal();
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={mobile ? customMobileStyles : customStyles}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <ModalContentContainer mobile={mobile}>
        {withCloseButton && (
          <CloseButton mobile={mobile} onClick={closeModal}>
            <VscClose size={20} />
          </CloseButton>
        )}
        <Title mobile={mobile} color={mainColor}>
          {modalTitle}
        </Title>
        {children}
        <ConfirationButtons mobile={mobile}>
          <CancelButton mobile={mobile} onClick={handleCancel}>
            {cancelButtonContent}
          </CancelButton>
          <ConfirmButton
            mobile={mobile}
            color={mainColor}
            onClick={handleConfirm}
          >
            {confirmButtonContent}
          </ConfirmButton>
        </ConfirationButtons>
      </ModalContentContainer>
    </ReactModal>
  );
};
const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p,
  b {
    ${({ mobile }) => (mobile ? 'font-size: 0.87rem' : null)};
  }
`;
const ConfirationButtons = styled.div`
  ${({ mobile }) => (mobile ? null : 'justify-self: flex-end')};
  display: flex;
  margin-top: ${({ mobile }) => (mobile ? '11.87rem' : '35px')};
  ${({ mobile }) => (mobile ? 'flex-direction: column-reverse' : null)};
  ${({ mobile }) => (mobile ? 'align-items: center' : null)};
`;
const CancelButton = styled.button`
  font-family: 'Montserrat';
  font-style: normal;
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  color: ${theme.color.darkGrey};
  background-color: ${theme.color.white};
  border-color: ${theme.color.white};
  padding: 16px 40px;
  width: ${({ mobile }) => (mobile ? '80%' : '50%')};
  cursor: pointer;
  border: ${({ mobile }) => (mobile ? 'unset' : null)};
`;
const ConfirmButton = styled.button`
  font-family: 'Montserrat';
  font-style: normal;
  font-size: 19px;
  line-height: 23px;
  text-align: center;
  color: ${theme.color.white};
  background-color: ${({ color }) => color};
  border-color: ${({ color }) => color};
  padding: ${({ mobile }) => (mobile ? '16px 33px' : '16px 40px')};
  width: ${({ mobile }) => (mobile ? '80%' : '50%')};
  cursor: pointer;
  border: ${({ mobile }) => (mobile ? 'unset' : null)};
`;

const Title = styled.h3`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  width: 100%;
  margin-top: 0;
  color: ${({ color }) => (color ? color : theme.color.blue)};
  margin-bottom: ${({ mobile }) => (mobile ? '2.5rem' : null)}; ;
`;
const CloseButton = styled.div`
  background: transparent;
  border: unset;
  cursor: pointer;
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
`;
export default ConfirmationModal;
