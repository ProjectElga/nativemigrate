import { useState, useLayoutEffect, useRef, useEffect } from "react";
import React from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  Linking,
} from "react-native";
import * as colors from "../../themes/chatColors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db, storageRef } from "../../config/firebaseConfig";
import moment from "moment";
import { withNavigation } from "react-navigation";
import CommonStyle from "../../themes/commonStyles";
import Header from "./chatComponent/Header";
import ChatField from "./chatComponent/uniCellular";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
const { height, width } = Dimensions.get("window");
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { Video, AVPlaybackStatus } from "expo-av";
import * as DocumentPicker from "expo-document-picker";

import uuid from "react-native-uuid";

let unsubRef;
 function Chat(props) {
  const [chatData, setchatData] = useState([]);
  const [chatRoomData, setchatRoomData] = useState([]);
  const [Msg, setMsg] = useState("");
  const [addMsg, setAddMsg] = useState(false);
  const [reply, setreply] = useState(false);
  const [replyData, setreplyData] = useState([]);

  const [senderID, setsenderId] = useState();
  const [senderName, setSenderName] = useState("");
  const scrollviewref = useRef();
  const [memberName, setmemberName] = useState("");
  const [sheetData, setsheetData] = useState();
  const bottmosheet = useRef(null);

  const [ForDocImgUpload, setForDocImgUpload] = useState(false);
  const [isImgDoc, setImgDoc] = useState("");
  const [uploadloader, setuploadloader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [FileType, setFileType] = useState("");
  const [isDocument, setisDocument] = useState(false);
  //const membersName = props.navigation.getParam("membersName");
  // const ChatRoomData = props.navigation.getParam("ChatRoomData");
  //const memberProfile = props.navigation.getParam("memberProfile");
  //const memberIds = props.navigation.getParam("memberIds");
  // console.log("ChatRoomData",props.navigation.getParam("ChatRoomData"));
  useEffect(() => {
    //console.log("membersName",membersName);
    

    // let name = [];
    
    //call from firebase for get the whole chat for the perticular project
   // GetChatData();
  }, []);

  // const GetChatData = async () => {
  //   setchatRoomData(ChatRoomData);
  //   setsenderId(await AsyncStorage.getItem("UserId"));
  //   setSenderName(await AsyncStorage.getItem("UserName"));
  //   const unsubscribe = props.navigation.addListener("blur", () => {
  //     unsubRef();
  //   });
  //   // Get data for all the chat for given member
  //   unsubRef = db
  //     .collection("Message")
  //     .doc(ChatRoomData.id)
  //     .collection("mymsg")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot(async (snapshot) => {
  //       setTimeout(() => {
  //         scrollviewref.current?.scrollToEnd();
  //       }, 1000);
  //       setchatData(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //           loader: true,
  //         }))
  //       );

  //       //update message and conversation document for update last msg information
  //       (await AsyncStorage.getItem("UserId")) ? updateReadBy() : "";
  //     });
  // };

  // //function for update read by member
  // const updateReadBy = async () => {
  //   const GetData = await db
  //     .collection("Message")
  //     .doc(ChatRoomData.id)
  //     .collection("mymsg")
  //     .orderBy("timestamp", "asc")
  //     .get();
  //   if (GetData.docs && GetData.docs.length > 0) {
  //     GetData.docs.map(async (doc, index) => {
  //       if (
  //         doc
  //           .data()
  //           .messageReadedBy.includes(await AsyncStorage.getItem("UserId")) ==
  //         false
  //       ) {
  //         //update message read by into message collecation.....
  //         const abc = doc.data().messageReadedBy;
  //         console.log(abc, "hey hey hey...");
  //         abc.push(await AsyncStorage.getItem("UserId"));

  //         db.collection("Message")
  //           .doc(ChatRoomData.id)
  //           .collection("mymsg")
  //           .doc(doc.id)
  //           .update({
  //             messageReadedBy: abc,
  //           })
  //           .then(async (res) => {
  //             //update message read by into conversation collection.....

  //             const GetConvoData = await db
  //               .collection("Conversation")
  //               .where("ConversationId", "==", ChatRoomData.id)
  //               .get();
  //             console.log(GetConvoData.docs[0].data().lastMsgInfo, "-----");
  //             var lastMsgInfo = {
  //               LastMsg: GetConvoData.docs[0].data().lastMsgInfo.LastMsg,
  //               messageReadBy: abc,
  //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //             };
  //             db.collection("Conversation")
  //               .doc(ChatRoomData.id)
  //               .update({
  //                 lastMsgInfo: lastMsgInfo,
  //               })
  //               .then((res) => {});
  //           })
  //           .catch((e) => console.log(e));
  //       }
  //     });
  //   }
  // };

  // // Function for send msg and update conversation's last message
  // const sendMsg = async (imageurl) => {
  //   var msgId = uuid.v4();
  //   db.collection("Message")
  //     .doc(ChatRoomData.id)
  //     .collection("mymsg")
  //     .add({
  //       Id: msgId,
  //       ConversationId: ChatRoomData.id,
  //       senderId: await AsyncStorage.getItem("UserId"),
  //       senderName: await AsyncStorage.getItem("UserName"),
  //       messageType: isDocument
  //         ? 4
  //         : imageurl
  //         ? FileType == "video"
  //           ? 3
  //           : 2
  //         : 1,
  //       fileURL: imageurl ? imageurl : "",
  //       Text: ForDocImgUpload ? "" : Msg,
  //       isReplyMessage: reply ? true : false,
  //       parentMessageId: reply ? replyData.parentMessageId : "",
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       messageReadedBy: [],
  //       DocumentCaption: ForDocImgUpload ? Msg : "",
  //     })
  //     .then(async (res) => {
  //       var senderInfo = {
  //         senderId: await AsyncStorage.getItem("UserId"),
  //         senderName: await AsyncStorage.getItem("UserName"),
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       };
  //       var lastMsgInfo = {
  //         LastMsg: ForDocImgUpload
  //           ? isDocument
  //             ? "sent document"
  //             : "sent image"
  //           : Msg,
  //         messageReadBy: [],
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       };
  //       //update conversation
  //       db.collection("Conversation")
  //         .doc(ChatRoomData.id)
  //         .update({
  //           lastMsgInfo: lastMsgInfo,
  //           senderInfo: senderInfo,
  //         })
  //         .then((res) => {
  //           setMsg("");
  //           setreply(false);
  //           setreplyData([]);
  //           setImgDoc("");
  //           setForDocImgUpload(false);
  //           setFileType("");
  //           setisDocument(false);
  //           bottmosheet.current.close();
  //           setTimeout(() => {
  //             scrollviewref?.current?.scrollToEnd();
  //           }, 100);
  //         })
  //         .catch((e) => console.log(e));
  //     })
  //     .catch((e) => console.log(e));
  // };

  // //function when long press for reply msg
  // const ForReply = (item) => {
  //   var replyData = {
  //     MsgSenderName: item.data.senderName,
  //     parentMessageId: item.data.Id,
  //     ParentMsg: item.data.Text,
  //     ParentFileUrl: item.data.fileURL,
  //     MessageType: item.data.messageType,
  //   };
  //   setreplyData(replyData);
  //   setreply(true);
  // };

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     allowsMultipleSelection: true,
  //   });

  //   const uploadfile = result.uri;
  //   var fileSize = await FileSystem.getInfoAsync(uploadfile);
  //   console.log(uploadfile, "-----");

  //   if (fileSize.size / 1024 / 1024 > 15) {
  //     alert("image size should be less than 15 mb.");
  //   } else {
  //     setImgDoc(uploadfile);
  //     setForDocImgUpload(true);
  //     setFileType(result.type);
  //     bottmosheet.current.close();
  //   }
  // };

  // const pickDocument = async () => {
  //   let doumentResult = await DocumentPicker.getDocumentAsync({});
  //   console.log(doumentResult);

  //   const uploadfile = doumentResult.uri;
  //   var fileSize = await FileSystem.getInfoAsync(uploadfile);
  //   console.log(uploadfile, "-----");

  //   if (fileSize.size / 1024 / 1024 > 15) {
  //     alert("Document size should be less than 15 mb.");
  //   } else {
  //     setImgDoc(uploadfile);
  //     setForDocImgUpload(true);
  //     setisDocument(true);
  //     setFileType("doc");

  //     bottmosheet.current.close();
  //   }
  // };

  // //upload document into firebase...
  // const UploadDocument = async () => {
  //   var uploadfile = isImgDoc;
  //   let filename = uploadfile.substring(uploadfile.lastIndexOf("/") + 1);
  //   console.log(uploadfile);

  //   var addImages = new Date().getTime();
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uploadfile, true);
  //     xhr.send(null);
  //   });

  //   try {
  //     const uploadTask = await firebase
  //       .storage()
  //       .ref()
  //       .child(`userimage/${addImages + filename}`)
  //       .put(blob);
  //     // console.log(uploadTask, 'mineeeeeeee');
  //     const downloadURL = await uploadTask.ref.getDownloadURL();
  //     console.log(downloadURL, "downloadurlmineeeeeeeee");
  //     setuploadloader(false);
  //     sendMsg(downloadURL);
  //   } catch (e) {
  //     console.log(e, "errorrr");
  //   }
  // };

  // //remove member from member id array from conversation collection for exit chat
  // const ExitChat = async () => {
  //   console.log(ChatRoomData.id);
  //   const GetConversation = await db
  //     .collection("Conversation")
  //     .where("ConversationId", "==", ChatRoomData.id)
  //     .get();

  //   const Allmembers = GetConversation.docs[0].data().MemberId;
  //   console.log(Allmembers);
  //   const idForRemove = Allmembers.findIndex((data, id) => data == senderID);
  //   Allmembers.splice(idForRemove, 1);
  //   console.log(Allmembers, "-------");
  //   db.collection("Conversation")
  //     .doc(ChatRoomData.id)
  //     .update({
  //       MemberId: Allmembers,
  //     })
  //     .then((res) => {
  //       //call server api for exit chat
  //       props.navigation.navigate("ChatRoom");
  //     })
  //     .catch((e) => console.log(e));
  // };

  return (
    <SafeAreaView style={CommonStyle.container} edges={["bottom"]}>
      {/* Header start */}
      <Header
        projectName={"hello"}
        memberName={"hello"}
        onBackClick={() => {
          unsubRef();
          props.navigation.goBack();
        }}
        onMenuClick={() => {
          setsheetData(1);
          bottmosheet.current.open();
        }}
      />
      header end

      {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <>
          <ScrollView ref={scrollviewref} style={CommonStyle.scrollviewstyle}>
            {chatData.length == 0 ? (
              <Text style={CommonStyle.nochattxt}>
                Let's Initiate our first conversation🙂
              </Text>
            ) : (
              chatData.map((item, index) => {
                //formate timestamp
                var currentFieldWithoutFormate =
                  item.data.timestamp && moment(item.data.timestamp.toDate());
                var currentField =
                  item.data.timestamp &&
                  moment(item.data.timestamp.toDate()).format("DD-MM-YYYY");
                var aboveField =
                  item.data.timestamp && index > 0
                    ? moment(
                        chatData[index - 1].data.timestamp.toDate()
                      ).format("DD-MM-YYYY")
                    : "";
                // var imageIndex = memberProfile.findIndex(
                //   (data, index) => data.id == item.data.senderId
                // );

                var pattern = new RegExp(
                  "^(https?:\\/\\/)?" + // protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                    "(\\#[-a-z\\d_]*)?$",
                  "i"
                );

                return (
                  <View style={CommonStyle.mainViewForChat}>
                    {/* {currentField != aboveField ? (
                      <Text
                        style={{
                          color: "#333333",
                          fontSize: RFValue(15),
                          marginBottom: RFPercentage(1.3),
                          marginTop:
                            index == 0 ? RFPercentage(2) : RFPercentage(0),
                        }}
                      >
                        {currentField == moment(new Date()).format("DD-MM-YYYY")
                          ? "Today"
                          : moment(new Date()).diff(
                              moment(currentFieldWithoutFormate),
                              "hours"
                            ) > 12 &&
                            moment(new Date()).diff(
                              moment(currentFieldWithoutFormate),
                              "hours"
                            ) < 23
                          ? "Yesterday"
                          : currentField}
                      </Text>
                    ) : undefined} */}

                    {/*<View style={CommonStyle.sepratorView}></View>
                    <TouchableOpacity
                      onLongPress={() => {
                        ForReply(item);
                      }}
                      activeOpacity={1}
                      style={CommonStyle.mainTouchbleStyle}
                    >
                      {/* <Image
                        source={{
                          uri: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80",
                        }}
                        style={CommonStyle.ProfileImgstyle}
                      /> */}
                     {/* <View style={CommonStyle.subViewForchatData}>
                        <ChatField
                          senderName={
                            item.data.senderId == senderID
                              ? "You"
                              : item.data.senderName
                          }
                          timeData={
                            item.data.timestamp &&
                            moment(item.data.timestamp.toDate()).format(
                              "hh:mm a"
                            )
                          }
                        />
                        {item.data.messageType == 1 ? (
                          pattern.test(item.data.Text) ? (
                            <Text
                              suppressHighlighting={true}
                              onPress={() => Linking.openURL(item.data.Text)}
                              style={[
                                CommonStyle.msgView,
                                {
                                  color: colors.Blue,
                                  textDecorationLine: "underline",
                                },
                              ]}
                            >
                              {item.data.Text}
                            </Text>
                          ) : (
                            <Text style={CommonStyle.msgView}>
                              {item.data.Text}
                            </Text>
                          )
                        ) : (
                          <View style={{ marginTop: RFPercentage(1) }}>
                            {item.data.DocumentCaption != "" ? (
                              <Text
                                style={[
                                  CommonStyle.msgView,
                                  {
                                    marginTop: RFValue(0),
                                    marginBottom: RFPercentage(1),
                                  },
                                ]}
                              >
                                {item.data.DocumentCaption}
                              </Text>
                            ) : undefined}

                            {item.data.messageType == 2 ? (
                              <View style={{ justifyContent: "center" }}>
                                <Image
                                  onLoad={() => {
                                    // alert()
                                    console.log(
                                      chatData[index].loader,
                                      "------"
                                    );
                                    chatData[index].loader = false;
                                    setchatData(chatData);
                                    console.log(
                                      chatData[index].loader,
                                      "afterrr ---------"
                                    );
                                  }}
                                  style={CommonStyle.chatViewImgVideo}
                                  source={{ uri: item.data.fileURL }}
                                />
                              </View>
                            ) : item.data.messageType == 3 ? (
                              <Video
                                style={[
                                  CommonStyle.chatViewImgVideo,
                                  { backgroundColor: colors.SecondBlack },
                                ]}
                                source={{
                                  uri: item.data.fileURL,
                                }}
                                useNativeControls
                                resizeMode="contain"
                              />
                            ) : item.data.messageType == 4 ? (
                              <Text>{"<document>"}</Text>
                            ) : undefined}
                          </View>
                        )}

                        {/* for reply start */}

                        {/*item.data.isReplyMessage ? (
                          <View style={CommonStyle.ReplyMainView}>
                            {/* <View style={CommonStyle.sepratorForReply}></View> */}
                           {/* <View style={{}}>
                              <Text style={CommonStyle.replyBoxSenderName}>
                                {chatData[
                                  chatData.findIndex(
                                    (data, index) =>
                                      data.data.Id == item.data.parentMessageId
                                  )
                                ].data.senderName == senderName
                                  ? "You"
                                  : chatData[
                                      chatData.findIndex(
                                        (data, index) =>
                                          data.data.Id ==
                                          item.data.parentMessageId
                                      )
                                    ].data.senderName}
                              </Text>
                              {chatData[
                                chatData.findIndex(
                                  (data, index) =>
                                    data.data.Id == item.data.parentMessageId
                                )
                              ].data.Text != "" ? (
                                <Text
                                  style={{
                                    fontSize: RFValue(13),
                                    color: "grey",
                                    paddingBottom: RFPercentage(1),
                                  }}
                                  numberOfLines={2}
                                >
                                  {
                                    chatData[
                                      chatData.findIndex(
                                        (data, index) =>
                                          data.data.Id ==
                                          item.data.parentMessageId
                                      )
                                    ].data.Text
                                  }
                                </Text>
                              ) : chatData[
                                  chatData.findIndex(
                                    (data, index) =>
                                      data.data.Id == item.data.parentMessageId
                                  )
                                ].data.messageType == 2 ? (
                                <Image
                                  style={CommonStyle.replyboxImageVideo}
                                  source={{
                                    uri: chatData[
                                      chatData.findIndex(
                                        (data, index) =>
                                          data.data.Id ==
                                          item.data.parentMessageId
                                      )
                                    ].data.fileURL,
                                  }}
                                />
                              ) : chatData[
                                  chatData.findIndex(
                                    (data, index) =>
                                      data.data.Id == item.data.parentMessageId
                                  )
                                ].data.messageType == 3 ? (
                                <Video
                                  style={[
                                    CommonStyle.replyboxImageVideo,
                                    { backgroundColor: colors.SecondBlack },
                                  ]}
                                  source={{
                                    uri: chatData[
                                      chatData.findIndex(
                                        (data, index) =>
                                          data.data.Id ==
                                          item.data.parentMessageId
                                      )
                                    ].data.fileURL,
                                  }}
                                  useNativeControls
                                  resizeMode="contain"
                                />
                              ) : (
                                <Text>{`<Document>`}</Text>
                              )}
                            </View>
                          </View>
                        ) : undefined}

                        {/* for reply end */}

                        {/*senderID == item.data.senderId &&
                        chatData.length - 1 == index ? (
                          // && memberIds.length == item.data.messageReadedBy.length
                          <View style={CommonStyle.seenView}>
                            <Image
                              source={require("../../assets/images/images/true.png")}
                              style={CommonStyle.seenIcon}
                            />
                            <Text style={CommonStyle.seenTxt}>Seen</Text>
                          </View>
                        ) : undefined}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
          <View style={CommonStyle.BottomView}>
            {reply || ForDocImgUpload ? (
              <View style={CommonStyle.replyBoxView}>
                {reply ? (
                  <View style={{ width: "85%" }}>
                    <Text style={CommonStyle.replyBoxSender}>
                      Replying to{" "}
                      <Text style={CommonStyle.replyBoxSenderSub}>
                        {replyData.MsgSenderName}
                      </Text>
                      {console.log(replyData, "lollll")}
                    </Text>
                    {replyData.ParentMsg != "" ? (
                      <Text>{replyData.ParentMsg}</Text>
                    ) : replyData.MessageType == 2 ? (
                      <Image
                        source={{ uri: replyData.ParentFileUrl }}
                        style={CommonStyle.ReplyViewForImgVideo}
                      />
                    ) : replyData.MessageType == 3 ? (
                      <Video
                        style={[
                          CommonStyle.ReplyViewForImgVideo,
                          { backgroundColor: colors.SecondBlack },
                        ]}
                        source={{
                          uri: replyData.ParentFileUrl,
                        }}
                        useNativeControls
                        resizeMode="contain"
                      />
                    ) : (
                      <Text>{`<Document>`}</Text>
                    )}
                  </View>
                ) : (
                  <View>
                    {FileType == "doc" ? (
                      <Text>{`<Document>`}</Text>
                    ) : FileType == "video" ? (
                      <Video
                        style={[
                          CommonStyle.AfterSelectMediaV,
                          { backgroundColor: colors.SecondBlack },
                        ]}
                        source={{
                          uri: isImgDoc,
                        }}
                        useNativeControls
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={{ uri: isImgDoc }}
                        style={CommonStyle.AfterSelectMediaV}
                      />
                    )}
                    {uploadloader ? (
                      <LottieView
                        autoPlay
                        source={require("../../assets/images/images/Lottie/loader.json")}
                      />
                    ) : undefined}
                    {/* </View> */}
                  {/* </View>
                )} */}
                {/* <TouchableOpacity
                  onPress={() => {
                    setreply(false);
                    setreplyData([]);
                    setImgDoc("");
                    setForDocImgUpload(false);
                    setFileType("");
                    setisDocument(false);
                  }}
                >
                  <Image
                    source={require("../../assets/images/images/cross.png")}
                    style={CommonStyle.replyBoxCrossIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : undefined} */}
            {/* <View style={CommonStyle.bottomSubView}>
              <View style={CommonStyle.bottomotherSubView}>
                <TouchableOpacity
                  onPress={() => {
                    setsheetData(2);
                    bottmosheet.current.open();
                  }}
                >
                  <Image
                    source={require("../../assets/images/images/plus.png")}
                    style={CommonStyle.plusBtn}
                  />
                </TouchableOpacity>
                <TextInput
                  value={Msg}
                  onChangeText={(val) => setMsg(val)}
                  placeholder="Type your message here"
                  style={CommonStyle.msgInput}
                />
              </View>
              <TouchableOpacity
                disabled={ForDocImgUpload ? false : Msg == "" ? true : false}
                onPress={() => {
                  ForDocImgUpload
                    ? [UploadDocument(), setuploadloader(true)]
                    : sendMsg();
                }}
                style={CommonStyle.sendBtn}
              >
                <Image
                  source={require("../../assets/images/images/send.png")}
                  style={CommonStyle.sendBtnImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </> */}

        {/*<RBSheet ref={bottmosheet} openDuration={250}>
          <View style={CommonStyle.RBMainV}>
            <Image
              style={CommonStyle.RBTopImg}
              source={require("../../assets/images/images/bottomsheetIcon.png")}
            />
            <View style={{ marginTop: RFPercentage(2.5) }}>
              {sheetData == 2 ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage();
                    }}
                    activeOpacity={1}
                    style={CommonStyle.RBTouchble}
                  >
                    <Image
                      style={CommonStyle.Sheet1Icon}
                      source={require("../../assets/images/images/AttachImage.png")}
                    />
                    <Text style={CommonStyle.sheetTxt}>Attach Media</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickDocument();
                    }}
                    activeOpacity={1}
                    style={CommonStyle.RBTouchble}
                  >
                    <Image
                      style={CommonStyle.Sheet1Icon}
                      source={require("../../assets/images/images/AttachDoc.png")}
                    />
                    <Text style={CommonStyle.sheetTxt}>Add Attachments</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      bottmosheet.current.close();
                    }}
                    activeOpacity={1}
                    style={CommonStyle.RBTouchble}
                  >
                    <Image
                      style={CommonStyle.Sheet2Icon}
                      source={require("../../assets/images/images/user-plus.png")}
                    />
                    <Text style={CommonStyle.sheetTxt}>Add Member</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      ExitChat();
                    }}
                    activeOpacity={1}
                    style={CommonStyle.RBTouchble}
                  >
                    <Image
                      style={CommonStyle.Sheet2Icon}
                      source={require("../../assets/images/images/log-out.png")}
                    />
                    <Text style={CommonStyle.sheetTxt}>Exit Chat</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </RBSheet>
      </KeyboardAvoidingView> 
    */}
    </SafeAreaView>
  );
}
export default withNavigation(Chat)