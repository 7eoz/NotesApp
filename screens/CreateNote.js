import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

function CreateNote() {
	const [note, setNote] = useState('');
	const navigation = useNavigation();

	const clearAsyncStorage = async () => {
		AsyncStorage.clear();
	};

	const saveNote = async () => {
		// clearAsyncStorage();
		const value = await AsyncStorage.getItem('NOTES');
		const n = value ? JSON.parse(value) : [];
		const index = n.length + 1;
		n.push(note);
		await AsyncStorage.setItem('NOTES', JSON.stringify(n)).then(() =>
			navigation.navigate('ShowNotes')
		);
		setNote('');
	};

	return (
		<View>
			<View style={styles.noteInputContainer}>
				<TextInput
					value={note}
					onChangeText={(text) => setNote(text)}
					style={{ color: '#000', fontSize: 22 }}
					multiline={true}
					autofocus
					selectionColor='#000'
					placeholder='Type your note here...'
				/>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.bottom}
			/>
			<Button style={styles.button} appearance='filled' onPress={saveNote}>
				Create Note
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 30,
		paddingTop: 80,
		width: Dimensions.get('window').width,
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
	},
	noteInputContainer: {
		borderBottomWidth: 1,
		borderColor: 'black',
		marginLeft: '5%',
		marginTop: 10,
		marginBottom: 10,
		padding: 5,
		width: '90%',
		height: 36,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	noteInput: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000',
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

export default CreateNote;
