import { errorToast, successToast } from '../../Shared/Toasts/ToastList';

import TextareaAutosize from 'react-textarea-autosize';
import { UseSendEmail } from '../../../Hooks/SendEmail';
import WhiteLoader from '../../Shared/WhiteLoader';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { projectContext } from '../../../Context/ProjectContext';

const MasInfoBox = ({ course }) => {
  const [mensaje, setMensaje] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [contactData, setContactData] = useState({
    fullname: '',
    telefono: '',
    mensaje: '',
    titular: 'El siguiente usuario ha solicitado más información:',
    send_to: 'info@icaro.org.ar',
    course: `Curso de interés: ${course.nombre}`,
  });
  const { toastList, setToastList } = useContext(projectContext);

  useEffect(() => {
    setContactData({
      fullname: '',
      telefono: '',
      mensaje: '',
      titular: 'El siguiente usuario ha solicitado más información:',
      send_to: 'info@icaro.org.ar',
      course: `Curso de interés: ${course.nombre}`,
    });
    setMensaje('');
  }, [course]);

  useEffect(() => {
    if (
      contactData?.fullname?.length > 0 &&
      contactData?.mensaje?.length > 0 &&
      contactData?.telefono?.length > 0 &&
      contactData?.['correo-electronico']?.length > 0 &&
      contactData?.['correo-electronico']?.includes('@')
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [contactData]);

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

  function handleChange(name, value) {
    setContactData((contactData) => ({ ...contactData, [name]: value }));
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (isButtonDisabled) {
      return;
    }
    UseSendEmail(contactData, showToast, setSubmitLoading, null);

    setTimeout(() => {
      setContactData({
        titular: 'El siguiente usuario ha solicitado más información:',
        send_to: 'info@icaro.org.ar',
        course: `Curso de interés: ${course.nombre}`,
      });
      setMensaje('');
      setSubmitLoading(false);
      setIsButtonDisabled(true);
      setToastList([]);
    }, 2500);
  };

  return (
    <>
      <MasInfoContainer>
        <Title>¿Quéres más información?</Title>
        <StyledForm>
          <FormLabel htmlFor="fullname">
            Nombre y Apellido
            <FormInput
              id="fullname"
              name="fullname"
              type="text"
              onChange={(e) => handleChange('fullname', e.target.value)}
              value={contactData.fullname || ''}
            />
          </FormLabel>
          <FormLabel htmlFor="correo-electronico">
            Mail
            <FormInput
              id="correo-electronico"
              name="correo-electronico"
              type="email"
              onChange={(e) =>
                handleChange('correo-electronico', e.target.value)
              }
              value={contactData['correo-electronico'] || ''}
            />
          </FormLabel>
          <FormLabel htmlFor="telefono">
            Teléfono (Ejemplo: 3513222156)
            <FormInput
              id="telefono"
              name="telefono"
              type="text"
              maxLength={13}
              onChange={(e) => handleChange('telefono', e.target.value)}
              value={contactData.telefono || ''}
            />
          </FormLabel>
          <FormLabel htmlFor="course">
            Curso de interés
            <FormInput
              id="course"
              name="Course"
              type="text"
              value={course.nombre}
              onChange={(e) => handleChange('course', e.target.value)}
            />
          </FormLabel>
          <FormLabel htmlFor="question">
            <TextareaAutosize
              minRows={3}
              placeholder="Consulta"
              className="styled-text-area"
              id="mensaje"
              name="mensaje"
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                return handleChange('mensaje', e.target.value);
              }}
            />
          </FormLabel>
          <EnviarMail onClick={sendEmail} disabled={isButtonDisabled}>
            {submitLoading ? <WhiteLoader /> : 'Enviar'}
          </EnviarMail>
        </StyledForm>
      </MasInfoContainer>
    </>
  );
};

const MasInfoContainer = styled.div`
  position: sticky;
  top: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 30px;
  margin: 40px 0;
`;
const Title = styled.h3`
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: ${theme.fontFamily.lightGrey};
`;

const StyledForm = styled.form`
  .styled-text-area {
    display: block;
    width: 100%;
    height: 35px !important;
    border: 1px solid #e6e6e6;
    resize: none;
    margin-top: 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    font-family: ${theme.fontFamily.primary};

    ::placeholder {
      display: block;
      font-family: ${theme.fontFamily.primary};
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: ${theme.color.grey};
      margin: 10px 0px;
    }

    :focus {
      font-family: ${theme.fontFamily.primary};
      border: 1px solid ${theme.color.darkBlue};
      outline: none;
      border-radius: 5px;
      font-size: 1rem;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const FormLabel = styled.label`
  display: block;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.color.grey};
  margin: 10px 0px;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  height: 30px;
  border: 1px solid #e6e6e6;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  :focus {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    border: 1px solid ${theme.color.darkBlue};
    outline: none;
    border-radius: 5px;
    font-size: 1rem;
    font-family: ${theme.fontFamily.primary};
  }

  ::placeholder {
    display: block;
    font-family: ${theme.fontFamily.primary};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.color.grey};
    margin: 10px 0px;
  }
`;

const EnviarMail = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? theme.color.disabledBlue : theme.color.darkBlue};
  color: #fff;
  font-family: Montserrat, sans-serif !important;
  color: white;
  border: none;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  width: 100%;
  margin: 20px 0px;
  border-radius: 10px;
  padding: 10px;
  font-size: 1rem;
  color: white;
  border: none;
`;

export default MasInfoBox;
