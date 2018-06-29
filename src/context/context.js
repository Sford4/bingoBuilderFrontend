import React from 'react';
import config from '../../config';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT',
	user: null,
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

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	signup = async obj => {
		try {
			let response = await fetch(`${config.ROOT_URL}/users`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userName: obj.userName,
					email: obj.email,
					password: obj.password
				})
			});
			let responseJson = await response.json();
			this.setState({
				user: responseJson
			});
			return responseJson;
		} catch (error) {
			console.error(error);
		}
	};

	setBoardForPreview = board => {
		this.setState({
			board: board
		});
	};

	findGame = code => {
		console.log('finding game with this code', code);
	};

	render() {
		return (
			<AppContext.Provider
				value={{
					testValue: this.state.testValue,
					signup: this.signup,
					setBoardForPreview: this.setBoardForPreview,
					user: this.state.user,
					board: this.state.board
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
