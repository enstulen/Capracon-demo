import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import ImageListItem from '../list/listItems/ImageListItem';

class ShowPhotos extends React.Component {
	keyExtractor = (item, index) => item.uri;

	renderItem = ({ item }) => (
		<ImageListItem
			id={item.uri}
			onPressItem={this.onPressItem}
			image={item.base64}
		/>
	);

	onPressItem = image => {
		this.props.navigation.navigate('ShowSinglePhoto', { image: image });
	};

	addButtonPressed = () => {
		this.props.navigation.navigate('Camera');
	};

	render() {
		StatusBar.setBarStyle('light-content', true);
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.images}
					extraData={this.state}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
					contentContainerStyle={styles.list}
					numColumns={4}
					columnWrapperStyle={{ margin: 5 }}
					horizontal={false}
				/>
				<TouchableOpacity style={styles.button} onPress={this.addButtonPressed}>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	images: state.image.images
});
export default connect(mapStateToProps)(ShowPhotos);

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
		flex: 1,
		width: 80,
		height: 80,
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: '#E63462',
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOpacity: 0.4,
		shadowRadius: 3,
		shadowOffset: { height: 5, width: 5 }
	},
	buttonText: {
		color: 'white',
		fontSize: 35
	},
	list: {
		flexDirection: 'column'
	}
});
