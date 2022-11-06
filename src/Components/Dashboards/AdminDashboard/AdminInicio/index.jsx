import React, { useContext, useEffect, useState } from 'react';

import Loader from '../../../Shared/Loader';
import { SIDEMENUCATEGORIES } from '../../../../Constants/AdminDashboard';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const AdminInicio = ({ handleClick }) => {
  const mobile = useIsMobile();
  const { course } = useContext(projectContext);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (course && SIDEMENUCATEGORIES) {
      setPending(false);
    }
  }, [course]);

  if (pending) return <Loader />;

  return (
    <>
      <TitleContainer mobile={mobile}>
        <Title mobile={mobile}>Accesos Directos</Title>
      </TitleContainer>

      <TusCursosMainContainer>
        <CardContainer mobile={mobile}>
          {SIDEMENUCATEGORIES.filter((item) => item.isShown).map(
            (elem, index) => {
              return (
                <Card key={`${elem.menuName}${elem.id}${index}`}>
                  <TitleContainer mobile={mobile}>
                    <Title mobile={mobile}>{elem.menuName}</Title>
                  </TitleContainer>
                  {elem.actions &&
                    elem.actions.map((item, i) => {
                      return (
                        <StyledButton
                          onClick={(e) =>
                            handleClick(index, elem.menuName, item.url)
                          }
                          key={`${item.url}${elem.id}${i}`}
                        >
                          {item.name}
                        </StyledButton>
                      );
                    })}
                </Card>
              );
            }
          )}
        </CardContainer>
      </TusCursosMainContainer>
    </>
  );
};

const TusCursosMainContainer = styled.div`
  width: 90%;
  background: #ffffff;
  margin: auto;

  box-shadow: 0px 0px 10px #dadada;
  border-radius: 5px;
  margin-bottom: 1.3%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: ${({ mobile }) => (mobile ? null : 'flex')};
  flex-direction: ${({ mobile }) => (mobile ? null : 'row')};
  justify-content: ${({ mobile }) => (mobile ? null : 'space-between')};
  align-items: center;
  padding: 1.25rem 0 1.25rem 0;
  margin: 0 1.87rem;
`;
const Title = styled.h5`
  font-family: ${({ mobile }) =>
    mobile ? null : `${theme.fontFamily.primary}`};
  margin: 0;
  font-weight: 700;
  font-size: ${({ mobile }) => (mobile ? null : '1.25rem')};
  line-height: 24px;
  color: #29343e;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  gap: 0.62rem;
  height: 74%;
  margin: 0 1.87rem;
`;

const Card = styled.div`
  width: 20rem !important;
  margin: 0 0 1rem 0;
  background: #ffffff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 80%;
  margin: 10px auto;
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.darkBlue};
  border-radius: 10px;
  padding: ${(mobile) => (mobile ? '4px 12px 2px 12px' : '5px 13px')};
  cursor: pointer;
  ${({ width }) => width && `width: ${width}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ mobile }) => (mobile ? '10px' : '16px')};
  line-height: ${({ mobile }) => (mobile ? '14px' : '24px')};
  text-align: center;
  color: ${theme.color.darkBlue};
`;

export default AdminInicio;
