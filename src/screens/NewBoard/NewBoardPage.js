import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS
import NewBoardTitle from './NewBoardTitle';
import NewSquare from './NewSquare';

export default class NewBoardPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titlePage: true,
			title: null,
			keywords: [],
			squares: []
		};
	}

	saveSquares = squares => {
		this.setState({
			squares: squares
		});
	};

	saveTitleAndKeywords = (title, keywords) => {
		this.setState({
			title: title,
			keywords: keywords
		});
	};

	goToNewSquare = () => {
		this.setState({
			titlePage: false
		});
	};
	goToTitlePage = () => {
		this.setState({
			titlePage: true
		});
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						{this.state.titlePage
							? <NewBoardTitle
									goToNewSquare={this.goToNewSquare}
									saveTitleAndKeywords={this.saveTitleAndKeywords}
									title={this.state.title}
									keywords={this.state.keywords}
								/>
							: <NewSquare
									goToTitlePage={this.goToTitlePage}
									saveSquares={this.saveSquares}
									squares={this.state.squares}
									title={this.state.title}
								/>}
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
	}
});
