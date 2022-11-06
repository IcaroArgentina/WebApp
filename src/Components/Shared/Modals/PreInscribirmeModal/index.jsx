import '../ModalStyles/ModalStyles.css';

import React from 'react';
import ReactModal from 'react-modal';
import { VscClose } from 'react-icons/vsc';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const PreInscribirmeModal = ({ modalIsOpen, closeModal, cursoInteres }) => {
  const mobile = useIsMobile();

  const customStyles = {
    overlay: { position: 'fixed', zIndex: `${theme.zIndex.modals}` },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      height: '80%',
      padding: '20px 40px',
    },
  };

  const customMobileStyles = {
    overlay: { position: 'fixed', zIndex: `${theme.zIndex.modals}` },

    content: {
      width: '85%',
      height: '92%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      padding: '7.5%',
      border: 'none',
      borderRadius: '0px',
    },
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={mobile ? customMobileStyles : customStyles}
      ariaHideApp={false}
    >
      <ModalContent>
        <CloseButton onClick={closeModal}>
          <VscClose size={20} />
        </CloseButton>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScP3EmFCkGAO8-WHm8WaCpUC-sexgyecChYs5KNm-78ZSTdxQ/viewform?embedded=true"
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="Pre-inscripción a curso"
        >
          Cargando…
        </iframe>
      </ModalContent>
    </ReactModal>
  );
};

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
  align-items: flex-end;
`;

const CloseButton = styled.div`
  background: transparent;
  border: unset;
  font-size: 20px;
  cursor: pointer;
  text-align: right;
`;

export default PreInscribirmeModal;
