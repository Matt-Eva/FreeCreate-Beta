import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "./store"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

{/* <Provider store={store}> 
        
        </Provider> */}

