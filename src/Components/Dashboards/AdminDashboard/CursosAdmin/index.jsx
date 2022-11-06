import { doc, updateDoc } from 'firebase/firestore';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';
import { useContext, useState } from 'react';

import { CURSOSROWS } from '../../../../Constants/Cursos/index.js';
import ConfirmationModal from '../../../Shared/Modals/ConfirmationModal';
import EditIcon from '../../../Shared/Icons/EditIcon';
import HideIcon from '../../../Shared/Icons/HideIcon';
import ShowIcon from '../../../Shared/Icons/ShowIcon';
import Spacer from '../../../Shared/Spacer';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useGetColors } from '../../../../Hooks/Client';
import { useNavigate } from 'react-router-dom';

const CursosAdmin = ({ cursos }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const navigate = useNavigate();
  const { toastList, setToastList } = useContext(projectContext);

  function showToast(type, content) {
    let selectedToast = [];
    switch (type) {
      case 'success':
        selectedToast = successToast(content, toastList);
        break;
      case 'error':
        selectedToast = errorToast(content, toastList);
        break;
      default:
        break;
    }
    setToastList([selectedToast]);
  }

  function openDeleteModal(selected) {
    setSelectedCourse(selected);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleClick() {
    navigate('/admin/new/curso', { replace: false });
  }

  function handleEdit(elem) {
    navigate(`/admin/edit/curso/${elem.uuid}`, { replace: false });
  }

  function handleToggleShow() {
    const ref = doc(db, `NuevosCursos`, selectedCourse.uuid);
    updateDoc(ref, { isHidden: !selectedCourse.isHidden });
    showToast('success', 'Se ha modificado el elemento');
  }

  return (
    <div>
      <TitleContainer>
        <Title>Listado de Cursos</Title>
        <NewCourseButton onClick={handleClick}> + Nuevo Curso</NewCourseButton>
      </TitleContainer>
      <TableContent>
        <TableHeader>
          {CURSOSROWS.map((elem) => (
            <TableColumn key={`${elem.nombre}${elem.id}`} isHeader>
              {elem.nombre}
            </TableColumn>
          ))}
        </TableHeader>

        {cursos.map((el, index) => {
          return (
            <TableRow key={`${el.href}${index}`} isHidden={el.isHidden}>
              <TableColumn>{index + 1}</TableColumn>
              <TableColumn>{el.nombre}</TableColumn>
              <TableColumn bgcolor={el.CategoriaID}>{el.categoria}</TableColumn>
              <TableColumn>{el.modalidad}</TableColumn>
              <TableColumn isEditDelete>
                <div onClick={(e) => handleEdit(el)}>
                  <EditIcon />
                </div>
                <div onClick={(e) => openDeleteModal(el)}>
                  {el.isHidden ? <ShowIcon /> : <HideIcon />}
                </div>
              </TableColumn>
            </TableRow>
          );
        })}
      </TableContent>
      <ConfirmationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalTitle={
          selectedCourse?.isHidden ? 'Mostrar Curso' : 'Ocultar Curso'
        }
        cancelButtonContent="Cancelar"
        confirmButtonContent={selectedCourse?.isHidden ? 'Mostrar' : 'Ocultar'}
        confirmButtonSubmit={handleToggleShow}
        withCloseButton
        mainColor={theme.color.redError}
      >
        <ModalContent>
          <p>
            ¿Confirma que desea{' '}
            {selectedCourse?.isHidden ? 'mostrar' : 'ocultar'} el siguiente
            curso?
          </p>
          <b>{selectedCourse?.nombre}</b>
        </ModalContent>
      </ConfirmationModal>
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

const NewCourseButton = styled.button`
  background-color: ${theme.color.darkBlue};
  color: ${theme.color.white};
  padding: 10px 25px;
  border-radius: 10px;
  border: 1px solid ${theme.color.darkBlue};
  cursor: pointer;
  margin: 10px;
  font-family: ${theme.fontFamily.tertiary};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
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
  ${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
  background-color: ${({ bgcolor }) => bgcolor && useGetColors(bgcolor)};
  color: ${({ bgcolor }) => bgcolor && theme.color.white};
  ${({ isEditDelete }) =>
    isEditDelete && 'display: flex; justify-content: space-evenly'};
  text-align: center;
`;

const ModalContent = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: ${theme.color.grey};
`;

export default CursosAdmin;
