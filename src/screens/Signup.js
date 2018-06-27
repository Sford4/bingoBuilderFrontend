import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import AwesomeAlert from 'react-native-awesome-alerts';

// COMPONENT IMPORTS

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			showAlert: false
		};
		console.log('props from context', this.props);
	}

	showAlert = () => {
		this.setState({
			showAlert: true
		});
	};

	hideAlert = () => {
		this.setState({
			showAlert: false
		});
	};

	componentWillUpdate(Nextprops, Nextstate) {
		console.log('New user props', Nextprops);
		if (Nextprops.user && Nextprops.user.error) {
			this.showAlert();
		}
		if (Nextprops.user && !Nextprops.user.error) {
			Navigation.navigate('MainMenu');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={{ width: 100, height: 50 }} source={require('../../assets/bingoBuilderLogo.png')} />
				<TextInput
					style={styles.input}
					placeholder="Username"
					onChangeText={text => this.setState({ userName: text })}
					value={this.state.userName}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					onChangeText={text => this.setState({ email: text })}
					value={this.state.email}
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={text => this.setState({ password: text })}
					value={this.state.password}
					secureTextEntry={true}
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					onChangeText={text => this.setState({ passwordConfirm: text })}
					value={this.state.passwordConfirm}
					secureTextEntry={true}
				/>
				<TouchableHighlight style={styles.button} onPress={() => Navigation.navigate('MainMenu')}>
					{/* <TouchableHighlight style={styles.button} onPress={() => this.props.signup(this.state)}> */}
					<Text>SIGNUP</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => Navigation.navigate('Login')}>
					<Text>Have an account? Click here!</Text>
				</TouchableHighlight>

				<AwesomeAlert
					show={this.state.showAlert}
					showProgress={false}
					title="Whoops!"
					message={this.props.user && this.props.user.error ? this.props.user.error : 'Error message here'}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showCancelButton={false}
					showConfirmButton={true}
					confirmText="Try again"
					confirmButtonColor="#DD6B55"
					onConfirmPressed={() => {
						this.hideAlert();
					}}
				/>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Signup {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		width: 260,
		height: 45,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		backgroundColor: 'red',
		shadowRadius: 2,
		shadowColor: 'gray',
		shadowOpacity: 0.3
	},
	input: {
		width: 260,
		height: 45,
		padding: 15,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: 'gray',
		borderStyle: 'solid'
	}
});
