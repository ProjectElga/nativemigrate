import UserList from '../chat/UserList';
import React, { Component } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import Chat from '../chat';
import ChatRoom from '../chat/ChatRoom'
const Stack = createNativeStackNavigator();


function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserList" component={UserList} />
            {/* <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} /> */}
        </Stack.Navigator>
    )
}
export default function Ongoing() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}