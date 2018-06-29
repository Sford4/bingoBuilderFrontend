import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import { AppConsumer } from '../context/context';
import Navigation from '../navigation/Navigation';
import masterStyles from '../styles/masterStyles';

// COMPONENT IMPORTS

export default class Join extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: null
        }
    }
    revealJoinBtn = code => {
        if(code.length === 5){
            console.log('Code was the right length!');
            return <TouchableHighlight style={styles.bigBtn} onPress={() => context.findGame(this.state.code)}>
                <Text>Find It!</Text>
            </TouchableHighlight>
        } else {
            return <TouchableHighlight style={{ visibility: 'hidden', height: 400 }}>
            <Text>Find It!</Text>
        </TouchableHighlight>
        }
    }
	render() {
		return (
			<AppConsumer>
				{context => (
					<View style={styles.container}>
						<View style={masterStyles.header}>
							<TouchableHighlight onPress={() => Navigation.navigate('MainMenu')}>
								<Image
									style={{ width: 140, height: 70, marginHorizontal: 10 }}
									source={require('../../assets/bingoBuilderLogo.png')}
								/>
							</TouchableHighlight>
							<Text style={[masterStyles.title, { width: '45%', textAlign: 'center' }]}>Join A Game</Text>
						</View>
						<View>
							<Text style={masterStyles.subtitle}>Enter Game Code</Text>
							<Text style={{ fontStyle='italics', color='#BFBFBF'}}>(Case Sensitive)</Text>
                            <TextInput
								style={masterStyles.input}
								placeholder="e.g. 1Fh8n"
								onChangeText={text => this.setState({ code: text })}
								value={this.state.code}
								maxLength={5}
							/>
						</View>
                        {this.revealJoinBtn(this.state.code, context)}
                        

						<TouchableHighlight onPress={() => Navigation.navigate('MainMenu')}>
							<Text>Go to menu</Text>
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
	}
});
