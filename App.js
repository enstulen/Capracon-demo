import { StackNavigator } from 'react-navigation';
import CameraScreen from './src/components/screens/Camera';
import ShowPhotos from './src/components/screens/ShowPhotos';
import ShowSinglePhoto from './src/components/screens/ShowSinglePhoto';
import { Provider } from 'react-redux';
import { store, persistor } from './src/data/configureStore';
import React from 'react';
import { View, StatusBar } from 'react-native';

const headerTintColor = 'white';
const headerBackgroundColor = '#333745';

const RootNavigator = StackNavigator({
	ShowPhotos: {
		screen: ShowPhotos,
		navigationOptions: {
			title: 'Bilder',
			headerTintColor: headerTintColor,
			headerStyle: {
				backgroundColor: headerBackgroundColor
			}
		}
	},
	Camera: { screen: CameraScreen, navigationOptions: { header: null } },
	ShowSinglePhoto: {
		screen: ShowSinglePhoto,
		navigationOptions: {
			title: 'Bilde',
			headerTintColor: headerTintColor,
			headerStyle: {
				backgroundColor: headerBackgroundColor
			}
		}
	}
});

const AppNavigation = () => <RootNavigator />;

export default class App extends React.Component {
	render() {
		StatusBar.setBarStyle('light-content', true);
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<AppNavigation />
				</View>
			</Provider>
		);
	}
}
