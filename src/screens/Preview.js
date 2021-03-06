import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../screens/components/header';
import BingoBoard from '../screens/components/bingoBoard';

class Preview extends React.Component {
	squarePressed = () => {
		console.log("They think they're playing but it's just preview...");
	};

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.board.board) {
			Navigation.navigate('Game');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title={this.props.board.title || 'NO TITLE'} />
				<View>
					<BingoBoard board={this.props.board} squarePressed={this.squarePressed} />
				</View>
				<TouchableHighlight
					style={masterStyles.button}
					onPress={() => this.props.navigation.navigate('NewBoard')}
				>
					<Text style={masterStyles.btnText}>Needs work...</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={masterStyles.button}
					onPress={() => this.props.saveAndPlayLater(this.props.board, this.props.user._id)}
				>
					<Text style={masterStyles.btnText}>Save and play later</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={masterStyles.button}
					onPress={() => this.props.saveAndStartGame(this.props.board._id, this.props.user._id)}
				>
					<Text style={masterStyles.btnText}>Save and play NOW</Text>
				</TouchableHighlight>

			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <Pregame {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start'
	}
});
