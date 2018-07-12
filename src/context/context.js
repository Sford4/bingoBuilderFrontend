import React from 'react';
import config from '../../config';
import { AsyncStorage, Alert } from 'react-native';
import Navigation from '../navigation/Navigation';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT',
	// user: {
	// 	boards: [
	// 		'5b3675ec56f78c174a59bb92',
	// 		'5b36760d56f78c174a59bb94',
	// 		'5b36764d56f78c174a59bb95',
	// 		'5b36768856f78c174a59bb96',
	// 		'5b3676bc56f78c174a59bb97'
	// 	],
	// 	_id: '5b3675977405b30f513eda0d',
	// 	userName: 'Example',
	// 	email: 'example@test.com',
	// 	__v: 5
	// },
	user: null,
	boardsRetrieved: null,
	gameFound: null,
	board: {
		title: 'Tinder',
		creator: 'TimmyTim',
		keywords: ['Dating', 'App'],
		squares: [
			'Service Photo',
			'Hunting Photo',
			'Climbing PHoto',
			'Yoga Pose',
			'"Adventure" in Bio',
			'Party Photo',
			'Pic Holding Baby',
			'Dog Photo',
			'Bio Quotes Scripture',
			'Bio Lists Snapchat',
			'Swimming Photo',
			'Never Alone in Pics',
			'Hunting Photo',
			'Claimg to Love Working',
			'Gym Photo',
			'Photo Shooting a Gun',
			'Bio of only emojis',
			'First Message Makes you Lol',
			'Fake Profile',
			'Bio has Meyers Briggs Score',
			'All Photos aree Selfies',
			'Inspirational Quote',
			'Profile with no Bio',
			'Claims listed age incorrect'
		]
	}
};

const HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	storeUser = async user => {
		user._v.toString();
		console.log('user to be saved', user);
		try {
			await AsyncStorage.setItem('user', user);
		} catch (error) {
			console.log('error storing user', error);
		}
	};

	signup = async obj => {
		try {
			let response = await fetch(`${config.ROOT_URL}/users`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					userName: obj.userName,
					email: obj.email.toLowerCase(),
					password: obj.password
				})
			});
			let responseJson = await response.json();
			this.setState({
				user: responseJson
			});
			this.storeUser(responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	login = async obj => {
		try {
			let response = await fetch(`${config.ROOT_URL}/users/login`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					email: obj.email.toLowerCase(),
					password: obj.password
				})
			});
			let responseJson = await response.json();
			console.log('user give from login', responseJson);
			this.setState({
				user: responseJson
			});
			this.storeUser(responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	retrieveUserData = async () => {
		console.log('retrieving user');
		try {
			const value = await AsyncStorage.getItem('user');
			console.log('retieved user value', value);
			if (value !== null) {
				this.setState({
					user: value
				});
				Navigation.navigate('MainMenu');
				console.log('GOING HOME!!!');
			} else {
				this.setState({
					user: 'none'
				});
			}
		} catch (error) {
			console.log('There was no user to find');
		}
	};

	logout = async () => {
		try {
			await AsyncStorage.removeItem('user');
		} catch (error) {
			// Error saving data
		}
		this.setState({
			user: null
		});
	};

	setBoard = board => {
		this.setState({
			board: board
		});
	};

	saveBoardOnUser = async (board, userId) => {
		console.log('user id', userId);
		console.log('board to save', board);
		try {
			let response = await fetch(`${config.ROOT_URL}/users/save/${userId}`, {
				method: 'PATCH',
				headers: HEADERS,
				body: JSON.stringify({
					saved: board
				})
			});
			let responseJson = await response.json();
			console.log('board saved!', responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	saveAndStartGame = async (board, userId) => {
		let newBoard = await saveBoard(board, userId);
		this.setBoard(newBoard);
		this.startGame(newBoard._id, userId);
	};

	saveAndPlayLater = async (board, userId) => {
		let savedBoard = await saveBoard(board, userId);
		if (savedBoard.squares) {
			Navigation.navigate('MainMenu');
			console.log('GOING HOME!!!');
		} else {
			Alert.alert('Oh dear...', 'Something went wrong... Try again?');
		}
	};

	saveBoard = async (board, userId) => {
		console.log('user id', userId);
		console.log('board to save', board);
		try {
			let response = await fetch(`${config.ROOT_URL}/boards`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					creator: userId,
					board: board
				})
			});
			let responseJson = await response.json();
			console.log('board saved to backend!', responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	findGameByAddCode = async addCode => {
		try {
			let response = await fetch(`${config.ROOT_URL}/games/search`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					addCode: addCode
				})
			});
			let responseJson = await response.json();
			console.log('game found!', responseJson);
			this.setState({
				gameFound: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	findGameById = async id => {
		console.log('looking for board', id);
		try {
			let response = await fetch(`${config.ROOT_URL}/games/${id}`, {
				method: 'GET',
				headers: HEADERS
			});
			let responseJson = await response.json();
			console.log('game started!', responseJson);
			this.setState({
				board: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	clearGameSearch = () => {
		this.setState({
			gameFound: null
		});
	};

	startGame = async (boardId, userId) => {
		try {
			let response = await fetch(`${config.ROOT_URL}/games`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					board: boardId,
					organizer: userId,
					players: [userId]
				})
			});
			let responseJson = await response.json();
			console.log('game before board randomized', responseJson);
			responseJson.board.squares.sort((a, b) => {
				return 0.5 - Math.random();
			});
			this.setBoard(responseJson);
			console.log('game started', responseJson);
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	searchBoards = async input => {
		try {
			let response = await fetch(`${config.ROOT_URL}/boards/search`, {
				method: 'POST',
				headers: HEADERS,
				body: JSON.stringify({
					filter: input.filter,
					searchTerms: input.searchTerms,
					userId: input.userId
				})
			});
			let responseJson = await response.json();

			for (let i = 0; i < responseJson.length; i++) {
				console.log('board i', responseJson[i]);
				responseJson[i].keywords.shift();
				responseJson[i].keywords.shift();
				responseJson[i].keywords = responseJson[i].keywords.join(' ');
				responseJson[i].numPlays = responseJson[i].numPlays.toString();
			}
			// console.log('responseJSON', responseJson);
			this.setState({
				boardsRetrieved: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	render() {
		return (
			<AppContext.Provider
				value={{
					testValue: this.state.testValue,
					signup: this.signup,
					login: this.login,
					retrieveUserData: this.retrieveUserData,
					logout: this.logout,
					saveBoardOnUser: this.saveBoardOnUser,
					setBoard: this.setBoard,
					saveAndStartGame: this.saveAndStartGame,
					saveAndPlayLater: this.saveAndPlayLater,
					startGame: this.startGame,
					findGameByAddCode: this.findGameByAddCode,
					findGameById: this.findGameById,
					gameFound: this.state.gameFound,
					clearGameSearch: this.clearGameSearch,
					searchBoards: this.searchBoards,
					user: this.state.user,
					board: this.state.board,
					boardsRetrieved: this.state.boardsRetrieved
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
