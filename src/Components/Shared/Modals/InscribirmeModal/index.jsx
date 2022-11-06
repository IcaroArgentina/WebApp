import '../ModalStyles/ModalStyles.css';

import { addDoc, collection } from 'firebase/firestore';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import BlueButton from '../../Buttons/BlueButton';
import BlueLink from '../../Buttons/BlueLink';
import LinearLink from '../../Buttons/LinearLink';
import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { UseSendEmail } from '../../../../Hooks/SendEmail';
import { VscClose } from 'react-icons/vsc';
import WhiteLoader from '../../WhiteLoader/index';
import db from '../../../../Firebase/index';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';
import { useState } from 'react';
import { projectContext } from '../../../../Context/ProjectContext';

const InscribirmeModal = ({
  modalIsOpen,
  closeModal,
  cursoInteres,
  comision,
  userInfo,
}) => {
  const mobile = useIsMobile();
  const [loadingSubmit, setloadingSubmit] = useState(false);

  const { toastList, setToastList } = useContext(projectContext);

  function showToast(type, content) {
    let selectedToast = [];
    switch (type) {
      case 'success':
        selectedToast = successToast(content, toastList);
        break;
      case 'error':
        selectedToast = errorToast(content, toastList);
        break;
      default:
        break;
    }
    setToastList([selectedToast]);
  }

  function handleSubmit(e) {
    setloadingSubmit(true);
    const ref = collection(db, `Usuarios/${userInfo.uuid}/Inscripciones`);
    const createdInscripcion = {
      esEstudiante: userInfo?.Certificado?.estado === 'Aprobado',
      estadoInscripcion: 'Pendiente',
      inscripcionComision: comision.uuid,
      inscripcionCurso: cursoInteres.nombre,
    };
    addDoc(ref, createdInscripcion);
    const mailData = {
      titular: `Se ha solicitado una inscripcion del siguiente usuario: ${
        userInfo.name
      } ${userInfo.lastname}, email: ${
        userInfo.email
      } a la siguiente comision Curso: ${comision.nombreCurso} al precio de $ ${
        userInfo?.Certificado?.estado === 'Aprobado'
          ? comision.precioComisionDto
          : comision.precioComision
      }. Ingrese al pefil administrador para aprobar Inscripcion en caso de acreditado el pago.`,
      fullname: ` ${userInfo.name} ${userInfo.lastname}`,
      'correo-electronico': ` ${userInfo.email}`,
      send_to: 'info@icaro.org.ar',
    };
    UseSendEmail(
      mailData,
      showToast,
      setloadingSubmit,
      'Se ha solicitado su inscripción correctamente'
    );

    showToast(
      'success',
      'Solicitud creada. Redirigiendo a la plataforma de pagos'
    );
    const updatedLink =
      userInfo?.Certificado?.estado === 'Aprobado'
        ? comision.mpLinkDto.includes('https://')
          ? comision.mpLinkDto
          : `https://${comision.mpLinkDto}`
        : comision.mpLink.includes('https://')
        ? comision.mpLink
        : `https://${comision.mpLink}`;

    setTimeout(() => {
      window.location.replace(updatedLink);
    }, 3000);
  }

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
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={mobile ? customMobileStyles : customStyles}
        ariaHideApp={false}
      >
        <CloseButton onClick={closeModal}>
          <VscClose size={20} />
        </CloseButton>
        {cursoInteres.aceptaMp ? (
          <Title>¡Completa tu inscripción!</Title>
        ) : (
          <Title>¡Comunicate con nosotros para procesar tu inscripción!</Title>
        )}
        <Parragraph mobile={mobile} bold>
          Curso: {cursoInteres.nombre}
        </Parragraph>
        <Parragraph mobile={mobile}>
          Precio:{' '}
          {userInfo?.Certificado?.estado === 'Aprobado' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <StyledPrice isDto>$ {comision?.precioComision}</StyledPrice>
              <p style={{ fontWeight: '800' }}>
                {' '}
                $ {comision?.precioComisionDto}
              </p>
            </div>
          ) : (
            `$ ${comision?.precioComision}`
          )}
        </Parragraph>
        {cursoInteres.aceptaMp ? (
          <BlueButton
            fontFamily="Montserrat, sans-serif"
            fontSize="1.18rem"
            width={mobile ? '100%' : '58%'}
            margin={mobile ? '60px 0 0 0' : '20px 21%'}
            padding="16px"
            backgroundColor={theme.color.darkBlue}
            onClick={handleSubmit}
          >
            {loadingSubmit ? <WhiteLoader /> : 'Pagar Inscripcion'}
          </BlueButton>
        ) : (
          <BlueLink
            fontFamily="Montserrat, sans-serif"
            fontSize="1.18rem"
            textAlign="center"
            display="block"
            width="58%"
            margin="0 auto"
            mobile={mobile}
            padding="5px 16px"
            backgroundColor={theme.color.darkBlue}
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=5493518656685&text=¡Hola! Quiero inscribirme al curso ${cursoInteres.nombre} `}
          >
            Solicitar Inscripción
          </BlueLink>
        )}

        <Parragraph mobile={mobile}>
          <InfoIcon size={20} />
          Residentes fuera de Argentina solicitar cupón de pago al siguiente
          link
        </Parragraph>

        <LinearLink
          fontFamily="Montserrat, sans-serif"
          textAlign="center"
          display="block"
          width="58%"
          margin="0 auto"
          mobile={mobile}
          padding="5px 16px"
          backgroundColor={theme.color.darkBlue}
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=5493518656685&text=¡Hola! Quiero inscribirme al curso ${cursoInteres.nombre} y necesito cupon de pago para extranjeros.`}
        >
          Solicitar cupon para extranjeros
        </LinearLink>
      </ReactModal>
    </>
  );
};

const Title = styled.h3`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  width: 100%;
  color: #1744ff;
  margin-top: 0;
`;
const CloseButton = styled.div`
  background: transparent;
  border: unset;
  font-size: 20px;
  cursor: pointer;
  text-align: right;
`;

const Parragraph = styled.div`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? 800 : 400)};
  font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
  width: ${({ mobile }) => (mobile ? '75%' : null)};
  line-height: 19.5px;
  text-align: center;
  margin: 20px auto;
  color: #3d3d3d;
`;

const InfoIcon = styled(AiOutlineInfoCircle)`
  margin-bottom: -3px;
  margin-right: 5px;
`;

const StyledPrice = styled.p`
  ${({ isDto }) => isDto && 'text-decoration:line-through'};
`;
export default InscribirmeModal;
