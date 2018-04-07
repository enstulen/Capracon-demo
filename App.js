import { StackNavigator } from 'react-navigation';
import CameraScreen from './src/components/screens/Camera';
import ShowPhotos from './src/components/screens/ShowPhotos';
import { Provider } from 'react-redux';
import { store, persistor } from './src/data/configureStore';
import React from 'react';
import { View } from 'react-native';

const RootNavigator = StackNavigator({
	Camera: { screen: CameraScreen, navigationOptions: { header: null } },
	ShowPhotos: { screen: ShowPhotos, navigationOptions: { title: 'Bilder' } }
});

const AppNavigation = () => <RootNavigator />;

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<AppNavigation />
				</View>
			</Provider>
		);
	}
}
