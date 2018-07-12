import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// COMPONENT IMPORTS

// PROPS NOTES
// Takes a 'clicked on' func that must be passed from page component
// board is passed in, if it needs to be randomized must be done before passing in

export default class BingoBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.props.board
		};
		this.displayBoard = this.createBoard(this.props.board);
		// console.log('board at bingo board', this.props);
	}

	createBoard = board => {
		let displayBoard = this.props.board.squares.map((square, index) => {
			return (
				<TouchableHighlight
					key={index}
					style={[square.selected ? styles.selectedSquare : styles.unselectedSquare, styles.square]}
					onPress={() => this.props.squarePressed(square, index)}
				>
					<Text adjustsFontSizeToFit style={styles.squareText}>{square.text ? square.text : square}</Text>
				</TouchableHighlight>
			);
		});
		let centerSquare = (
			<View key={24} style={[styles.unselectedSquare, styles.square]}>
				<Image
					style={{ width: '55%', height: '100%' }}
					source={require('../../../assets/bingoBuilderLogo-mini.png')}
				/>
			</View>
		);
		displayBoard.splice(12, 0, centerSquare);
		return displayBoard;
	};

	componentWillReceiveProps(NextProps) {
		// console.log('board at bingo board willmount', NextProps);
		this.displayBoard = this.createBoard(NextProps.board);
	}

	render() {
		return (
			// <LinearGradient
			// 	start={{ x: 0, y: 0 }}
			// 	end={{ x: 1, y: 1 }}
			// 	colors={['#00AC9F', '#004AFF']}
			// 	style={[styles.board, { marginBottom: 15, marginTop: 5 }]}
			// >
			(
				<View style={[styles.board, { marginBottom: 15, marginTop: 5 }]}>
					{this.displayBoard}
					<Text style={{ fontFamily: 'Futura-Medium' }}>Created by {this.state.board.creator}</Text>
				</View>
			)
			// </LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	board: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '98%',
		aspectRatio: 1,
		backgroundColor: '#004AFF',
		padding: 1
	},
	square: {
		width: '20%',
		height: '20%',
		borderWidth: 1,
		borderColor: '#004AFF',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 2
	},
	selectedSquare: {
		backgroundColor: '#78A6AA'
	},
	unselectedSquare: {
		backgroundColor: '#f2f2f2'
	},
	squareText: {
		textAlign: 'center',
		fontSize: 10,
		fontFamily: 'Futura-Medium'
	}
});
