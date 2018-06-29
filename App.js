import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// COMPONENT IMPORTS
import { AppProvider } from './src/context/context';
import Navigation from './src/navigation/Navigation';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import MainMenu from './src/screens/MainMenu';
import NewBoardPage from './src/screens/NewBoard/NewBoardPage';
import Preview from './src/screens/Preview';
import Join from './src/screens/Join';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AppProvider>
				<AppStackNavigator
					ref={navigatorRef => {
						Navigation.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</AppProvider>
		);
	}
}

const AppStackNavigator = createStackNavigator(
	{
		Join: Join,
		Signup: Signup,
		Login: Login,
		MainMenu: MainMenu,
		NewBoard: NewBoardPage,
		Preview: Preview
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 5
	}
});
