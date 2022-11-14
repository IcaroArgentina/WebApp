import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import { sortArrayByNroOrden, sortArrayByOrdenValue } from '../Utils';

import db from '../../src/Firebase';

export const projectContext = createContext();

const ProjectContext = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [courseCompleteList, setCourseCompleteList] = useState([]);
  const [nextCourses, setNextCourses] = useState([]);
  const [nextCoursessCompleteList, setnextCoursessCompleteList] = useState([]);
  const [nombres, setNombres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesCompleteList, setcategoriesCompleteList] = useState([]);
  const [usuariosList, setUsuariosList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [is404, setIs404] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toastList, setToastList] = useState([]);
  const [consultasChat, setConsultasChats] = useState([]);
  const [inscripcionesList, setInscripcionesList] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, 'NuevosCursos'),
      (snapshot) => {
        const courseList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const orderedList = sortArrayByNroOrden(courseList);
        setCourseCompleteList(orderedList);
      },
      (error) => console.log('error', error)
    );

    onSnapshot(
      collection(db, 'NuevosCursos'),
      (snapshot) => {
        const courseList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const filteredList = courseList.filter((elem) => !elem.isHidden);
        const orderedList = sortArrayByNroOrden(filteredList);
        setCourse(orderedList);
      },
      (error) => console.log('error', error)
    );

    onSnapshot(
      collection(db, 'CategoriasCursos'),
      (snapshot) => {
        const catList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const orderedList = sortArrayByOrdenValue(catList);
        setcategoriesCompleteList(orderedList);
      },
      (error) => console.log('error', error)
    );

    onSnapshot(
      collection(db, 'CategoriasCursos'),
      (snapshot) => {
        const catList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const filteredList = catList.filter((elem) => !elem.isHidden);
        const orderedList = sortArrayByOrdenValue(filteredList);

        setCategories(orderedList);
      },
      (error) => console.log('error', error)
    );

    onSnapshot(
      collection(db, 'ComisionesCursos'),
      (snapshot) => {
        const comisionsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const orderedList = sortArrayByNroOrden(comisionsList);
        setnextCoursessCompleteList(orderedList);
      },
      (error) => console.log('error', error)
    );

    onSnapshot(
      collection(db, 'ComisionesCursos'),
      (snapshot) => {
        const comisionsList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uuid: doc.id,
        }));
        const filteredList = comisionsList.filter((elem) => !elem.isHidden);
        const orderedList = sortArrayByNroOrden(filteredList);
        setNextCourses(orderedList);
      },
      (error) => console.log('error', error)
    );

    // const getComisiones = async () => {
    // 	const q = query(
    // 		collection(db, 'ComisionesCursos'),
    // 		where('isHidden', '==', false)
    // 	);

    // 	const querySnapshot = await getDocs(q);
    // 	querySnapshot.forEach((doc) => {
    // 		console.log(doc.id, ' => ', doc.data());
    // 	});
    // };

    // getComisiones();

    onSnapshot(
      collection(db, 'Usuarios'),
      (snapshot) =>
        setUsuariosList(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            uuid: doc.id,
          }))
        ),
      (error) => console.log('error', error)
    );
  }, []);

  useEffect(() => {
    let nombresCursos = [];
    course.map((course) => (nombresCursos = [...nombresCursos, course.nombre]));

    setNombres(nombresCursos);
  }, [course]);

  return (
    <projectContext.Provider
      value={{
        course,
        setCourse,
        courseCompleteList,
        categories,
        setCategories,
        categoriesCompleteList,
        setcategoriesCompleteList,
        isLogin,
        setIsLogin,
        modalOpen,
        setModalOpen,
        usuariosList,
        setUsuariosList,
        nextCourses,
        setNextCourses,
        nextCoursessCompleteList,
        setnextCoursessCompleteList,
        nombres,
        setIs404,
        is404,
        isAdmin,
        setIsAdmin,
        toastList,
        setToastList,
        inscripcionesList,
        setInscripcionesList,
        consultasChat,
        setConsultasChats,
      }}
    >
      {children}
    </projectContext.Provider>
  );
};

export default ProjectContext;
