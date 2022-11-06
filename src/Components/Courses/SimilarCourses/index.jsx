import Card from '../../CursosCards/Card';
import DotIndicatorCards from '../../CursosCards/DotIndicatorCards/index';
import styled from 'styled-components';
import theme from '../../../Theme/base';
import { useIsMobile } from '../../../Hooks/Client';
import { useState } from 'react';
import { getSimilarCourses } from '../../../Utils';

const SimilarCourses = ({ course, courseList }) => {
  const { CategoriaID } = course;
  const [index, setIndex] = useState(0);
  const [relatedCourses] = useState(
    getSimilarCourses(courseList, CategoriaID, course)
  );

  const mobile = useIsMobile();

  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX < touchstartX) {
      setIndex(
        index === getSimilarCourses(courseList, CategoriaID, course).length - 1
          ? 0
          : index + 1
      );
    }
    if (touchendX > touchstartX) {
      setIndex(
        index === 0
          ? getSimilarCourses(courseList, CategoriaID, course).length - 1
          : index - 1
      );
    }
  }

  function onTouchStart(e) {
    touchstartX = e.changedTouches[0].screenX;
  }

  function onTouchEnd(e) {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  }

  return (
    <SimilarCoursesContainer mobile={mobile}>
      {relatedCourses.length > 1 ? (
        <>
          {' '}
          <Title mobile={mobile}>Cursos Similares</Title>
          <CardsContainer
            length={getSimilarCourses(courseList, CategoriaID, course).length}
            gap={1}
            mobile={mobile}
            index={index}
            onTouchStart={(e) => onTouchStart(e)}
            onTouchEnd={(e) => onTouchEnd(e)}
          >
            {getSimilarCourses(courseList, CategoriaID, course).map(
              (elem, index) => (
                <Card
                  info={elem}
                  key={index}
                  isMobile={mobile}
                  overridecolor={CategoriaID}
                />
              )
            )}
          </CardsContainer>
          {mobile &&
            getSimilarCourses(courseList, CategoriaID, course).length > 1 && (
              <DotIndicatorWrapper>
                <DotIndicatorCards
                  index={index}
                  setIndex={setIndex}
                  length={
                    getSimilarCourses(courseList, CategoriaID, course).length
                  }
                  overrideColor="grey"
                  course={course}
                />
              </DotIndicatorWrapper>
            )}
        </>
      ) : null}
    </SimilarCoursesContainer>
  );
};

const SimilarCoursesContainer = styled.div`
  margin: 50px 0;
  ${({ mobile }) => mobile && 'padding: 0 1.93rem'};
  ${({ mobile }) => mobile && 'overflow: hidden'};
`;
const Title = styled.h5`
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  color: ${theme.color.darkGrey};
  margin: ${({ mobile }) => (mobile ? '' : '0px')};
`;

const getCalcString = (index, gap, positive) => {
  const sign = positive ? '' : '-';
  const percentage = index * 65;
  const action = positive ? '+' : '-';
  const pixels = index * gap;

  return `calc(${sign}${percentage}% ${action} ${pixels}px + 18%)`;
};

const isMobileStyles = (gap, length, index) => {
  return `
		overflow: hidden;
		min-height: 300px;
		display: grid;
		grid-template-columns: repeat(${length}, minmax(0, 1fr));
		column-gap: ${gap}px;
		width: calc(
			${length * 65}% +
				${gap * (length - 1)}px
		);
		margin-left: ${getCalcString(index, gap, false)};
		transition: margin .5s;
	`;
};

const desktopStyles = () => {
  return `
	width: 100%;
	padding: 20px 0;
	margin-left: ${({ containerPosition }) =>
    containerPosition > 0 && containerPosition}px;
	// transition: margin 1s;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: 20px;
	flex-wrap: wrap;
`;
};

const CardsContainer = styled.div`
  ${({ mobile, gap, length, index }) =>
    mobile ? isMobileStyles(gap, length, index) : desktopStyles()}
`;

const DotIndicatorWrapper = styled.div`
  margin: 20px auto;
  width: fit-content;
`;

export default SimilarCourses;
