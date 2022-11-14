import { useEffect, useState } from 'react';

import CarouselCard from './CarouselCard/index';
import DotIndicator from './DotIndicator/index';
import styled from 'styled-components';
import { useIsMobile } from '../../Hooks/Client';
import { CAROUSELSLIDES } from '../../Constants/Carousel/Carousel';

const useCarouselTimer = (items, milliseconds = 5000) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((oldIndex) => (oldIndex + 1) % items.length);
    }, milliseconds);

    return () => clearTimeout(timeout);
  }, [index, items.length, milliseconds]);

  return [index, setIndex];
};

const Wrapper = styled.div`
  overflow: hidden;
`;

const getCalcString = (index, gap, positive) => {
  const sign = positive ? '' : '-';
  const percentage = index * 100;
  const action = positive ? '+' : '-';
  const pixels = index * gap;

  return `calc(${sign}${percentage}% ${action} ${pixels}px)`;
};

const Row = styled.div`
  height: ${({ mobile }) => (mobile ? null : '854px')};
  max-height: 100vh;
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, minmax(0, 1fr));
  column-gap: ${({ gap }) => gap}px;
  width: calc(
    ${({ length }) => length * 100}% +
      ${({ gap, length }) => gap * (length - 1)}px
  );
  margin-left: ${({ index, gap }) => getCalcString(index, gap, false)};
  transition: margin 1.5s;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  max-height: 100vh;
`;
const DotIndicatorWrapper = styled.div`
  position: absolute;
  top: 90%;
  width: 100%;
`;

const MainCarousel = ({ gap = 0, setIsLoginOpen, loggedUser }) => {
  const [index, setIndex] = useCarouselTimer(CAROUSELSLIDES);
  const [pending, setPending] = useState(true);
  const mobile = useIsMobile();

  useEffect(() => {
    if (CAROUSELSLIDES.length > 0) {
      setPending(false);
    }
  }, []);

  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX < touchstartX) {
      setIndex(index === CAROUSELSLIDES.length - 1 ? 0 : index + 1);
    }
    if (touchendX > touchstartX) {
      setIndex(index === 0 ? CAROUSELSLIDES.length - 1 : index - 1);
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
    <CarouselWrapper
      onTouchStart={(e) => onTouchStart(e)}
      onTouchEnd={(e) => onTouchEnd(e)}
    >
      <Wrapper>
        {pending ? null : (
          <>
            <Row
              mobile={mobile}
              index={index}
              gap={gap}
              length={CAROUSELSLIDES.length}
            >
              {CAROUSELSLIDES.map(({ Slide }, i, arr) => (
                <CarouselCard
                  key={i}
                  slide={Slide}
                  src={Slide.BgImageSrc}
                  index={index}
                  setIndex={setIndex}
                  setIsLoginOpen={setIsLoginOpen}
                  loggedUser={loggedUser}
                />
              ))}
            </Row>
            {CAROUSELSLIDES.length > 1 && (
              <DotIndicatorWrapper>
                <DotIndicator
                  index={index}
                  setIndex={setIndex}
                  length={CAROUSELSLIDES.length}
                  overrideColor="white"
                />
              </DotIndicatorWrapper>
            )}
          </>
        )}
      </Wrapper>
    </CarouselWrapper>
  );
};

export default MainCarousel;
