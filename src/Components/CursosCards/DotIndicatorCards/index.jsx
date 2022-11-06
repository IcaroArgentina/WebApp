import styled from 'styled-components';
import theme from '../../../Theme/base';

const dotSize = 15;

const Flex = styled.div`
  height: ${dotSize}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: -${dotSize / 2}px;
`;

const DotDrawing = styled.div`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize / 2}px;
  box-sizing: border-box;
  border: thin solid ${({ color }) => color};
  background: ${({ color, isActive }) => (isActive ? color : 'none')};
`;

const DotClickable = styled.div`
  cursor: pointer;
  margin: -${dotSize / 2}px 0;
  padding: ${dotSize / 2}px;
`;

const textMaxWidth = 800;

const getTextAlign = (props) => {
  if (props.centered) return 'center';
  if (props.rightAligned) return 'right';

  return 'left';
};

const StyledText = styled.p`
  margin: 0;
  padding: 0;
  max-width: ${(props) => (props.centered ? 'none' : `${textMaxWidth}px`)};
  line-height: ${(props) => props.lineHeight}px;
  font-family: ${(props) => props.family}, sans-serif;
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight};
  color: ${({ theme, color, overrideColor }) =>
    overrideColor || color || theme.color.headerText};
  text-transform: ${(props) => (props.caps ? 'uppercase' : 'none')};
  font-style: ${(props) => (props.italics ? 'italic' : 'normal')};
  text-align: ${(props) => getTextAlign(props)};
  white-space: ${(props) => (props.noBreak ? 'nowrap' : 'normal')};
  margin-top: ${(props) => (props.withNewLineSpacing ? 20 : 0)}px;
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  ${(props) =>
    props.lines &&
    `
		overflow: hidden;
		display: -webkit-box;
		word-wrap: break-word;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: ${props.lines};
	`}
`;

const DotInfo = styled(StyledText)`
  margin-left: ${dotSize / 2}px;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
`;
const DotIndicatorCards = ({
  index,
  setIndex,
  selectedCategorie,
  length,
  overrideColor,
  withText,
  course,
}) => {
  const color = overrideColor;

  return (
    <Flex>
      {[...Array(length)].map((item, i) => (
        <DotClickable key={i} onClick={() => setIndex(i)}>
          <DotDrawing color={color} isActive={i === index} />
        </DotClickable>
      ))}
      {withText && (
        <DotInfo overrideColor={color}>
          {index + 1} of {length}
        </DotInfo>
      )}
    </Flex>
  );
};

export default DotIndicatorCards;
