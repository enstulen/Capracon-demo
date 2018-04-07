import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
export default class ImageListItem extends React.Component {
	onPress = () => {
		this.props.onPressItem(this.props.image);
	};

	render() {
		var base64String = 'data:image/png;base64,' + this.props.image;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Image
					style={{ width: 100, height: 100 }}
					source={{ uri: base64String }}
				/>
			</TouchableOpacity>
		);
	}
}
