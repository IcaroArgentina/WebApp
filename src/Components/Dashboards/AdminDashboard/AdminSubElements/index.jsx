import {
  BASICCOMISION,
  COMISIONESFIELDS,
} from '../../../../Constants/Comisions';
import {
  BASICCURSO,
  CURSOSCFIELDS,
} from '../../../../Constants/Cursos/index.js';
import {
  BASICINSCRIPCION,
  INSCRIPCIONESFIELDS,
} from '../../../../Constants/Inscripciones';
import { collection, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';

import AdminInicio from '../AdminInicio';
import { CATEGORYFIELDS } from '../../../../Constants/Category/index.js';
import CategoriasAdmin from '../CategoriasAdmin';
import ComisionesAdmin from '../ComisionesAdmin';
import ConsultasAdmin from '../ConsultasAdmin';
import CursosAdmin from '../CursosAdmin';
import EditElementContainer from '../../../../Containers/EditElementContainer';
import EditInscripcionContainer from '../../../../Containers/EditInscripcionContainer';
import InscripcionesAdmin from '../InscripcionesAdmin';
import Loader from '../../../Shared/Loader';
import NewElementContainer from '../../../../Containers/NewElementContainer';
import NewInscripcionContainer from '../../../../Containers/NewInscripcionContainer';
import PerfilAdmin from '../PerfilAdmin';
import SolicitudesAdmin from '../SolicitudesAdmin';
import { USUARIOSFIELDS } from '../../../../Constants/Usuarios';
import UsuariosAdmin from '../UsuariosAdmin';
import db from '../../../../Firebase/index';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { sortArrayByDate } from '../../../../Utils';

const AdminSubElements = ({ selectedTab, handleClick }) => {
  const {
    courseCompleteList,
    categoriesCompleteList,
    nextCoursessCompleteList,
    usuariosList,
    currentUser,
    inscripcionesList,
    consultasChat,
  } = useContext(projectContext);
  const [pending, setPending] = useState(true);
  const location = useLocation();
  const [consultas, setConsultas] = useState();

  useEffect(() => {
    if (
      courseCompleteList.length > 0 &&
      categoriesCompleteList.length > 0 &&
      nextCoursessCompleteList.length > 0 &&
      usuariosList.length > 0
    ) {
      setPending(false);
    }
  }, [
    courseCompleteList,
    categoriesCompleteList,
    nextCoursessCompleteList,
    usuariosList,
  ]);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(
        collection(db, `Admin/${currentUser.uid}/Consultas`),
        (snapshot) =>
          setConsultas(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          ),
        (error) => console.log('error', error)
      );
    }
  }, [currentUser]);

  function getSelectedTab() {
    switch (selectedTab) {
      case 'Inicio':
        return <AdminInicio handleClick={handleClick} />;
      case 'Cursos':
        return (
          <>
            {location.pathname.includes('new/curso') ? (
              <NewElementContainer
                fieldsList={CURSOSCFIELDS}
                title="Nuevo Curso"
                type="Cursos"
                selectOptions={categoriesCompleteList}
                basicData={BASICCURSO}
              />
            ) : location.pathname.includes('admin/edit/curso/') ? (
              <EditElementContainer
                fieldsList={CURSOSCFIELDS}
                title="Editar Curso"
                type="Cursos"
                selectOptions={categoriesCompleteList}
              />
            ) : (
              <CursosAdmin cursos={courseCompleteList} />
            )}
          </>
        );

      case 'Categorias':
        return (
          <>
            {location.pathname.includes('new/categoria') ? (
              <NewElementContainer
                fieldsList={CATEGORYFIELDS}
                title="Nueva Categoria"
                type="Categorias"
                basicData={{}}
              />
            ) : location.pathname.includes('admin/edit/categoria/') ? (
              <EditElementContainer
                fieldsList={CATEGORYFIELDS}
                title="Editar Categoria"
                type="Categorias"
              />
            ) : (
              <>
                <CategoriasAdmin categorias={categoriesCompleteList} />
              </>
            )}
          </>
        );
      case 'Comisiones':
        return (
          <>
            {location.pathname.includes('new/comision') ? (
              <NewElementContainer
                selectOptions={courseCompleteList}
                fieldsList={COMISIONESFIELDS}
                type="Comisiones"
                title="Crear Comision"
                basicData={BASICCOMISION}
              />
            ) : location.pathname.includes('admin/edit/comision/') ? (
              <EditElementContainer
                selectOptions={courseCompleteList}
                fieldsList={COMISIONESFIELDS}
                type="Comisiones"
                title="Editar Comision"
              />
            ) : (
              <>
                <ComisionesAdmin comisiones={nextCoursessCompleteList} />;
              </>
            )}
          </>
        );
      case 'Usuarios':
        return (
          <>
            {location.pathname.includes('admin/edit/usuario/') ? (
              <EditElementContainer
                fieldsList={USUARIOSFIELDS}
                title="Editar Usuario"
                type="Usuarios"
              />
            ) : (
              <UsuariosAdmin
                usuariosList={usuariosList.filter(
                  (el) => el.rol === 'estudiante'
                )}
              />
            )}
          </>
        );
      case 'Solicitudes':
        return (
          <SolicitudesAdmin usuariosList={usuariosList} consultas={consultas} />
        );
      case 'Consultas':
        return (
          <ConsultasAdmin
            usuariosList={usuariosList}
            consultasChat={sortArrayByDate(consultasChat)}
          />
        );
      case 'Inscripciones':
        return (
          <>
            {location.pathname.includes('new/inscripcion') ? (
              <NewInscripcionContainer
                userOptions={usuariosList}
                fieldsList={INSCRIPCIONESFIELDS}
                type="Inscripciones"
                title="Crear Inscripcion"
                basicData={BASICINSCRIPCION}
                comisionesOptions={nextCoursessCompleteList}
              />
            ) : location.pathname.includes('admin/edit/inscripcion/') ? (
              <EditInscripcionContainer
                userOptions={usuariosList}
                fieldsList={INSCRIPCIONESFIELDS}
                type="Inscripciones"
                title="Editar Inscripcion"
                comisionesOptions={nextCoursessCompleteList}
                inscripcionesList={inscripcionesList}
              />
            ) : (
              <>
                <InscripcionesAdmin
                  usuariosList={usuariosList}
                  inscripcionesList={inscripcionesList}
                />
              </>
            )}
          </>
        );
      case 'Mi Perfil':
        return (
          <>{location.pathname.includes('/admin/perfil') && <PerfilAdmin />}</>
        );

      default:
        return <AdminInicio handleClick={handleClick} />;
    }
  }

  if (pending) {
    return <Loader />;
  }

  return <AdminSubElementsContent>{getSelectedTab()}</AdminSubElementsContent>;
};

const AdminSubElementsContent = styled.div`
  float: left;
  min-height: 80vh !important;
  width: 80%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

export default AdminSubElements;
