import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useGetColors, useIsMobile } from '../../../Hooks/Client';
import { sortArrayByNroOrden } from '../../../Utils';

const StudentProgram = ({ course }) => {
  const { CategoriaID, planDeEstudioContent, PDF } = course;
  const mobile = useIsMobile();

  return (
    <StudentProgramContainer mobile={mobile}>
      <Title colorFilter={CategoriaID}>Programa de estudio</Title>
      <MainContent mobile={mobile}>
        {planDeEstudioContent &&
          sortArrayByNroOrden(planDeEstudioContent).map((element, index) => {
            return (
              <ParragraphContainer mobile={mobile} key={index}>
                <Type mobile={mobile}>{element.titulo}</Type>
                <Description mobile={mobile}>{element.contenido}</Description>
              </ParragraphContainer>
            );
          })}
      </MainContent>
      {PDF && (
        <DownloadLink
          href={PDF}
          target="_blank"
          rel="noreferrer"
          mobile={mobile}
        >
          Descargar programa completo
        </DownloadLink>
      )}
    </StudentProgramContainer>
  );
};

const StudentProgramContainer = styled.div`
  ${({ mobile }) => mobile && 'padding: 0 1.93rem'};
  ${({ mobile }) => mobile && 'display:flex'};
  ${({ mobile }) => mobile && 'flex-direction:column'};
`;

const Title = styled.h5`
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: ${({ colorFilter }) => useGetColors(colorFilter)};
  margin: 0px;
`;
const MainContent = styled.div`
  margin: ${({ mobile }) => (mobile ? '1.19rem 0 2.5rem 0' : '30px 0')};
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  flex-wrap: wrap;
  gap: 4%;
`;

const ParragraphContainer = styled.div`
  width: ${({ mobile }) => (mobile ? '100%' : '48%')};
`;
const Type = styled.p`
  font-family: ${theme.fontFamily.tertiary};
  color: ${theme.color.grey};
  font-style: normal;
  font-weight: bold;
  font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
  line-height: 18px;
`;

const Description = styled.p`
  font-family: ${theme.fontFamily.primary};
  color: ${theme.color.grey};
  text-align: justify;
  font-style: normal;
  font-weight: normal;
  font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1rem')};
  line-height: 18px;
  ${({ mobile }) => mobile && 'margin:0'};
`;

const DownloadLink = styled.a`
  text-decoration: none;
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.darkBlue};
  border-radius: 10px;
  padding: ${({ mobile }) => (mobile ? '0.75rem 0' : '10px 17px')};
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ mobile }) => (mobile ? '0.87rem' : '1.25rem')};
  line-height: 20px;
  text-align: center;
  color: ${theme.color.darkBlue};
`;

export default StudentProgram;
