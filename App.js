import { StackNavigator } from 'react-navigation';
import CameraScreen from './src/components/screens/Camera';
import ShowPhotos from './src/components/screens/ShowPhotos';
import ShowSinglePhoto from './src/components/screens/ShowSinglePhoto';
import { Provider } from 'react-redux';
import { store, persistor } from './src/data/configureStore';
import React from 'react';
import { View } from 'react-native';

const RootNavigator = StackNavigator({
	ShowPhotos: { screen: ShowPhotos, navigationOptions: { title: 'Bilder' } },
	Camera: { screen: CameraScreen, navigationOptions: { header: null } },
	ShowSinglePhoto: {
		screen: ShowSinglePhoto,
		navigationOptions: { title: 'Bilde' }
	}
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
