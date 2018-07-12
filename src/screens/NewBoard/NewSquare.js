import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert, Image } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';

export default class NewSquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currSquare: this.props.squares ? this.props.squares.length - 1 : 0,
			currText: this.props.squares ? this.props.squares[this.props.squares.length - 1] : null,
			squares: this.props.squares ? this.props.squares : []
		};
		this.btns = this.determineBtns(this.state.currSquare);
	}

	componentWillUpdate(NextProps, NextState) {
		console.log('the currSquare', NextState.currSquare);
		this.btns = this.determineBtns(NextState.currSquare);
	}

	determineBtns = squareNum => {
		if (squareNum === 23) {
			return (
				<View style={styles.btnView}>
					<TouchableHighlight style={styles.smallBackBtn} onPress={() => this.goBack(this.state.squares)}>
						<Text style={masterStyles.btnText}>Back</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.previewBtn} onPress={() => this.goBack(this.state.squares)}>
						<Text style={masterStyles.btnText}>Preview!</Text>
					</TouchableHighlight>
				</View>
			);
		} else {
			return (
				<TouchableHighlight style={masterStyles.button} onPress={() => this.goBack(this.state.squares)}>
					<Text style={masterStyles.btnText}>Back</Text>
				</TouchableHighlight>
			);
		}
	};

	backArrow = (num, squares) => {
		console.log('going back cuz', this.state.currSquare);
		if (this.state.currSquare === 0) {
			this.props.saveSquares(squares);
			this.props.goToTitlePage();
		} else {
			this.setState({
				currSquare: num - 1,
				currText: squares[num - 1]
			});
		}
	};

	goForward = (num, squares, context) => {
		if (num === 23) {
			context.setBoard({
				title: this.props.title,
				squares: squares,
				keywords: this.props.keywords,
				creator: context.user.userName || 'THE CREATOR'
			});
			context.saveBoardOnUser(
				{
					title: this.props.title,
					squares: squares,
					keywords: this.props.keywords,
					creator: context.user.userName
				},
				context.user._id
			);
			Navigation.navigate('Preview');
		} else if (!this.props.squares.includes(this.state.currText) && squares.includes(this.state.currText)) {
			Alert.alert('Hold on...', "You can't have two squares say the same thing!", { cancelable: false });
		} else if (this.state.currText !== null && !this.props.squares.includes(this.state.currText)) {
			squares.push(this.state.currText);
			this.setState({
				currSquare: num + 1,
				currText: squares[num + 1] ? squares[num + 1] : null,
				squares: squares
			});
		} else {
			Alert.alert('Woah there!', "You can't leave a square empty!", { cancelable: false });
		}
		// Navigation.navigate('Preview');
	};

	goBack = squares => {
		this.props.saveSquares(squares);
		this.props.goToTitlePage();
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title={this.props.title || 'NO TITLE'} onLogoPress={this.props.saveUponExit} />
						<View style={styles.mainContainer}>
							<Text style={masterStyles.subtitle}>Make your squares</Text>
							<Text style={{ color: '#BFBFBF', fontSize: 18 }}>
								Square {this.state.currSquare + 1} of 24
							</Text>
							<View style={styles.row}>
								<TouchableHighlight
									onPress={() => this.backArrow(this.state.currSquare, this.state.squares)}
								>
									<Text style={styles.arrowBtn}>◄</Text>
								</TouchableHighlight>
								<TextInput
									style={styles.squareInput}
									placeholder="e.g. No pics alone"
									onChangeText={text => this.setState({ currText: text })}
									value={this.state.currText}
									maxLength={30}
									multiline={true}
								/>
								<TouchableHighlight
									onPress={() => this.goForward(this.state.currSquare, this.state.squares, context)}
								>
									<Text style={styles.arrowBtn}>►</Text>
								</TouchableHighlight>
							</View>
						</View>
						{this.btns}

					</View>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	mainContainer: {
		height: '50%',
		maxHeight: 300,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	arrowBtn: {
		color: '#00AC9F',
		fontSize: 60,
		fontWeight: 'bold'
	},
	squareInput: {
		height: 150,
		width: 150,
		borderWidth: 1,
		borderColor: '#BFBFBF',
		borderStyle: 'solid',
		marginHorizontal: 15,
		padding: 18,
		fontSize: 26,
		textAlign: 'center'
	},
	btnView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	smallBackBtn: {
		width: '40%',
		minWidth: 110,
		maxWidth: 150,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		backgroundColor: '#00a99d',
		shadowRadius: 2,
		shadowColor: 'gray',
		shadowOpacity: 0.3
	},
	previewBtn: {
		width: '40%',
		minWidth: 110,
		maxWidth: 150,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 40,
		backgroundColor: '#0054ff',
		shadowRadius: 2,
		shadowColor: 'gray',
		shadowOpacity: 0.3
	}
});
