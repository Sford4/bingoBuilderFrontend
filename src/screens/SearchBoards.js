import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { AppConsumer } from '../context/context';
// import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../screens/components/header';
import BoardsSearchList from '../screens/components/boardsSearchList';

class SearchBoards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: null
		};
		this.cards = <View><Text>Find a board to play!</Text></View>;
	}
	search = (input, props) => {
		if (!input) {
			return;
		} else if (input.filter) {
			props.searchBoards({ filter: input.filter, searchTerms: null, userId: props.user._id });
		} else {
			props.searchBoards({ filter: null, searchTerms: input.split(' '), userId: props.user._id });
		}
	};

	componentWillUpdate(NextProps, NextState) {
		// console.log('boards received:', NextProps);
		if (NextProps.boardsRetrieved) {
			console.log('boards being made into cards:', NextProps.boardsRetrieved);
			this.cards = <BoardsSearchList data={NextProps.boardsRetrieved} />;
		} else {
			this.cards = <View><Text>Find a board to play!</Text></View>;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title="Choose a Board" />
				<View>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<TouchableHighlight
							style={styles.filterContainer}
							onPress={() => this.search({ filter: 'popular' }, this.props)}
						>
							<Text style={masterStyles.btnText}>Most Popular</Text>
						</TouchableHighlight>
						<TouchableHighlight
							style={styles.filterContainer}
							onPress={() => this.search({ filter: 'mine' }, this.props)}
						>
							<Text style={masterStyles.btnText}>My Boards</Text>
						</TouchableHighlight>
					</View>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<TextInput
							style={masterStyles.input}
							placeholder="e.g. Football"
							onChangeText={text => this.setState({ searchInput: text })}
							value={this.state.searchInput}
						/>
						<TouchableHighlight
							style={styles.goContainer}
							onPress={() => this.search(this.state.searchInput, this.props)}
						>
							<Text style={masterStyles.btnText}>Go</Text>
						</TouchableHighlight>
					</View>
				</View>
				<View style={styles.flatlist}>
					{this.cards}
				</View>
			</View>
		);
	}
}

export default props => (
	<AppConsumer>
		{props => <SearchBoards {...props} />}
	</AppConsumer>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	goContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00a99d',
		height: 40,
		width: 40,
		borderRadius: 12,
		padding: 5
	},
	filterContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0054ff',
		height: 60,
		width: '45%',
		borderRadius: 12,
		padding: 5
	},
	flatlist: {
		height: '60%',
		width: '98%',
		display: 'flex',
		alignItems: 'center'
	}
});
