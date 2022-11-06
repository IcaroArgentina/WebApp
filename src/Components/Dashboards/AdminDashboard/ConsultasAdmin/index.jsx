import { doc, updateDoc } from 'firebase/firestore';
import { errorToast, successToast } from '../../../Shared/Toasts/ToastList';
import { useContext, useState } from 'react';

import { CONSULTASROWS } from '../../../../Constants/Consultas';
import ConfirmationModal from '../../../Shared/Modals/ConfirmationModal';
import ConsultasModalAdmin from './ConsultasModalAdmin';
import DeleteIcon from '../../../Shared/Icons/DeleteIcon';
import ForwardIcon from '../../../Shared/Icons/ForwardIcon';
import Spacer from '../../../Shared/Spacer';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';

const ConsultasAdmin = ({ usuariosList, consultasChat }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [forwardMessageOpen, setForwardMessageOpen] = useState(false);

  const { toastList, setToastList } = useContext(projectContext);

  function showToastFnc() {
    showToast('success', 'Se ha enviado su mensaje');
    setTimeout(() => {
      setToastList([]);
    }, 3000);
  }

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
    if (!selected.isDeleted) {
      setSelectedChat(selected);
      setIsOpen(true);
    }
  }

  const markAsRead = async (selected) => {
    selected.mensajes[selected.mensajes.length - 1].read = true;
    const ref = doc(
      db,
      `Usuarios/${selected.user.uuid}/Consultas`,
      selected.id
    );

    await updateDoc(ref, { mensajes: selected.mensajes });
  };

  function openForwardMessage(selected) {
    setSelectedChat(selected);
    setForwardMessageOpen(true);
    const lastMsg = selected?.mensajes[selected.mensajes.length - 1];
    if (lastMsg?.preguntaEstudiante) {
      markAsRead(selected);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleDelete() {
    const ref = doc(
      db,
      `Usuarios/${selectedChat.user.uuid}/Consultas`,
      selectedChat.id
    );
    updateDoc(ref, { isDeleted: true });
    showToast('success', 'Se ha eliminado la consulta');
  }

  return (
    <div>
      <TitleContainer>
        <Title>Listado de Consultas</Title>
        <Spacer height={70} />
      </TitleContainer>
      <TableContent>
        <TableHeader>
          {CONSULTASROWS.map((elem) => (
            <TableColumn key={`${elem.nombre}${elem.id}`} isHeader>
              {elem.nombre}
            </TableColumn>
          ))}
        </TableHeader>
        {consultasChat.length > 0 ? (
          consultasChat.map((el, index) => {
            return (
              <TableRow key={`${el.id}${index}`}>
                <TableColumn>{index + 1}</TableColumn>
                <TableColumn>
                  {el.user.name} {el.user.lastname}
                </TableColumn>
                <TableColumn>{el.motivo}</TableColumn>
                <TableColumn>{el.mensajes[0].date}</TableColumn>
                <TableColumn
                  bgcolor={
                    el.isDeleted
                      ? theme.color.redError
                      : !el.mensajes[el.mensajes.length - 1].read &&
                        theme.color.darkBlue
                  }
                >
                  {el.isDeleted
                    ? 'Eliminada'
                    : el.mensajes[el.mensajes.length - 1].read
                    ? 'Leido'
                    : 'Sin Leer'}
                </TableColumn>
                <TableColumn isEditDelete>
                  <FowardContainer onClick={(e) => openForwardMessage(el)}>
                    <ForwardIcon />
                  </FowardContainer>
                  <div onClick={(e) => openDeleteModal(el)}>
                    <DeleteIcon />
                  </div>
                </TableColumn>
              </TableRow>
            );
          })
        ) : (
          <p>No tienes consultas por responder</p>
        )}
      </TableContent>
      <ConfirmationModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalTitle="Eliminar Consulta"
        cancelButtonContent="Cancelar"
        confirmButtonContent="Eliminar"
        confirmButtonSubmit={handleDelete}
        withCloseButton
        mainColor={theme.color.redError}
      >
        <ModalContent>
          <p>¿Confirma que desea eliminar la consulta?</p>
          <b>
            {selectedChat?.user?.name} {selectedChat?.user?.lastname}
          </b>
          <p>
            <b> {selectedChat?.motivo}</b>
          </p>
        </ModalContent>
      </ConfirmationModal>

      <ConsultasModalAdmin
        currentConsulta={selectedChat}
        chatModalOpen={forwardMessageOpen}
        setChatModalOpen={setForwardMessageOpen}
        loggedUser={selectedChat?.user}
        showToast={showToastFnc}
      />
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
  ${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
  background-color: ${({ bgcolor }) => bgcolor && bgcolor};
  color: ${({ bgcolor }) => bgcolor && theme.color.white};
  ${({ isEditDelete }) =>
    isEditDelete && 'display: flex; justify-content: space-evenly'};
  text-align: center;
`;
const FowardContainer = styled.div`
  text-decoration: none;
  color: ${theme.color.darkGrey};
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

export default ConsultasAdmin;
