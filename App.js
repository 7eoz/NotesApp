// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CreateNote from './screens/CreateNote';
// import ShowNotes from './screens/ShowNotes';
// import Note from './screens/Note';

// const Tab = createMaterialBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<Tab.Navigator>
// 				<Tab.Screen name='CreateNote' component={CreateNote} />
// 				<Tab.Screen name='ShowNotes' component={ShowNotes} />
// 			</Tab.Navigator>
// 			<Stack.Navigator>
// 				<Stack.Screen name='Note' component={Note} />
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// }
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNote from './screens/CreateNote';
import ShowNotes from './screens/ShowNotes';
import Note from './screens/Note';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='CreateNote' component={CreateNote} />
				<Stack.Screen name='ShowNotes' component={ShowNotes} />
				<Stack.Screen name='Note' component={Note} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
