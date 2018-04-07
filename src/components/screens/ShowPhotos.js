import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import ImageListItem from '../list/listItems/ImageListItem';

class ShowPhotos extends React.Component {
	keyExtractor = (item, index) => item.id;

	onPressItem = image => {
		this.props.navigation.navigate('ShowSinglePhoto', { image: image });
	};

	addButtonPressed = () => {
		this.props.navigation.navigate('Camera');
	};

	renderItem = ({ item }) => (
		<ImageListItem
			id={item.uri}
			onPressItem={this.onPressItem}
			image={item.base64}
		/>
	);

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.images}
					extraData={this.state}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
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
		width: 100,
		height: 100,
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: 'blue',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 35
	}
});
