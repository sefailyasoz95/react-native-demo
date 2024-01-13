import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import store from './src/Redux/store/store';
import {SafeAreaView, StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} />
      <Main />
    </Provider>
  );
}

export default App;
