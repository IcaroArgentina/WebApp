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
	const [carousel, setCarousel] = useState([]);
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
			collection(db, 'CarouselContent'),
			(snapshot) => setCarousel(snapshot.docs.map((doc) => doc.data())),
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
		if (usuariosList.length > 0) {
			usuariosList.forEach((elem) => {
				onSnapshot(
					collection(db, `Usuarios/${elem.uuid}/Inscripciones`),
					(snapshot) => {
						const inscripcion = snapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
							user: elem,
						}));
						return inscripcion.length > 0 && setInscripcionesList(inscripcion);
					},

					(error) => console.log('error', error)
				);
				onSnapshot(
					collection(db, `Usuarios/${elem.uuid}/Consultas`),
					(snapshot) => {
						const chats = snapshot.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
							user: elem,
						}));
						return chats.length > 0 && setConsultasChats(chats);
					},

					(error) => console.log('error', error)
				);
			});
		}
	}, [usuariosList.length]); //eslint-disable-line

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
				carousel,
				setCarousel,
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
			}}>
			{children}
		</projectContext.Provider>
	);
};

export default ProjectContext;
