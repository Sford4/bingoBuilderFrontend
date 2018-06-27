import React from 'react';
import config from '../../config';

// INITIAL STATE
const initialState = {
	testValue: 'THIS IS THE TEST VALUE FROM CONTEXT',
	user: null
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

	render() {
		return (
			<AppContext.Provider
				value={{
					testValue: this.state.testValue,
					signup: this.signup,
					user: this.state.user
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
