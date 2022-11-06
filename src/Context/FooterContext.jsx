import { createContext, useEffect, useState } from 'react';
import db from '../../src/Firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const mainFooterContext = createContext();

const FooterContext = ({ children }) => {
	const [footerContent, setFooterContent] = useState();

	useEffect(() => {
		onSnapshot(
      collection(db, 'FooterContent'),
      (snapshot) => setFooterContent(snapshot.docs.map((doc) => doc.data())),
      (error) => console.log('error', error)
    );
	}, []);

	return (
		<mainFooterContext.Provider value={{ footerContent, setFooterContent }}>
			{children}
		</mainFooterContext.Provider>
	);
};

export default FooterContext;
