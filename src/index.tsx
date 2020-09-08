import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18n';
import { configureStore } from './Football/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
