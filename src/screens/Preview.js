import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import BingoBoard from '../screens/components/bingoBoard';

export default class Preview extends React.Component {
	squarePressed = () => {
		console.log("They think they're playing but it's just preview...");
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<View style={[masterStyles.header, { marginTop: 0 }]}>
							<Image
								style={{ width: 140, height: 70, marginHorizontal: 10 }}
								source={require('../../assets/bingoBuilderLogo.png')}
							/>
							<Text style={[masterStyles.title, { width: '45%', textAlign: 'center' }]}>
								{context.board.title || 'NO TITLE'}
							</Text>
						</View>
						<View>
							<BingoBoard board={context.board} squarePressed={this.squarePressed} />
						</View>
						<TouchableHighlight
							style={masterStyles.button}
							onPress={() => this.props.navigation.navigate('NewBoard')}
						>
							<Text style={masterStyles.btnText}>Needs work...</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={masterStyles.button}
							onPress={() => this.props.navigation.navigate('MainMenu')}
						>
							<Text style={masterStyles.btnText}>Save and play later</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={masterStyles.button}
							onPress={() => this.props.navigation.navigate('GamePlay')}
						>
							<Text style={masterStyles.btnText}>Save and play NOW</Text>
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
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start'
	}
});
