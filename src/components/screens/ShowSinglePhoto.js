import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
export default class ShowSinglePhoto extends React.Component {
	render() {
		var base64String =
			'data:image/png;base64,' + this.props.navigation.state.params.image;
		return <Image style={{ flex: 1 }} source={{ uri: base64String }} />;
	}
}
