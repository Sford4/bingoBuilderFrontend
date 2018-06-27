import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

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

	goBack = (num, squares) => {
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

	goForward = (num, squares) => {
		if (num === 23) {
			this.props.navigation.navigate('Preview');
		} else if (this.state.currText !== null) {
			squares.push(this.state.currText);
			this.setState({
				currSquare: num + 1,
				currText: squares[num + 1] ? squares[num + 1] : null,
				squares: squares
			});
		} else {
			Alert.alert('Woah there!', "You can't leave a square empty!", { cancelable: false });
		}
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Text>This is NEW SQUARE!</Text>
						<Text>Square {this.state.currSquare + 1} of 24</Text>
						<View style={styles.row}>
							<TouchableHighlight onPress={() => this.goBack(this.state.currSquare, this.state.squares)}>
								<Text>{'<'}</Text>
							</TouchableHighlight>
							<TextInput
								style={styles.input}
								placeholder="e.g. No pics alone"
								onChangeText={text => this.setState({ currText: text })}
								value={this.state.currText}
								maxLength={35}
							/>
							<TouchableHighlight
								onPress={() => this.goForward(this.state.currSquare, this.state.squares)}
							>
								<Text>{'>'}</Text>
							</TouchableHighlight>
						</View>
						<TouchableHighlight onPress={() => this.props.navigation.navigate('MainMenu')}>
							<Text>Go to HOME</Text>
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
	row: {
		display: 'flex',
		flexDirection: 'row'
	}
});
