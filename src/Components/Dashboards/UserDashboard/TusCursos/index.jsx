import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import CurrentCourseCard from './../CurrentCourseCard/index';
import Loader from '../../../Shared/Loader';
import NoCourses from './../../../NoCourses/index';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useIsMobile } from '../../../../Hooks/Client';

const TusCursos = ({ currentUser, inscribedCourses, setInscribedCourses }) => {
  const mobile = useIsMobile();
  const { course } = useContext(projectContext);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (course.length > 0 && currentUser) {
      onSnapshot(
        collection(db, `Usuarios/${currentUser.uid}/Inscripciones`),
        (snapshot) => {
          const inscripcion = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setInscribedCourses(inscripcion);
          setPending(false);
        },

        (error) => console.log('error', error)
      );
    }
  }, [course, currentUser]); //eslint-disable-line

  return (
    <TusCursosMainContainer mobile={mobile}>
      <TitleContainer mobile={mobile}>
        <Title mobile={mobile}>Tus cursos</Title>
      </TitleContainer>
      {pending ? (
        <Loader />
      ) : (
        <>
          <CardContainer mobile={mobile}>
            {inscribedCourses.filter(
              (item) => item.estadoInscripcion === 'Aprobada'
            ).length > 0 ? (
              inscribedCourses
                .filter((item) => item.estadoInscripcion === 'Aprobada')
                .map((elem, index) => {
                  const courseInfo = course.find((item) => {
                    return item.nombre === elem.inscripcionCurso;
                  });
                  return (
                    courseInfo && (
                      <CurrentCourseCard key={index} course={courseInfo} />
                    )
                  );
                })
            ) : (
              <NoCourses />
            )}
          </CardContainer>
        </>
      )}
    </TusCursosMainContainer>
  );
};

export default TusCursos;

const TusCursosMainContainer = styled.div`
  width: 100%;
  height: ${({ mobile }) => (mobile ? 'fit-content' : '22.82rem')};
  background: #ffffff;
  box-shadow: 0px 0px 10px #dadada;
  border-radius: 5px;
  margin-bottom: ${({ mobile }) => (mobile ? '2.5rem' : '1.3%')};
  display: flex;
  flex-direction: column;
  padding: 0 0 1.5rem 0;
`;

const TitleContainer = styled.div`
  display: ${({ mobile }) => (mobile ? null : 'flex')};
  flex-direction: ${({ mobile }) => (mobile ? null : 'row')};
  justify-content: ${({ mobile }) => (mobile ? null : 'space-between')};
  align-items: center;
  padding: ${({ mobile }) =>
    mobile ? '1.25rem 0 0.5rem 0' : '1.25rem 0 1.25rem 0'};
  margin: 0 1.87rem;
`;
const Title = styled.h5`
  font-family: ${theme.fontFamily.primary};
  margin: 0;
  font-weight: 700;
  font-size: ${({ mobile }) => (mobile ? '1rem' : '1.25rem')};
  line-height: 24px;
  color: #29343e;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.62rem;

  ${({ mobile }) => mobile && 'overflow-x: scroll;'};

  height: ${({ mobile }) => (mobile ? '100%' : '74%')};
  margin: 0 1.87rem;
  flex: 1;

  ${({ mobile }) =>
    !mobile &&
    `::-webkit-scrollbar {
		height: 0.8rem;
	}`};
  ${({ mobile }) =>
    !mobile &&
    `::-webkit-scrollbar-thumb {
		
		background-color: ${theme.color.grey};
		border-radius: 10px;
	} `};
`;
