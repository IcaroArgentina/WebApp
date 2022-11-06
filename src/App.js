import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import AdminPage from './Containers/AdminContainer';
import CoursesPages from './Containers/CoursesContainer';
import Footer from './Components/Footer';
import FooterContext from './Context/FooterContext';
import Header from './Components/Header';
import HomeContainer from './Containers/HomeContainer/index';
import Loader from './Components/Shared/Loader';
import LogIn from './Components/LogIn';
import NotFoundPage from './Containers/NotFoundPage';
import PasswordRecoveryModal from './Components/Shared/Modals/PasswordRecoveyModal';
import ProjectContext from './Context/ProjectContext';
import Register from './Containers/RegisterContainer';
import ToastListContainer from './Components/Shared/Toasts/ToastListContainer';
import UserDashboardContainer from './Containers/UserDashboardContainer/index';
import UserProfileContainer from './Containers/UserProfileContainer';
import { auth } from './Firebase'; // eslint-disable-line
import { userContext } from './Context/UserContext';

function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(false);
	const [pending, setPending] = useState(true);
	const { currentUser, setCurrentUser, users } = useContext(userContext);
	const [loggedUser, setLoggedUser] = useState(false);

	useEffect(() => {
		const match =
			currentUser && users.find((user) => user.email === currentUser.email);
		match && setLoggedUser(match);

		setTimeout(() => {
			setPending(false);
		}, 3000);
	}, [users, currentUser]);

	return (
		<BrowserRouter>
			<ProjectContext>
				{pending ? (
					<Loader height='95vh' flex={true} />
				) : (
					<>
						<Header
							setLoggedUser={setCurrentUser}
							setIsLoginOpen={setIsLoginOpen}
							loggedUser={currentUser}
						/>
						{isLoginOpen && (
							<LogIn
								setIsLoginOpen={setIsLoginOpen}
								isLoginOpen={isLoginOpen}
								setIsPasswordRecoveryOpen={setIsPasswordRecoveryOpen}
							/>
						)}
						{isPasswordRecoveryOpen && (
							<PasswordRecoveryModal
								isPasswordRecoveryOpen={isPasswordRecoveryOpen}
								setIsPasswordRecoveryOpen={setIsPasswordRecoveryOpen}
								setIsLoginOpen={setIsLoginOpen}
							/>
						)}

						<Routes>
							<Route
								exact
								path='/'
								element={
									<HomeContainer
										setIsLoginOpen={setIsLoginOpen}
										loggedUser={currentUser}
									/>
								}
							/>
							<Route path='*' element={<Navigate replace to='/404' />} />
							<Route path='404' element={<NotFoundPage />} />
							<Route path='register' element={<Register />} />
							<Route path='cursos/:name' element={<CoursesPages />} />

							{loggedUser && loggedUser?.rol === 'administrador' && (
								<>
									<Route path='admin' element={<AdminPage />} />
									<Route path='admin/cursos' element={<AdminPage />} />
									<Route path='admin/categorias' element={<AdminPage />} />
									<Route path='admin/comisiones' element={<AdminPage />} />
									<Route path='admin/usuarios' element={<AdminPage />} />
									<Route path='admin/solicitudes' element={<AdminPage />} />
									<Route path='admin/inscripciones' element={<AdminPage />} />
									<Route path='admin/consultas' element={<AdminPage />} />
									<Route path='admin/new/:newElement' element={<AdminPage />} />
									<Route
										path='admin/edit/:type/:editElement'
										element={<AdminPage />}
									/>
									<Route path='admin/perfil' element={<AdminPage />} />
								</>
							)}

							{loggedUser && loggedUser?.rol === 'estudiante' && (
								<>
									<Route path='user' element={<UserDashboardContainer />} />
									<Route
										path='user/profile'
										element={<UserProfileContainer />}
									/>
								</>
							)}
						</Routes>
						<ToastListContainer />
						<FooterContext>
							<Footer />
						</FooterContext>
					</>
				)}
			</ProjectContext>
		</BrowserRouter>
	);
}

export default App;
