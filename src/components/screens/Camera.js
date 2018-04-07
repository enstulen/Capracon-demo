import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';
import { saveImage } from '../../data/ducks/imageDuck';

class CameraScreen extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		faceDetectionMode: Camera.Constants.FaceDetection.Mode.fast,
		faceDetectionClassifications: Camera.Constants.FaceDetection.Classifications.all,
		cameraReady: true,
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

	// BUTTONS //

	switchButtonPressed = () => {
		this.setState({
			type:
				this.state.type === Camera.Constants.Type.back
					? Camera.Constants.Type.front
					: Camera.Constants.Type.back
		});
	};
	snapButtonPressed = () => {
		this.snap().then(photo => {
			this.props.saveImage(photo);
		});
	};

	imageButtonPressed = () => {
		this.props.navigation.goBack();
	};

	onFacesDetected = (detected) => {
		const smilingFaces = detected.faces.filter(face => face.smilingProbability > 0.7);
		console.log(smilingFaces)
		if (smilingFaces.length > 0 && this.state.cameraReady) {
			this.setState({
				cameraReady: false,
			})
			this.snap().then(photo => {
				this.props.saveImage(photo);
				setTimeout(() => {
					this.setState({
						cameraReady: true,
					})
				}, 3000)
			})	
		}
	}

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
						onFacesDetected={this.onFacesDetected}
						faceDetectionMode={this.state.faceDetectionMode}
						faceDetectionClassifications={this.state.faceDetectionClassifications}
					>
						<View style={styles.overlay}>
							<TouchableOpacity
								style={styles.button}
								onPress={this.imageButtonPressed}
							>
								<Image style={styles.image} source={{ uri: base64Icon }} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.button}
								onPress={this.snapButtonPressed}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									Take pic
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.button}
								onPress={this.switchButtonPressed}
							>
								<Text
									style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
								>
									Flip
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	button: {
		width: 100,
		height: 100
	},
	camera: {
		flex: 1
	},
	container: {
		flex: 1
	},
	overlay: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	},
	image: {
		width: 100,
		height: 100
	}
});

const mapDispatchToProps = dispatch => {
	return {
		saveImage: image => dispatch(saveImage(image)),
		incrementAsync: () => dispatch(incrementAsync())
	};
};
const mapStateToProps = state => ({
	images: state.image.images
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
