import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// COMPONENT IMPORTS
import { AppProvider } from './src/context/context';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		console.log('app provider', AppProvider);
		console.log('app stack navigator', AppStackNavigator);
	}

	render() {
		return (
			<AppProvider>
				<AppStackNavigator />
			</AppProvider>
		);
	}
}

const AppStackNavigator = createStackNavigator({
	Signup: Signup,
	Login: Login
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
