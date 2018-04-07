import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';
import { incrementAsync } from '../../data/ducks/counterDuck';
import { saveImage } from '../../data/ducks/imageDuck';

class CameraScreen extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back
	};

	// PERMISSIONS //
	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}
	permissionGranted() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		}
		return true;
	}

	snap = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync({
				base64: true
			});
			return photo;
		}
	};

	//--------------//

	switchButtonPressed = () => {
		console.log(this.props.imagesCounter);

		// this.setState({
		// 	type:
		// 		this.state.type === Camera.Constants.Type.back
		// 			? Camera.Constants.Type.front
		// 			: Camera.Constants.Type.back
		// });
	};
	testButtonPressed = () => {
		this.snap().then(photo => {
			this.props.saveImage(photo);
		});
		console.log(this.props.imagesCounter);
		// this.props.incrementAsync();
	};

	imageButtonPressed = () => {
		this.props.navigation.goBack();
	};

	render() {
		var base64Icon =
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
		if (this.permissionGranted) {
			return (
				<View style={styles.container}>
					<Camera
						style={styles.camera}
						type={this.state.type}
						ref={ref => {
							this.camera = ref;
						}}
					>
						<View style={styles.overlay}>
							<TouchableOpacity
								style={styles.switchButton}
								onPress={this.switchButtonPressed}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									Flip
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.switchButton}
								onPress={this.testButtonPressed}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									Navigate
								</Text>
							</TouchableOpacity>
							<Text
								style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
							/>
							<TouchableOpacity
								style={styles.imageButton}
								onPress={this.imageButtonPressed}
							>
								<Image style={styles.image} source={{ uri: base64Icon }} />
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			);
		}
	}
}

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
	},
	image: {
		width: 100,
		height: 100,
		resizeMode: Image.resizeMode.contain
	}
});

const mapDispatchToProps = dispatch => {
	return {
		saveImage: image => dispatch(saveImage(image)),
		incrementAsync: () => dispatch(incrementAsync())
	};
};
const mapStateToProps = state => ({
	imagesCounter: state.image.images,
	counter: state.counter.counter
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
