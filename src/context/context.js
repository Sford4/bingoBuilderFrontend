import React from 'react';

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

	render() {
		return (
			<AppContext.Provider
				value={{
					testValue: this.state.testValue
				}}
			>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
