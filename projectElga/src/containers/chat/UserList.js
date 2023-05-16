import { useState, useEffect, useLayoutEffect } from "react";
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
var uuid = require('rn-uuid');
import CommonStyle from "../../themes/commonStyles";


export default function UserList(props) {

    const [senderId, setSenderId] = useState('')
    const [SenderName, setSenderName] = useState('')




    const btn_Login = async () => {
        AsyncStorage.setItem('AccessToken', senderId)

        if (senderId == 2) {
            AsyncStorage.setItem('UserId', 'd8e0ea5b-d601-43c2-a34c-3dd9296a8ba0')
            AsyncStorage.setItem('UserName', 'Nikhilesh Mallick')

        }
        else if (senderId == 3) {
            AsyncStorage.setItem('UserId', '4b97439d-a4c7-45a1-89a4-3530b7e49b5f')
            AsyncStorage.setItem('UserName', 'Sanghamitra Nayak')

        }
        else if (senderId == 4) {
            AsyncStorage.setItem('UserId', '1894945f-bcec-46fa-9633-452a18c40edf')
            AsyncStorage.setItem('UserName', 'Aditya Srivastava')

        }
        else if (senderId == 1) {
            AsyncStorage.setItem('UserId', 'a4e5ee00-4447-4a1e-b2f2-ce7b635dd0ae')
            AsyncStorage.setItem('UserName', 'Rohit Singh')

        }
        props.navigation.navigate('ChatRoom')
    }


    return (
        <SafeAreaView style={styles.container}>



            <View style={{ marginTop: 20, paddingHorizontal: RFPercentage(2) }}>
                <TextInput
                    value={senderId}
                    onChangeText={(val) => setSenderId(val)}
                    placeholder="UserId..."
                    style={CommonStyle.UIDTxtInput}
                />

                <TouchableOpacity style={CommonStyle.LoginBtn}
                    onPress={() => {
                        btn_Login()
                    }}
                >
                    <View>
                        <Text style={CommonStyle.LoginTxt}>Login</Text>

                    </View>
                </TouchableOpacity>

            </View>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});
