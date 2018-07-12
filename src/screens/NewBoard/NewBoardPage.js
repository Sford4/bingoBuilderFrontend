import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import NewBoardTitle from './NewBoardTitle';
import NewSquare from './NewSquare';
import AwesomeAlert from 'react-native-awesome-alerts';

class NewBoardPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titlePage: true,
			title: this.props.user.saved ? this.props.user.saved.title : null,
			keywords: this.props.user.saved ? this.props.user.saved.keywords : [],
			squares: this.props.user.saved ? this.props.user.saved.squares : [],
			showPopup: false
		};
	}

	componentWillMount() {
		console.log('user at new board', this.props.user);
		if (this.props.user && this.props.user.saved && this.state.titlePage) {
			console.log('should be showing use saved popup');
			this.setState({
				showPopup: true,
				popupTitle: 'Where we left off!',
				popupMessage: 'Looks like you were already working on a board, feel free to finish it!',
				showCancel: false,
				confirmText: 'OK',
				onConfirm: this.onCancel
			});
		}
	}

	saveUponExit = () => {
		let board = {
			title: this.state.title,
			keywords: this.state.keywords,
			squares: this.state.squares
		};
		this.props.saveBoardOnUser(board, this.props.user._id);
		this.setState({
			showPopup: false
		});
		console.log('GOING HOME!!!');
		Navigation.navigate('MainMenu');
	};

	openExitWarning = () => {
		if (this.state.title) {
			this.setState({
				showPopup: true,
				popupTitle: 'Saved!',
				popupMessage: 'Come back and finish this one later, just remember you can only work on one board at a time!',
				onConfirm: this.saveUponExit,
				confirmText: 'Coolio',
				showCancel: false
			});
		} else {
			console.log('GOING HOME!!!');
			Navigation.navigate('MainMenu');
		}
	};

	onCancel = () => {
		this.setState({
			showPopup: false
		});
	};

	saveSquares = squares => {
		this.setState({
			squares: squares
		});
	};

	saveTitleAndKeywords = (title, keywords) => {
		this.setState({
			title: title,
			keywords: keywords
		});
	};

	goToNewSquare = () => {
		this.setState({
			titlePage: false
		});
	};
	goToTitlePage = () => {
		this.setState({
			titlePage: true
		});
	};

	render() {
		return (
			<View style={styles.container}>
				{this.state.titlePage
					? <NewBoardTitle
							goToNewSquare={this.goToNewSquare}
							saveTitleAndKeywords={this.saveTitleAndKeywords}
							title={this.state.title}
							keywords={this.state.keywords}
							saveUponExit={this.openExitWarning}
						/>
					: <NewSquare
							goToTitlePage={this.goToTitlePage}
							saveSquares={this.saveSquares}
							squares={this.state.squares}
							title={this.state.title}
							saveUponExit={this.openExitWarning}
						/>}
				<AwesomeAlert
					show={this.state.showPopup}
					showProgress={false}
					title={this.state.popupTitle}
					message={this.state.popupMessage}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showCancelButton={this.state.showCancel}
					showConfirmButton={true}
					confirmText={this.state.confirmText}
					cancelText={this.state.cancelText}
					confirmButtonColor="#00a99d"
					onConfirmPressed={() => {
						this.state.onConfirm();
					}}
					onCancelPressed={() => {
						this.state.onCancel();
					}}
				/>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <NewBoardPage {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	}
});
