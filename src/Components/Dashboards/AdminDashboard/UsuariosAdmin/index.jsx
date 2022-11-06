import EditIcon from '../../../Shared/Icons/EditIcon';
import { Link } from 'react-router-dom';
import Spacer from '../../../Shared/Spacer';
import { USUARIOSROWS } from '../../../../Constants/Usuarios';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useGetColors } from '../../../../Hooks/Client';

const UsuariosAdmin = ({ usuariosList }) => {
  return (
    <div>
      <TitleContainer>
        <Title>Listado de Usuarios</Title>
        <Spacer height={70} />
      </TitleContainer>
      <TableContent>
        <TableHeader>
          {USUARIOSROWS.map((elem) => (
            <TableColumn key={`${elem.nombre}${elem.id}`} isHeader>
              {elem.nombre}
            </TableColumn>
          ))}
        </TableHeader>

        {usuariosList.map((el, index) => {
          return (
            <TableRow key={`${el.dni}`} isHidden={el.isHidden}>
              <TableColumn>{index + 1}</TableColumn>
              <TableColumn>
                {el.name} {el.lastname}
              </TableColumn>
              <TableColumn>{el.email}</TableColumn>
              <TableColumn>{el.dni}</TableColumn>
              <TableColumn isEditDelete>
                <EditContainer to={`/admin/edit/usuario/${el.uuid}`}>
                  <EditIcon />
                </EditContainer>
              </TableColumn>
            </TableRow>
          );
        })}
      </TableContent>
      <Spacer height={100} />
    </div>
  );
};

const TitleContainer = styled.div`
  display: flex;
  width: 85%;
  margin: auto;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-family: ${({ mobile }) =>
    mobile ? null : `${theme.fontFamily.primary}`};
  margin: 0;
  font-weight: 700;
  font-size: ${({ mobile }) => (mobile ? null : '1.25rem')};
  line-height: 24px;
  color: #29343e;
`;

const TableContent = styled.div`
  padding: 10px 20px;
`;
const TableHeader = styled.header`
  display: flex;
  gap: 10px;
  text-align: left;
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.color.darkGrey};
`;
const TableRow = styled.div`
  display: flex;
  text-align: left;
  gap: 10px;
  padding: 10px 0;
  ${({ isHidden }) => isHidden && `background-color: #757575; `}

  :hover {
    background-color: ${({ isHidden }) => !isHidden && ' #f1f1f1'};
    cursor: pointer;
  }
`;
const TableColumn = styled.div`
  flex: 1;
  max-width: 200px;
  word-break: break-word;
  ${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
  background-color: ${({ bgcolor }) => bgcolor && useGetColors(bgcolor)};
  color: ${({ bgcolor }) => bgcolor && theme.color.white};
  ${({ isEditDelete }) =>
    isEditDelete && 'display: flex; justify-content: space-evenly'};
  text-align: center;
`;
const EditContainer = styled(Link)`
  text-decoration: none;
  color: ${theme.color.darkGrey};
`;

export default UsuariosAdmin;
