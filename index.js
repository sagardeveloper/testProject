/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Navigation from './src/navigation/navigation';
import {name as appName} from './app.json';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const RNRedux = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

AppRegistry.registerComponent(appName, () =>RNRedux);
