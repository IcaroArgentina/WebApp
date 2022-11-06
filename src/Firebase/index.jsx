import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: `${process.env.REACT_APP_APIKEY}`,
	authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
	databaseURL: `${process.env.REACT_APP_DATABASEURL}`,
	projectId: `${process.env.REACT_APP_PROJECTID}`,
	storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
	messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
	appId: `${process.env.REACT_APP_APPID}`,
	measurementId: `${process.env.REACT_APP_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);

export default getFirestore();

export const auth = getAuth(app);
export const storage = getStorage(app);
