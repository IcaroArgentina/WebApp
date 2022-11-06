import { useState, useEffect } from 'react';
import { projectContext } from '../Context/ProjectContext';
import { useContext } from 'react';
import theme from '../Theme/base';
import { normalizeSelectOptions } from '../Utils';

const isClient = () => typeof window === 'object';

const getWindowSize = () => {
  if (!isClient()) return null;

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const useIsMobile = () => {
  const windowSize = useWindowSize();
  return windowSize && windowSize.width < 451;
};

export const useIsCompact = () => {
  const windowSize = useWindowSize();
  return windowSize && windowSize.width < 800;
};

export const useIsSidebarHidden = () => {
  const windowSize = useWindowSize();
  return windowSize && windowSize.width < 1200;
};

export const useIsExtrawide = () => {
  const windowSize = useWindowSize();
  return windowSize && windowSize.width > 1800;
};

export const usePagePadding = () => {
  const isCompact = useIsCompact();
  return 25 * (isCompact ? 1 : 2);
};

export const useGetColors = (categID) => {
  const { categoriesCompleteList } = useContext(projectContext);
  const defaultColors = {
    herrDig: '#88106E',
    dat: '#34A0C2',
    amb: '#2EBE16',
    prog: '#34C2A9',
    dipYProgEsp: '#D87C11',
    disYMkt: '#D92A49',
  };
  const colorElem = categoriesCompleteList.filter(
    (a) => a.CategoriaID === categID
  )[0]?.color;
  return `${colorElem || defaultColors.categID || theme.color.blue}`;
};

export const useGetOptions = (type) => {
  const { nextCourses, course } = useContext(projectContext);

  switch (type) {
    case 'comisiones':
      return normalizeSelectOptions(nextCourses);

    case 'cursos':
      return normalizeSelectOptions(course);
    default:
      break;
  }
};
