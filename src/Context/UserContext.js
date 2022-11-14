import { createContext, useEffect, useState } from 'react';

import { auth } from '../Firebase/index';

export const userContext = createContext();

const UserContext = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setPending(false);
		});
	}, []);

	return (
		<userContext.Provider
			value={{
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
