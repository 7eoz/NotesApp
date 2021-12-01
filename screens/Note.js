import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, List, Divider, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';

function Note({ route }) {
	const [notes, setNotes] = useState([]);
	const navigation = useNavigation();
	const { singleNote, noteIndex } = route.params;

	useFocusEffect(
		React.useCallback(() => {
			loadNotes();
		}, [])
	);

	const loadNotes = async () => {
		try {
			AsyncStorage.getItem('NOTES').then((notes) => {
				setNotes(JSON.parse(notes));
			});
		} catch (e) {
			console.log(e);
		}
	};

	const deleteNote = async () => {
		const newNotes = [];
		const newestNotes = [];
		let index = 0;
		notes.reverse().map((note, index) => {
			if (index !== noteIndex) {
				newNotes.push(note);
				console.log('newNotes:', newNotes);
			}
		});
		console.log('newNotes:', newNotes);
		await AsyncStorage.setItem(
			'NOTES',
			JSON.stringify(newNotes.reverse())
		).then(() => navigation.navigate('ShowNotes'));
	};

	return (
		<View>
			<Text style={styles.note}>{singleNote}</Text>
			<View>
				<Button style={styles.button} onPress={deleteNote}>
					Delete
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		fontSize: 20,
	},
	item: {
		marginVertical: 4,
	},
	title: {
		textAlign: 'center',
		marginTop: 50,
	},
	note: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: '5%',
		marginRight: '5%',
		fontWeight: 'bold',
	},
	button: {
		marginBottom: 30,
		borderRadius: 10,
		borderWidth: 2,
		marginLeft: '5%',
		marginRight: '5%',
		borderColor: '#000',
	},
});

export default Note;
