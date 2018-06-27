import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../../context/context';
import Navigation from '../../navigation/Navigation';

// COMPONENT IMPORTS

export default class NewBoardTitle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title ? this.props.title : null,
			keyword: null,
			keywords: this.props.keywords ? this.props.keywords : []
		};
	}

	addKeyword = keyword => {
		if (this.state.keywords.length <= 5 && keyword !== null) {
			let newKeywordArr = this.state.keywords;
			newKeywordArr.push(keyword);
			this.setState({
				keyword: null,
				keywords: newKeywordArr
			});
		}
	};

	removeKeyword = keyword => {
		let newKeywordsArr = this.state.keywords.filter(word => word !== keyword);
		this.setState({
			keywords: newKeywordsArr
		});
	};

	displayKeywords = keywords => {
		let keywordsDisplayed = keywords.map((word, index) => {
			return (
				<View style={styles.row} key={index}>
					<Text>{word}</Text>
					<TouchableHighlight onPress={() => this.removeKeyword(word)}><Text>-</Text></TouchableHighlight>
				</View>
			);
		});
		return keywordsDisplayed;
	};

	goToNewSquare = () => {
		this.props.saveTitleAndKeywords(this.state.title, this.state.keywords);
		this.props.goToNewSquare();
	};

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<View style={styles.header}>
							<Image
								style={{ width: 100, height: 50 }}
								source={require('../../../assets/bingoBuilderLogo.png')}
							/>
							<Text>This is TITLE for the NEW BOARD!</Text>
						</View>

						<Text>Board Title</Text>
						<TextInput
							style={styles.input}
							placeholder="e.g. Tinder"
							onChangeText={text => this.setState({ title: text })}
							value={this.state.title}
							maxLength={30}
						/>
						<Text>Keywords (Limit 5)</Text>
						<View style={styles.row}>
							<TextInput
								style={styles.input}
								placeholder="e.g. Dating"
								onChangeText={text => this.setState({ keyword: text })}
								value={this.state.keyword}
								maxLength={20}
							/>
							<TouchableHighlight
								onPress={() => this.addKeyword(this.state.keyword)}
								style={styles.addBtn}
							>
								<Text>+</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.row}>
							{this.displayKeywords(this.state.keywords)}
						</View>
						<TouchableHighlight onPress={() => this.goToNewSquare()}>
							<Text>Next &gt;</Text>
						</TouchableHighlight>
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
		justifyContent: 'space-between'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start'
	},
	row: {
		display: 'flex',
		flexDirection: 'row'
	},
	addBtn: {
		marginLeft: 10
	}
});
