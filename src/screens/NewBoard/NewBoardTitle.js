import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert } from 'react-native';
import { AppConsumer } from '../../context/context';
import masterStyles from '../../styles/masterStyles';

// COMPONENT IMPORTS
import Header from '../../screens/components/header';

export default class NewBoardTitle extends React.PureComponent {
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
				<View style={[styles.row, styles.keywordsDisplayed]} key={index}>
					<TouchableHighlight onPress={() => this.removeKeyword(word)}>
						<Text style={{ fontSize: 15, color: 'white' }}> x</Text>
					</TouchableHighlight>
					<Text style={{ color: 'white' }}>{word}</Text>

				</View>
			);
		});
		return keywordsDisplayed;
	};

	goToNewSquare = () => {
		if (!this.state.title || !this.state.keywords.length) {
			Alert.alert('Woah there!', 'You must have a title and at least one keyword!', { cancelable: false });
			return;
		}
		this.props.saveTitleAndKeywords(this.state.title, this.state.keywords);
		this.props.goToNewSquare();
	};

	componentWillReceiveProps;

	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<Header title="New Board" onLogoPress={this.props.saveUponExit} />
						<View style={styles.mainContainer}>
							<Text style={masterStyles.subtitle}>Board Title</Text>
							<TextInput
								style={masterStyles.input}
								placeholder="e.g. Tinder"
								onChangeText={text => this.setState({ title: text })}
								value={this.state.title}
								maxLength={30}
							/>
							<Text style={masterStyles.subtitle}>Keywords (Limit 5)</Text>
							<View style={styles.row}>
								<TextInput
									style={masterStyles.input}
									placeholder="e.g. Dating"
									onChangeText={text => this.setState({ keyword: text })}
									value={this.state.keyword}
									maxLength={20}
								/>
								<TouchableHighlight
									onPress={() => this.addKeyword(this.state.keyword)}
									style={styles.addBtn}
								>
									<Text style={styles.plusSign}>+</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.row}>
								{this.displayKeywords(this.state.keywords)}
							</View>
						</View>
						<TouchableHighlight style={masterStyles.button} onPress={() => this.goToNewSquare()}>
							<Text style={masterStyles.btnText}>Next &gt;</Text>
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
	mainContainer: {
		height: '50%',
		display: 'flex',
		justifyContent: 'space-around'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start',
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	addBtn: {
		marginLeft: 10
	},
	plusSign: {
		color: '#00AC9F',
		fontSize: 40
	},
	keywordsDisplayed: {
		backgroundColor: '#BFBFBF'
	}
});
