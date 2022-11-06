import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';
import StyledButton from './../Shared/Buttons/StyledButton/index';
import { scrollTo } from '../../Utils/index';
import styled from 'styled-components';
import theme from './../../Theme/base';
import { useIsMobile } from '../../Hooks/Client';

const NoCourses = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const mobile = useIsMobile();

  const handleClick = () => {
    scrollTo(location, navigate, '/cursos', 70);
  };
  return (
    <Container mobile={mobile}>
      <TextContainer mobile={mobile}>
        <StyledTitle>No estás inscripto a ningún curso</StyledTitle>
        <StyledText>
          Encuentra las herramientas que necesitas, aprendiendo como nunca antes
          lo habías hecho y seguí creciendo en tu carrera profesional.
        </StyledText>
        <StyledButton
          text="Ver cursos"
          padding={mobile ? '12px 0px' : '10px 7.5rem'}
          width={mobile ? '100%' : 'unset'}
          borderRadius="10px"
          fontSize="1rem"
          fontWeight="700"
          lineHeight="1.5rem"
          onClickEvent={handleClick}
        />
      </TextContainer>
      {!mobile && (
        <Img
          src="https://firebasestorage.googleapis.com/v0/b/icaro-project.appspot.com/o/NoCoursesImg.png?alt=media&token=e8844638-182d-4e30-b4f7-e598f7168864"
          alt="Sin comisiones disponibles"
        />
      )}
    </Container>
  );
};

export default NoCourses;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  align-items: center;
  margin: 0 0;
  width: 100%;
  gap: 0 7.5rem;
`;

const TextContainer = styled.div`
  width: ${({ mobile }) => (mobile ? '100%' : '45%')};
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const StyledTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  font-family: ${theme.fontFamily.primary};
`;

const StyledText = styled.p`
  font-family: ${theme.fontFamily.primary};
`;

const Img = styled.img`
  width: 230px;
`;
