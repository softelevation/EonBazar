import React from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import rootSaga from './src/redux/saga';
import {PersistGate} from 'redux-persist/integration/react';
import {sagaMiddleware, store, persistor} from './src/redux/store';
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Routes />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
