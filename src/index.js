import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import YogaApp from "./YogaApp";
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <YogaApp />
  </React.StrictMode>,

  document.getElementById('root')
);

