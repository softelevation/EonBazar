import React from 'react';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import rootSaga from './src/redux/saga';
import {sagaMiddleware, store} from './src/redux/store';
import FlashMessageContainer from './src/common/flash-meesage';
import FlashMessage from 'react-native-flash-message';

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        MessageComponent={(data) => <FlashMessageContainer data={data} />}
        position="center"
      />
    </Provider>
  );
};

export default App;
