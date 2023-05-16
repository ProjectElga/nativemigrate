// import React, { useState, useEffect, useCallback } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Button,
//   Text,
//   StatusBar,
//   TouchableWithoutFeedback,
// } from "react-native";
// // import * as firebase from "firebase";
// // import "firebase/firestore";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RFValue } from "react-native-responsive-fontsize";
// import COLORS from "../../themes/colors";
// import CustomMessage from "./chatComponent/CustomMessage";

// const firebaseConfig = {
//   //Your firebase config here
//   apiKey: "AIzaSyDr9JNBft73VHJ_r4662VW1nYfWTB4wj0E",
//   authDomain: "elga-roma-717ed.firebaseapp.com",
//   projectId: "elga-roma-717ed",
//   storageBucket: "elga-roma-717ed.appspot.com",
//   messagingSenderId: "529591963729",
//   appId: "1:529591963729:web:82f37b90e5da303631e870",
//   measurementId: "G-6TNR5H94F1",
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();
// const chatsRef = db.collection("chat");

// export default function ChatTest() {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     readUser();
//     const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
//       const messagesFirestore = querySnapshot
//         .docChanges()
//         .filter(({ type }) => type === "added")
//         .map(({ doc }) => {
//           const message = doc.data();
//           //createdAt is firebase.firestore.Timestamp instance
//           //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
//           return { ...message, createdAt: message.createdAt.toDate() };
//         })
//         .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
//       appendMessages(messagesFirestore);
//     });
//     return () => unsubscribe();
//   }, []);

//   const appendMessages = useCallback(
//     (messages) => {
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, messages)
//       );
//     },
//     [messages]
//   );

//   async function readUser() {
//     const user = await AsyncStorage.getItem("user");
//     if (user) {
//       setUser(JSON.parse(user));
//     }
//   }
//   async function handlePress() {
//     const _id = Math.random().toString(36).substring(7);
//     const user = { _id, name };
//     await AsyncStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//   }
//   async function handlePressLogOut() {
//     await AsyncStorage.removeItem("user");
//     setUser(null);
//   }
//   async function handleSend(messages) {
//     const writes = messages.map((m) => chatsRef.add(m));
//     await Promise.all(writes);
//   }
//   if (user) {
//     return (
//       <SafeAreaView style={{ height: "100%" }}>
//         <StatusBar
//           backgroundColor={COLORS.primaryTeal500}
//           barStyle="light-content"
//         />
//         <View style={styles.headerWrapper}>
//           <View>
//             <Text>Heelo</Text>
//           </View>
//           <TouchableWithoutFeedback onPress={handlePressLogOut}>
//             <View>
//               <Text>logout</Text>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//         <View style={{ height: "92%" }}>
//           <GiftedChat messages={messages}
//            user={user}
//             onSend={handleSend}
//             renderMessage={(props) => <CustomMessage {...props} />} 
//             />
//         </View>
//       </SafeAreaView>
//     );
//   }
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your name"
//         value={name}
//         onChangeText={setName}
//       />
//       <Button onPress={handlePress} title="Enter the chat" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 30,
//   },
//   input: {
//     height: 50,
//     width: "100%",
//     borderWidth: 1,
//     padding: 15,
//     marginBottom: 20,
//     borderColor: "gray",
//   },
//   headerWrapper: {
//     paddingHorizontal: RFValue(16, 844),
//     backgroundColor: COLORS.primaryTeal500,
//     width: "100%",
//     height: "8%",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//   },
// });
