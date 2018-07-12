import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS

export default class BoardsSearchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		console.log('boards at flatlist', this.props.data);
	}

	goToPreview = (board, context) => {
		context.setBoard(board);
		console.log('GOING TO PREVIEW FROM SEARCH LIST');
		Navigation.navigate('Pregame');
	};

	// _keyExtractor = (item, index) => item._id;

	render() {
		return (
			<AppConsumer>
				{context => (
					<FlatList
						data={this.props.data}
						keyExtractor={(item, index) => index}
						renderItem={({ item }) => (
							<TouchableHighlight style={styles.card} onPress={() => this.goToPreview(item, context)}>
								<View>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between'
										}}
									>
										<Text style={styles.title}>{item.title.toString()}</Text>
										<Text style={styles.info}>by {item.creator.toString()}</Text>
									</View>
									<Text style={styles.info}>Keywords: {item.keywords}</Text>
								</View>
							</TouchableHighlight>
						)}
					/>
				)}
			</AppConsumer>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		height: 65,
		width: '100%',
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomWidth: 2,
		borderBottomColor: '#0054ff',
		borderStyle: 'solid',
		display: 'flex',
		justifyContent: 'space-around'
	},
	title: {
		fontFamily: 'Futura-Medium',
		color: '#4d4d4d'
	},
	info: {
		fontFamily: 'Futura-Medium',
		color: '#b3b3b3'
	}
});
