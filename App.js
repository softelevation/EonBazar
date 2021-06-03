import React from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import rootSaga from './src/redux/saga';
import {sagaMiddleware, store} from './src/redux/store';
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
