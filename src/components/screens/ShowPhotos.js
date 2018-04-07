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

class ImageListItem extends React.Component {
	_onPress = () => {
		this.props.onPressItem(this.props.id);
	};

	render() {
		var base64String = 'data:image/png;base64,' + this.props.image;
		return (
			<TouchableOpacity onPress={this._onPress}>
				<Image
					style={{ width: 100, height: 100 }}
					source={{ uri: base64String }}
				/>
			</TouchableOpacity>
		);
	}
}

class ShowPhotos extends React.Component {
	keyExtractor = (item, index) => item.id;

	onPressItem = (id: string) => {
		console.log('pressed');
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
			<FlatList
				data={this.props.images}
				extraData={this.state}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
			/>
		);
	}
}

const mapStateToProps = state => ({
	images: state.image.images
});
export default connect(mapStateToProps)(ShowPhotos);

const styles = StyleSheet.create({
	switchButton: {
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center'
	},
	camera: {
		flex: 1
	},
	container: {
		flex: 1
	},
	overlay: {
		flex: 1
	}
});
