import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../context/context';

// COMPONENT IMPORTS

export default class Signup extends React.Component {
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
