import { useContext, useState } from 'react';

import LoginModal from '../Shared/Modals/LoginModal/index';
import { auth } from '../../Firebase';
import { projectContext } from '../../Context/ProjectContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogIn = ({ setIsLoginOpen, isLoginOpen, setIsPasswordRecoveryOpen }) => {
	const { usuariosList } = useContext(projectContext);
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [pending, setPending] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const matchEmail = usuariosList.find((user) => user.email === userEmail);

		if (matchEmail) {
			setHasError(false);
			signInWithEmailAndPassword(auth, userEmail, userPassword)
				.then(() => {
					setPending(true);
					if (matchEmail.rol === 'estudiante') {
						setTimeout(() => {
							setIsLoginOpen(false);
							navigate('/user');
						}, 1000);
					}
					if (matchEmail.rol === 'administrador') {
						setTimeout(() => {
							setIsLoginOpen(false);
							navigate('/admin');
						}, 1000);
					}
				})
				.catch((error) => {
					if (error.message === 'Firebase: Error (auth/internal-error).') {
						setHasError({ email: false, password: true });
					}
					if (error.message === 'Firebase: Error (auth/wrong-password).') {
						setHasError({ email: false, password: true });
					}
					if (
						error.message ===
						'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
					) {
						setHasError({ email: false, password: true, block: true });
					}
				})
				.finally(setPending(false));
		} else {
			setHasError({ email: true, password: false });
		}
	};

	const handleChange = (e) => {
		if (e.target.name === 'password') {
			setHasError((current) => ({ ...current, password: false }));
			if (e.target.value.length < 6 && e.target.value.length > 0) {
				setPasswordError(true);
			} else {
				setUserPassword(e.target.value);
				setPasswordError(false);
			}
		}
		if (e.target.name === 'user') {
			setHasError((current) => ({ ...current, email: false }));
			setUserEmail(e.target.value);
		}
	};

	return (
		<LoginModal
			isLoginOpen={isLoginOpen}
			setIsLoginOpen={setIsLoginOpen}
			handleChange={handleChange}
			passwordError={passwordError}
			hasError={hasError}
			handleSubmit={handleSubmit}
			setIsPasswordRecoveryOpen={setIsPasswordRecoveryOpen}
			pending={pending}></LoginModal>
	);
};

export default LogIn;
