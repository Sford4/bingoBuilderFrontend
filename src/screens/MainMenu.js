import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';

// COMPONENT IMPORTS

export default class Login extends React.Component {
	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Text>MAIN MENU</Text>
						<Text>{context.testValue}</Text>
						<TouchableHighlight onPress={() => Navigation.navigate('StartGame')}>
							<Text>Start Game</Text>
						</TouchableHighlight>
						<TouchableHighlight onPress={() => Navigation.navigate('NewBoard')}>
							<Text>Create a Board</Text>
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
