import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import store from './src/Redux/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
