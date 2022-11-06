import { errorToast, successToast } from '../Shared/Toasts/ToastList';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ContactoModal from '../Shared/Modals/ContactModal';
import IcaroInCompanyModal from '../Shared/Modals/IcaroInCompanyModal';
import React from 'react';
import SocialMediaIcon from '../Shared/Icons/FooterIcons';
import { mainFooterContext } from '../../Context/FooterContext';
import { projectContext } from './../../Context/ProjectContext';
import { sortArrayByOrdenValue } from '../../Utils';
import styled from 'styled-components';
import theme from '../../Theme/base';
import { useIsCompact } from '../../Hooks/Client';
import { useIsMobile } from '../../Hooks/Client';

const Footer = () => {
  const { is404 } = useContext(projectContext);
  const { footerContent } = useContext(mainFooterContext);
  const [pending, setPending] = useState(true);
  const [inCompanyModalIsOpen, setInCompanyModalIsOpen] = useState(false);
  const [ContactoModalIsOpen, setContactoModalIsOpen] = useState(false);
  const [completedEmail, setCompletedEmail] = useState('');
  const mobile = useIsMobile();
  const compact = useIsCompact();
  const location = useLocation();
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

  useEffect(() => {
    if (footerContent) {
      setPending(false);
    }
  }, [footerContent]);

  const getFooterContent = () => {
    return sortArrayByOrdenValue(footerContent);
  };
  function scrollTo(route, offset = 0) {
    location !== '/' && navigate('/');
    setTimeout(() => {
      let element = document.getElementById('root');
      if (route === '/cursos') {
        element = document.getElementById('cursos');
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }, 500);
  }

  function handleChange(value) {
    setCompletedEmail(value);
    if (completedEmail?.length > 1 && completedEmail.includes('@')) {
      setIsButtonDisabled(false);
    }
  }

  function sendEmail(e) {
    e.preventDefault();

    if (isButtonDisabled) {
      return;
    }

    setCompletedEmail('');
    setIsButtonDisabled(true);
    showToast('success', 'Tu suscripción al newsletter fue exitosa');

    setTimeout(() => {
      setToastList([]);
    }, 2500);
  }

  return (
    <>
      {!is404 && (
        <FooterContainer>
          <ContentContainer mobile={mobile}>
            {pending
              ? null
              : getFooterContent().map((element, index) => {
                  const { Titulo, links } = element;
                  return (
                    <ColumnContainer key={index}>
                      <FooterTitle>{Titulo}</FooterTitle>
                      {links &&
                        links.map(
                          (
                            { nombre, url, icono, placeholder, type },
                            index
                          ) => {
                            if (url) {
                              function footerUrl() {
                                switch (url) {
                                  case '/':
                                    scrollTo('/');
                                    break;
                                  case '/cursos':
                                    scrollTo('/cursos', 70);
                                    break;
                                  case '/in-company':
                                    setInCompanyModalIsOpen(true);
                                    break;
                                  case '/contacto':
                                    setContactoModalIsOpen(true);
                                    break;
                                  default:
                                    break;
                                }
                              }
                              return (
                                <FooterAnchor
                                  key={index + 100}
                                  onClick={footerUrl}
                                  icono={icono}
                                  href={url[0] !== '/' ? url : '#'}
                                  target="_blank"
                                >
                                  {icono && (
                                    <SocialMediaIcon
                                      key={index}
                                      type={type}
                                      size={20}
                                    />
                                  )}
                                  {nombre}
                                </FooterAnchor>
                              );
                            } else {
                              return (
                                <div key={index + 20}>
                                  <FooterParragraph>
                                    {nombre} {url}
                                  </FooterParragraph>
                                  <EmailForm compact={compact}>
                                    <StyledInput
                                      type="text"
                                      id="correo-electronico"
                                      name="correo-electronico"
                                      placeholder={placeholder}
                                      onChange={(e) =>
                                        handleChange(e.target.value)
                                      }
                                      value={completedEmail || ''}
                                    />
                                    <EnviarMail
                                      onClick={(e) => sendEmail(e)}
                                      disabled={isButtonDisabled}
                                    >
                                      Enviar
                                    </EnviarMail>
                                  </EmailForm>
                                </div>
                              );
                            }
                          }
                        )}
                    </ColumnContainer>
                  );
                })}
          </ContentContainer>
        </FooterContainer>
      )}
      <IcaroInCompanyModal
        modalIsOpen={inCompanyModalIsOpen}
        closeModal={() => setInCompanyModalIsOpen(false)}
      />
      <ContactoModal
        modalIsOpen={ContactoModalIsOpen}
        closeModal={() => setContactoModalIsOpen(false)}
      />
    </>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  color: ${theme.color.white};
  min-height: 300px;
  background: ${theme.color.verticalGradient};
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1095px;
  margin: ${({ mobile }) => (mobile ? 'auto auto auto 1.93rem' : 'auto')};
  padding-top: 40px;
  padding-bottom: ${({ mobile }) => (mobile ? '2.5rem' : '0')};
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  gap: ${({ mobile }) => (mobile ? '0.2rem' : '60px')};
  align-items: flex-start;
  justify-content: space-between;
`;
const ColumnContainer = styled.div`
  flex: 1;
`;

const FooterTitle = styled.h3`
  font-family: ${theme.fontFamily.secondary};
  text-transform: capitalize;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4375rem;
  letter-spacing: 0em;
  text-align: left;
`;
const FooterParragraph = styled.p`
  font-family: ${theme.fontFamily.secondary};
  color: ${theme.color.white};
  text-decoration: none;
  display: block;
  font-size: 0.875rem;
`;

const FooterAnchor = styled.a`
  font-family: ${theme.fontFamily.secondary};
  color: ${theme.color.white};
  font-size: 0.875rem;
  display: ${({ icono }) => (icono ? ' flex' : 'block')};
  align-items: center;
  flex-wrap: wrap;
  text-decoration: none;
  margin: 10px 0;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
  &:visited,
  :active {
    text-decoration: none;
    color: ${theme.color.white};
  }
`;

const EmailForm = styled.form`
  display: flex;
  gap: 5px;
  flex-direction: ${({ compact }) => (compact ? 'column' : 'row')};
`;

const StyledInput = styled.input`
  border: 1px solid ${theme.color.white};

  :focus {
    border: 1px solid ${theme.color.white};
    outline: none;
  }
`;

const EnviarMail = styled.button`
  border-radius: 5px;
  padding: 5px 10px;
  background-color: rgb(255, 255, 255);
  border: none;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  color: ${({ disabled }) =>
    disabled ? theme.color.disabled : theme.color.darkBlue};
  font-size: 0.825rem !important;
`;

export default Footer;
