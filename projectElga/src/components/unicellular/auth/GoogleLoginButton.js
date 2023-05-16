// import React, { Component } from "react";

// import {
//     StyleSheet,
// } from "react-native";
// import { GoogleSignin, GoogleSigninButton,statusCodes } from '@react-native-google-signin/google-signin';
// import { withNavigation } from "react-navigation";

// class GoogleLoginButton extends Component {
//     state = {
//         userInfo: {}
//     }
//     _signIn = async () => {
//         try {
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             console.log(JSON.stringify(userInfo))
//             this.setState({ userInfo });
            
//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 // user cancelled the login flow
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation (f.e. sign in) is in progress already
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 // play services not available or outdated
//             } else {
//                 // some other error happened
//             }
//         }
//     };
//     render() {
//         return (
//             <GoogleSigninButton
//                 style={styles.container}
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Dark}
//                 onPress={this._signIn}
//             // disabled={this.state.isSigninInProgress} 
//             />
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         width: "100%",
//         height: 56,
//         borderRadius: 10,
//         alignItems: "center",
//         justifyContent: "flex-start",
//         flexDirection: "row",
//         marginTop: 32,
//         paddingLeft: 18,
//         paddingRight: 30,
//     },
//     buttonText: {
//         fontSize: 20,

//         paddingLeft: 20,
//     },
//     icon: {
//         width: 23,
//         height: 23,
//     },
//     iconView: {
//         marginRight: 0,
//     },
// });
// export default withNavigation(GoogleLoginButton);
