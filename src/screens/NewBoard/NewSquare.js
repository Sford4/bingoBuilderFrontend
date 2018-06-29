import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert, Image } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS

export default class NewSquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currSquare: 0,
			currText: null,
			squares: this.props.squares ? this.props.squares : []
		};
	}

	backArrow = (num, squares) => {
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
		// if (num === 23) {
		// NEED TO ADD USERNAME TO THIS
		// context.setBoardForPreview({
		// 	title: this.props.title,
		// 	squares: squares,
		// 	keywords: this.props.keywords,
		// 	creator: context.user.userName || 'THE CREATOR'
		// });
		// 	this.props.navigation.navigate('Preview');
		// } else if (this.state.currText !== null) {
		// 	squares.push(this.state.currText);
		// 	this.setState({
		// 		currSquare: num + 1,
		// 		currText: squares[num + 1] ? squares[num + 1] : null,
		// 		squares: squares
		// 	});
		// } else {
		// 	Alert.alert('Woah there!', "You can't leave a square empty!", { cancelable: false });
		// }
		Navigation.navigate('Preview');
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
						<View style={masterStyles.header}>
							<Image
								style={{ width: 140, height: 70, marginHorizontal: 10 }}
								source={require('../../../assets/bingoBuilderLogo.png')}
							/>
							<Text style={[masterStyles.title, { width: '45%', textAlign: 'center' }]}>
								{this.props.title || 'NO TITLE'}
							</Text>
						</View>
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
						<TouchableHighlight style={masterStyles.button} onPress={() => this.goBack(this.state.squares)}>
							<Text style={masterStyles.btnText}>Back</Text>
						</TouchableHighlight>

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
	}
});
