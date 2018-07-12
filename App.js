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
import Options from './src/screens/Options';
import SearchBoards from './src/screens/SearchBoards';
import Pregame from './src/screens/Pregame';
import Game from './src/screens/Game';

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
		Login: Login,
		Signup: Signup,
		MainMenu: MainMenu,
		NewBoard: NewBoardPage,
		Preview: Preview,
		Search: SearchBoards,
		Pregame: Pregame,
		Game: Game,
		Join: Join,
		Options: Options
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);
