import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { AppConsumer } from '../context/context';

// COMPONENT IMPORTS

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};
	}

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Text>This is signup!</Text>
						<Text>{context.testValue}</Text>
						<TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
							<Text>Go to LOGIN</Text>
						</TouchableHighlight>
						<TextInput
							placeholder="Username"
							onChangeText={text => this.setState({ userName: text })}
							value={this.state.userName}
						/>
						<TextInput
							placeholder="Email"
							onChangeText={text => this.setState({ email: text })}
							value={this.state.email}
							keyboardType="email-address"
						/>
						<TextInput
							placeholder="Password"
							onChangeText={text => this.setState({ password: text })}
							value={this.state.password}
							secureTextEntry={true}
						/>
						<TextInput
							placeholder="Confirm Password"
							onChangeText={text => this.setState({ passwordConfirm: text })}
							value={this.state.passwordConfirm}
							secureTextEntry={true}
						/>
						<TouchableHighlight onPress={() => context.signup(this.state)}>
							<Text>SIGNUP</Text>
						</TouchableHighlight>

					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
