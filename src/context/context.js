import React from 'react';
import config from '../../config';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT'
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
					obj
				})
			});
			let responseJson = await response.json();
			console.log('response from signup', responseJson);
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
					signup: this.signup
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
