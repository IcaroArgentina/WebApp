import { CgTrash } from 'react-icons/cg';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const DeleteIcon = (props) => {
  const handleClick = (e) => {
    props.onClick && props.onClick();
  };

  return (
    <Container onClick={handleClick} {...props}>
      <CgTrash size={30} className="delete" />
    </Container>
  );
};

const Container = styled.div`
  .delete {
    color: ${({ isDisabled }) =>
      isDisabled ? theme.color.grey2 : theme.color.darkGrey};

    ${({ marginTop }) => marginTop && `margin-top:${marginTop}`};

    :hover {
      color: ${({ isDisabled }) => !isDisabled && theme.color.redError};
    }
  }
`;
export default DeleteIcon;
