import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import SvgUri from "expo-svg-uri";
import IMAGES from "../../themes/Images";
import SVGS from "../../constants/SvgUri";
import styles from "./Styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Chats(props) {
  const renderChat = (elementInArray) => (
    <SafeAreaView style={styles.chatLayout}>
      <View style={styles.chatprofilePicture}>
        {elementInArray.isChatComingNow ? null : (
          <Image source={IMAGES.Crewmate_7} style={styles.chatprofileImage} />
        )}
      </View>
      <View style={styles.chatDetailContainer}>
        {elementInArray.isChatComingNow ? null : (
          <View>
            <Text style={styles.chatUserName}>{elementInArray.name}</Text>
          </View>
        )}
        {renderDate()}
        <View>
          <Text style={styles.chatText}>{elementInArray.chatText}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  const renderChatOwner = (elementInArray) => (
    <SafeAreaView style={styles.chatLayoutOwned}>
      <View style={styles.chatDetailContainerOwner}>
        {elementInArray.isChatComingNow ? null : (
          <View>
            <Text style={styles.chatUserName}>{elementInArray.name}</Text>
          </View>
        )}
        {renderDate()}
        <View>
          <Text style={styles.chatText}>{elementInArray.chatText}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  const renderDate = () => (
    <View style={styles.dividerLayout}>
      <Text style={styles.chatDate}>08-09-2021 | 08:20PM </Text>
    </View>
  );
  return (
    <ScrollView
      overScrollMode="never"
      style={{ width: Dimensions.get("window").width }}
      showsVerticalScrollIndicator={false}
    >
      {props.chatInbox &&
      <>
        {props.chatInbox.map((elementInArray, index) => (
          <View
            key={index.toString()}
            style={
              elementInArray.isOwned && {
                justifyContent:"flex-end",
                alignItems: "flex-end",
                flexDirection:"row",
                width:"100%"
              }
            }
          >
            {elementInArray.isOwned
              ? renderChatOwner(elementInArray)
              : renderChat(elementInArray)}
          </View>
        ))}
      </>}
    </ScrollView>
  );
}
