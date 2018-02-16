import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';

const Root = () => (
  <Provider store={store}>
    <App title={'News Me!'} />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));
