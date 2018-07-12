import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params
		})
	);
}

getCurrentRoute = () => {
	// console.log('current nav state', _navigator.state);
	return _navigator.state;
};

// add other navigation functions that you need and export them

export default {
	navigate,
	setTopLevelNavigator,
	getCurrentRoute
};
