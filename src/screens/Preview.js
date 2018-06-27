import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';

// COMPONENT IMPORTS

export default class Preview extends React.Component {
	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<View style={styles.header}>
							<Image
								style={{ width: 100, height: 50 }}
								source={require('../../assets/bingoBuilderLogo.png')}
							/>
							<Text>This is TITLE for the PREVIEW!</Text>
						</View>
						<Text>{context.testValue}</Text>
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
		justifyContent: 'center'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'flex-start'
	}
});
