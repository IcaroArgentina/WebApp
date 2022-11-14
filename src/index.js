import './index.css';

import { hydrate, render } from 'react-dom';

import App from './App';
import ProjectContext from './Context/ProjectContext';
import React from 'react';
import UserContext from './Context/UserContext';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	hydrate(<App />, rootElement);
} else {
	render(
		<React.StrictMode>
			<UserContext>
				<ProjectContext>
					<App />
				</ProjectContext>
			</UserContext>
		</React.StrictMode>,
		rootElement
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
