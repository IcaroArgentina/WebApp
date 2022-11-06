import { collection, onSnapshot } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

import { auth } from '../Firebase/index';
import db from '../Firebase';

export const userContext = createContext();

const UserContext = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		onSnapshot(
			collection(db, 'Usuarios'),
			(snapshot) => setUsers(snapshot.docs.map((doc) => doc.data())),
			(error) => console.log('error', error)
		);

		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	return (
		<userContext.Provider
			value={{
				users,
				setUsers,
				currentUser,
				setCurrentUser,
				pending,
				setPending,
			}}>
			{children}
		</userContext.Provider>
	);
};

export default UserContext;
