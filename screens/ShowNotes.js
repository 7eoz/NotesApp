import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { List, Divider, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/core';

function ShowNotes() {
	const [notes, setNotes] = useState([]);
	const navigation = useNavigation();

	useFocusEffect(
		React.useCallback(() => {
			loadNotes();
		}, [])
	);

	console.log('ShowNotes:', notes);

	const loadNotes = async () => {
		try {
			AsyncStorage.getItem('NOTES').then((notes) => {
				setNotes(JSON.parse(notes));
			});
		} catch (e) {
			console.log(e);
		}
	};

	const listItem = ({ item, index }) => (
		<List.Item
			title={<Text category='h5'>{item}</Text>}
			onPress={() => {
				navigation.navigate('Note', {
					singleNote: item,
					noteIndex: index,
				});
				console.log('item:', item);
				console.log('index:', index);
				console.log('notes:', notes);
			}}
		/>
	);

	return (
		<View>
			<Text category='h1' style={styles.title}>
				List of Notes
			</Text>
			<FlatList
				styles={styles.container}
				data={notes.reverse()}
				ItemSeparatorComponent={Divider}
				renderItem={listItem}
				keyExtractor={(item, index) => index.toString()}
			/>
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
		marginTop: 10,
		fontSize: 36,
	},
	notes: {
		fontSize: 24,
	},
});

export default ShowNotes;
