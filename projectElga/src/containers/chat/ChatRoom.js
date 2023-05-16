import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import STORAGE_KEY from "../../constants/StorageKeys";
import STRINGS from "../../constants/Strings";
import OnGoingCard from "../../components/multicellular/project/OngoingCard";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import ComingSoonCard from "../../components/multicellular/general/comingSoon";
import * as Analytics from "expo-firebase-analytics";
import NearBy from "./NearBy";
//import { cryptoSecret } from "../../config/config";
function ChatRoom(props) {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const { isFocused } = props;

  let ProjectList = useSelector((state) => state.projects);
  const { projectsData = [] } = ProjectList;
  useEffect(() => {
    effect();
  }, []);

  const effect = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    setUserId(userId);
  };
  // const decrypt = (ciphertext) => {
  //   console.log("decrypted", ciphertext);
  //   var CryptoJS = require("crypto-js");
  //   var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), cryptoSecret);
  //   var plaintext = CryptoJS.enc.Utf8.stringify(bytes);
  //   console.log("decrypted text", plaintext);
  //   return plaintext;
  // };
  const checkRead = (data) => {
    var bool = false;
    const userId = data?.loggedUser?.id;
    data?.lastMsgInfo?.msgReadBy?.map((value, index) => {
      if (value == userId) {
        bool = true;
      }
    });
    return bool;
  };
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const handleOnClick = (data) => {
    Analytics.logEvent(`Projects_ChatCard`, {
      contentType: "chat",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    navigation.navigate("Chat", {
      ChatRoomData: data,
    });
  };
  const getCreatedName = (data) => {
    var createrName = "";
    data?.participants?.map((value, index) => {
      if (value.id == data.createdById) {
        createrName = value.displayName;
      }
    });
    return createrName;
  };

  return props.isChatActive ? (
    <View>
      {!props.isSearchActive ? (
        <ScrollView style={{ width: "100%", marginBottom: 100 }}>
          {projectsData?.length > 0 ? (
            projectsData?.map((data, index) => {
              // var projectData = projectsData;
              // var ConvoId = ChatRoomLocal.findIndex(
              //   (Convo, ConvoIndex) => Convo.data.ConversationId == data.id
              // );
              var images = [];
              data?.participants?.map((value, index) => {
                images.push(value.profileImageUrl);
              });
              data?.type == "CIRCLE"
                ? null
                : images.push(data?.loggedUser?.profileImageUrl);
              // const date = moment(data?.lastMsgInfo.timestamp.seconds).tz("Asia/kolkata").utc().format()
              const date = new Date(
                data?.lastMsgInfo?.timestamp?.seconds * 1000
              );
              var dt = moment(date).tz("Asia/kolkata").format("hh:mm a");
              if (moment().tz("Asia/kolkata").isSame(date, "day")) {
                dt = moment(date).tz("Asia/kolkata").format("hh:mm a");
              } else {
                if (moment().tz("Asia/kolkata").diff(date, "days") === -1) {
                  dt = STRINGS.YESTERDAY;
                } else {
                  if (!moment().tz("Asia/kolkata").isSame(date, "year")) {
                    dt = moment(date)
                      .tz("Asia/kolkata")
                      .format(STRINGS.DATE_FORMAT_WITH_YEAR);
                  } else {
                    dt = moment(date).tz("Asia/kolkata").format("DD MMM");
                  }
                }
              }
              return (
                <View
                  style={{
                    opacity:
                      data?.participants && data?.participants?.length > 0
                        ? 1
                        : 0.5,
                  }}
                >
                  <OnGoingCard
                    key={index}
                    onPress={
                      data?.participants && data?.participants?.length > 0
                        ? () => {
                            handleOnClick(data);
                          }
                        : null
                    }
                    images={images}
                    profileName={
                      data?.type == "CIRCLE"
                        ? null
                        : data.createdById == userId
                        ? null
                        : getCreatedName(data)
                    }
                    title={
                      data?.type == "CIRCLE"
                        ? data?.participants[0]?.displayName
                        : data?.name
                    }
                    mainCategory={
                      data?.type
                        ? data?.type?.toLowerCase() === "collaboration"
                          ? "Project"
                          : data?.type?.toLowerCase()
                        : data?.type?.toLowerCase()
                    }
                    subCategory={data.priceDetails?.entityType?.toLowerCase()}
                    date={data?.lastMsgInfo?.timestamp ? dt : ""}
                    read={
                      data?.participants && data?.participants?.length > 0
                        ? checkRead(data)
                        : true
                    }
                    subtitleText={
                      data?.participants && data?.participants?.length > 0
                        ? data?.lastMsgInfo?.msg
                        : "No one in the chat"
                    }
                  />
                </View>
              );
            })
          ) : (
            <View>
              <NearBy isFocused={isFocused} />
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={{ width: "100%", marginBottom: 100 }}>
          {projectsData?.projectList?.length != 0 ? (
            projectsData?.projectList?.map((data, index) => {
              // var projectData = projectsData;
              // var ConvoId = ChatRoomLocal.findIndex(
              //   (Convo, ConvoIndex) => Convo.data.ConversationId == data.id
              // );
              var images = [];
              data?.participants?.map((value, index) => {
                images.push(value.profileImageUrl);
              });
              data?.type == "CIRCLE"
                ? null
                : images.push(data?.loggedUser?.profileImageUrl);
              // const date = moment(data?.lastMsgInfo.timestamp.seconds).tz("Asia/kolkata").utc().format()
              const date = new Date(
                data?.lastMsgInfo?.timestamp?.seconds * 1000
              );
              var dt = moment(date).tz("Asia/kolkata").format("hh:mm a");
              if (moment().tz("Asia/kolkata").isSame(date, "day")) {
                dt = moment(date).tz("Asia/kolkata").format("hh:mm a");
              } else {
                if (moment().tz("Asia/kolkata").diff(date, "days") === -1) {
                  dt = STRINGS.YESTERDAY;
                } else {
                  if (!moment().tz("Asia/kolkata").isSame(date, "year")) {
                    dt = moment(date)
                      .tz("Asia/kolkata")
                      .format(STRINGS.DATE_FORMAT_WITH_YEAR);
                  } else {
                    dt = moment(date).tz("Asia/kolkata").format("DD MMM");
                  }
                }
              }
              return (
                <View
                  style={{
                    opacity:
                      data?.participants && data?.participants?.length > 0
                        ? 1
                        : 0.5,
                  }}
                >
                  <OnGoingCard
                    key={index}
                    onPress={
                      data?.participants && data?.participants?.length > 0
                        ? () => {
                            handleOnClick(data);
                          }
                        : null
                    }
                    images={images}
                    profileName={
                      data?.type == "CIRCLE"
                        ? null
                        : data.createdById == userId
                        ? null
                        : getCreatedName(data)
                    }
                    title={
                      data?.type == "CIRCLE"
                        ? data?.participants[0]?.displayName
                        : data?.name
                    }
                    mainCategory={
                      data?.type
                        ? data?.type?.toLowerCase() === "collaboration"
                          ? "Project"
                          : data?.type?.toLowerCase()
                        : data?.type?.toLowerCase()
                    }
                    subCategory={data.priceDetails?.entityType?.toLowerCase()}
                    date={data?.lastMsgInfo?.timestamp ? dt : ""}
                    read={
                      data?.participants && data?.participants?.length > 0
                        ? checkRead(data)
                        : true
                    }
                    subtitleText={
                      data?.participants && data?.participants?.length > 0
                        ? data?.lastMsgInfo?.msg
                        : "No one in the chat"
                    }
                  />
                </View>
              );
            })
          ) : (
            <View>
              <NearBy isFocused={isFocused} />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  ) : (
    <View style={{ marginHorizontal: RFValue(16, 844) }}>
      <ComingSoonCard
        image="https:images.unsplash.com/photo-1517816428104-797678c7cf0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        title="Opportunity Board"
        line1="Find the right talent for your project"
        line2="Track all responses"
      />
    </View>
  );
}

export default ChatRoom;
