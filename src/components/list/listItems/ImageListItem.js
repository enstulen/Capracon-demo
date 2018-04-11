import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

export default class ImageListItem extends React.Component {
	onPress = () => {
		this.props.onPressItem(this.props.image);
	};

	render() {
		var base64String = 'data:image/png;base64,' + this.props.image;
		return (
			<TouchableOpacity onPress={this.onPress} style={styles.container}>
				<Image style={styles.image} source={{ uri: base64String }} />
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 5
	},
	image: {
		borderRadius: 5,
		height: Dimensions.get('window').height / 4
	}
});
