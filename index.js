import {AppRegistry, Platform, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

// npm i mobx@5.15.4 mobx-react@6.1.8 --legacy-peer-deps
// plugins: [["@babel/plugin-proposal-decorators", {"legacy": true}]]
// "experimentalDecorators": true

AppRegistry.registerComponent(appName, () => App);
