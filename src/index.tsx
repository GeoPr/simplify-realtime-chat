import React from 'react';
import { render } from 'react-dom';
import { StateProvider } from './state/state';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.scss';

render(
  <Router>
    <StateProvider>
      <App />
    </StateProvider>
  </Router>,
  document.getElementById('root'),
);
