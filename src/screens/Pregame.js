import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../screens/components/header';
import BingoBoard from '../screens/components/bingoBoard';

class Pregame extends React.Component {
	constructor(props) {
		super(props);
	}
	squarePressed = () => {
		console.log("They think they're playing but it's just pregame...");
	};

	componentWillUpdate(NextProps, NextState) {
		if (NextProps.board.board) {
			Navigation.navigate('Game');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="Preview" />
				<View>
					<Text style={styles.title}>Board title: {this.props.board.title}</Text>
					<BingoBoard board={this.props.board} squarePressed={this.squarePressed} />
				</View>
				<TouchableHighlight
					style={masterStyles.button}
					onPress={() => this.props.startGame(this.props.board._id, this.props.user._id)}
				>
					<Text style={masterStyles.btnText}>Start Game</Text>
				</TouchableHighlight>
				<TouchableHighlight style={masterStyles.button} onPress={() => Navigation.navigate('Search')}>
					<Text style={masterStyles.btnText}>Back</Text>
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
	},
	title: {
		fontSize: 24,
		color: '#4D4D4D',
		fontFamily: 'Futura-Medium'
	}
});
