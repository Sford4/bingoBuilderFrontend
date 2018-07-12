import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';
import SocketIOClient from 'socket.io-client';
import AwesomeAlert from 'react-native-awesome-alerts';

// COMPONENT IMPORTS
import Header from '../screens/components/header';
import BingoBoard from '../screens/components/bingoBoard';

const winningCombos = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24]
];

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squaresSelected: [12],
			board: this.props.board.board
		};
		this.bingoBoard = <BingoBoard board={this.state.board} squarePressed={this.squarePressed} />;
		this.bingoBtn = <Text style={{ height: 60, width: '100%' }}> </Text>;
		// WEBSOCKET STUFF
		this.socket = SocketIOClient('http://localhost:8000');
		this.socket.emit('join', this.props.board.addCode, this.props.user._id, this.props.board._id);
		this.socket.on('squarePressed', square => {
			console.log('square pressed (from server)', square);
			this.squarePressed(square, null, true);
		});
		this.socket.on('playAgain', () => {
			this.playAgain(true);
		});
		this.socket.on('bingo', userName => {
			// PULL UP SORRY YOU LOST MESSAGE
			this.setState({
				showPopup: true,
				popupTitle: `${userName} yelled Bingo!`,
				popupMessage: 'Looks like you lost... Would you like to play again?',
				onCancel: this.goHome,
				onConfirm: this.playAgain,
				confirmText: 'Play again',
				cancelText: 'Main Menu'
			});
		});
	}

	squarePressed = (square, index, fromServer) => {
		console.log('square pressed', square);
		console.log('at index', index);
		// UPDATE SQUARES THROUGH BACKEND
		if (!fromServer) {
			this.socket.emit('squarePressed', square, this.props.board.addCode, this.props.board._id);
		}
		if (!index && index !== 0) {
			console.log('square revieved from backend');
			for (let i = 0; i < this.state.board.squares.length; i++) {
				if (this.state.board.squares[i].text === square.text) {
					index = i;
				}
			}
		}
		// UPDATE SQUARES ON THE FRONTEND
		let board = this.state.board;
		for (let i = 0; i < board.squares.length; i++) {
			if (board.squares[i].text === square.text) {
				board.squares[i].selected = !board.squares[i].selected;
			}
		}
		let squareNum = index >= 12 ? index + 1 : index;
		let squaresSelected = this.state.squaresSelected;
		if (squaresSelected.includes(squareNum)) {
			let index = squaresSelected.indexOf(squareNum);
			squaresSelected.splice(index, 1);
		} else {
			squaresSelected.push(squareNum);
		}
		this.setState({
			squaresSelected: squaresSelected,
			board: board
		});
	};

	checkWinningCombos = (winningCombo, squaresSelected) => {
		for (var i = 0; i < winningCombo.length; i++) {
			if (squaresSelected.indexOf(winningCombo[i]) === -1) return false;
		}
		return true;
	};

	winEligible = () => {
		for (let x = 0; x < winningCombos.length; x++) {
			if (this.checkWinningCombos(winningCombos[x], this.state.squaresSelected)) {
				console.log('eligible to win!');
				return true;
			}
		}
		return false;
	};

	playAgain = fromServer => {
		if (!fromServer) {
			this.socket.emit('playAgain', this.props.board.addCode, this.props.board.board._id);
		}
		let freshBoard = this.state.board;
		for (let i = 0; i < freshBoard.squares.length; i++) {
			if (freshBoard.squares[i].selected) {
				freshBoard.squares[i].selected = !freshBoard.squares[i].selected;
			}
		}
		this.setState({
			showPopup: false,
			board: freshBoard
		});
	};

	goHome = () => {
		this.socket.emit('leave', this.props.board.addCode, this.props.board._id, this.props.user._id);
		this.setState({
			showPopup: false
		});
		Navigation.navigate('MainMenu');
		console.log('GOING HOME!!!');
	};

	yellBingo = () => {
		console.log('YELLING BINGO');
		this.socket.emit(
			'bingo',
			this.props.user.userName,
			this.props.board.addCode,
			this.props.board._id,
			this.props.user._id
		);
		// PULL UP CONGRATS MESSAGE
		this.setState({
			showPopup: true,
			popupTitle: 'You WON!',
			popupMessage: 'Congrats! Would you like to play again?',
			onCancel: this.goHome,
			onConfirm: this.playAgain,
			confirmText: 'Play again',
			cancelText: 'Main Menu'
		});
	};

	closePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	tryToLeave = () => {
		this.setState({
			showPopup: true,
			popupTitle: 'WOAH THERE!',
			popupMessage: 'Are you sure you want to leave?',
			onCancel: this.closePopup,
			onConfirm: this.goHome,
			confirmText: 'Leave game',
			cancelText: 'Cancel'
		});
	};

	componentWillUpdate(NextProps, NextState) {
		this.bingoBoard = <BingoBoard board={NextState.board} squarePressed={this.squarePressed} />;
		this.bingoBtn = this.winEligible()
			? <TouchableHighlight style={styles.bingoBtn} onPress={() => this.yellBingo()}>
					<Text style={styles.bingoBtnText}>BINGO!</Text>
				</TouchableHighlight>
			: <Text style={{ height: 60, width: '100%' }}> </Text>;
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title={this.props.board.board.title} onLogoPress={this.tryToLeave} />
				<View>
					<Text style={styles.title}>Game Code: {this.props.board.addCode}</Text>
					{this.bingoBoard}
				</View>
				{this.bingoBtn}
				<AwesomeAlert
					show={this.state.showPopup}
					showProgress={false}
					title={this.state.popupTitle}
					message={this.state.popupMessage}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showCancelButton={true}
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
		{props => <Game {...props} />}
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
	},
	bingoBtn: {
		width: '80%',
		minWidth: 220,
		maxWidth: 300,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		backgroundColor: '#00a99d',
		shadowRadius: 2,
		shadowColor: 'gray',
		shadowOpacity: 0.3
	},
	bingoBtnText: {
		fontSize: 30,
		color: 'white',
		fontFamily: 'Futura-Medium'
	}
});
