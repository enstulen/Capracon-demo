import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { connect } from 'react-redux';
import { saveImage } from '../../data/ducks/imageDuck';
import flipCamera from '../../../assets/flipCamera.png';
import go_to_images from '../../../assets/images.png';

class CameraScreen extends React.Component {
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		bottomLeftImage: null
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

	snap = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync({
				base64: true
			});
			return photo;
		}
	};

	render() {
		const { images } = this.props;
		const image =
			images.length > 0
				? { uri: 'data:image/png;base64,' + images[images.length - 1].base64 }
				: go_to_images;
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
								style={styles.button}
								onPress={this.imageButtonPressed}
							>
								<Image style={styles.image} source={image} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.snapButton}
								onPress={this.snapButtonPressed}
							/>

							<TouchableOpacity
								style={styles.button}
								onPress={this.switchButtonPressed}
							>
								<Image style={styles.flipCamera} source={flipCamera} />
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
		height: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	snapButton: {
		width: 100,
		height: 100,
		borderColor: 'white',
		borderRadius: 50,
		borderWidth: 5,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	flipCamera: {
		width: 50,
		height: 50
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
		alignItems: 'flex-end',
		marginBottom: 10
	},
	image: {
		width: 50,
		height: 50
	}
});

const mapDispatchToProps = dispatch => {
	return {
		saveImage: image => dispatch(saveImage(image))
	};
};
const mapStateToProps = state => ({
	images: state.image.images
});
export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
