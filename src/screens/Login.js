import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../context/context';

// COMPONENT IMPORTS

export default class Login extends React.Component {
	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Text>This is login!</Text>
						<Text>{context.testValue}</Text>
						<TouchableHighlight onPress={() => this.props.navigation.navigate('Signup')}>
							<Text>Go to SIGNUP</Text>
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
		justifyContent: 'center'
	}
});
