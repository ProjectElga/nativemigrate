import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Hyperlink from "react-native-hyperlink";
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
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import { connect, useSelector } from "react-redux";
import * as colors from "../../themes/chatColors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, storage, auth } from "../../config/firebaseConfig";
import moment from "moment";
import CommonStyle from "../../themes/commonStyles";
import Header from "./chatComponent/Header";
import ChatField from "./chatComponent/uniCellular";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
const { height, width } = Dimensions.get("window");
import firebase from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { Video, AVPlaybackStatus } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";
import SvgUri from "expo-svg-uri";
import SVGS from "../../constants/SvgUri";
import COLORS from "../../themes/colors";
import IMAGES from "../../themes/Images";
import { Icon, BottomSheet } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import STRINGS from "../../constants/Strings";
import STORAGE_KEY from "../../constants/StorageKeys";
import { circleTypes } from "../../reducers/projects/circle";
import decodeToken from "../../utils/decodeToken";
import PushNotification from "../../components/multicellular/notification";
import { projectActionTypes } from "../../reducers/projects/projectAction";
// import { cryptoSecret } from "../../config/config";
// import CryptoES from "crypto-es";
import * as Analytics from "expo-firebase-analytics";
import NothingHere from "../../components/multicellular/general/nothingHere/nothingHere";
import { useSwipe } from "../../hooks/useSwipe";
import Styles from "./Styles";

const Chat = (props) => {
  const [chatData, setchatData] = useState([]);
  const [chatRoomData, setchatRoomData] = useState([]);
  const [Msg, setMsg] = useState("");
  const [addMsg, setAddMsg] = useState(false);
  const [reply, setreply] = useState(false);
  const [replyData, setreplyData] = useState([]);

  const [senderID, setsenderId] = useState();
  const [senderName, setSenderName] = useState("");
  const scrollviewref = useRef();
  //const [memberName, setmemberName] = useState("");
  const [sheetData, setsheetData] = useState();
  const bottmosheet = useRef(null);
  const [docSize, setDocSize] = useState(null);
  const [docName, setDocName] = useState(null);
  const [ForDocImgUpload, setForDocImgUpload] = useState(false);
  const [isImgDoc, setImgDoc] = useState("");
  const [uploadloader, setuploadloader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [FileType, setFileType] = useState("");
  const [isDocument, setisDocument] = useState(false);
  const [memberName, setMemberName] = useState([]);
  const [memberProfile, setMemberProfile] = useState([]);
  const [images, setImages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [expoTokens, setExpoTokens] = useState([]);
  const { route } = props;
  const { ChatRoomData } = route.params;
  const [tagSheet, setTagSheet] = useState(false);
  const [optionsSheet, setOptionsSheet] = useState(false);
  // const ChatRoomData = props.navigation.getParam("ChatRoomData");
  //const memberProfile = props.navigation.getParam("memberProfile");
  //const memberIds = props.navigation.getParam("memberIds");
  //const conversationImage = props.navigation.getParam("conversationImage");
  // const conversationImageBackground =
  //   ChatRoomData.participants[0]?.coverImageUrl;
  const navigation = useNavigation();
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  function onSwipeLeft() {
    navigation.navigate("ChatMoodboard", {
      ChatRoomData: ChatRoomData,
    });
  }

  function onSwipeRight() {
    console.log("SWIPE RIGHT");
  }
  const bottomSheetModalRef = useRef(null);
  const [chatLimit, setChatlimit] = useState(10);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const snap = Platform.OS == "ios" ? "35%" : "35%";
  const snapPoints = useMemo(() => [snap, snap], []);

  const tags = ["Add Media", "Add Attachments", "Go to Moodboards", "Gifs"];
  const icons = [
    SVGS.WHITE_IMAGE,
    SVGS.WHITE_ATTACHMENT,
    SVGS.WHITE_MOODBOARD,
    SVGS.THUNDER,
  ];
  const bgColor = [
    COLORS.teritiaryBlue,
    COLORS.teritiaryWarning,
    COLORS.yellow,
    COLORS.teritiaryPurple,
  ];

  useEffect(() => {
    props.resetMemberReducer();
    var ids = [];
    ids.push(ChatRoomData?.loggedUser?.id);
    ChatRoomData?.participants?.map((value, index) => {
      return ids.push(value?.id);
    });
    setMemberIds([...ids]);

    var names = [];
    names.push(ChatRoomData?.loggedUser?.displayName);
    ChatRoomData?.participants?.map((value, index) => {
      return names.push(value?.displayName);
    });
    setMemberName([...names]);

    var profiles = [];
    profiles.push(ChatRoomData?.loggedUser);
    ChatRoomData?.participants?.map((value, index) => {
      return profiles.push(value);
    });
    setMemberProfile([...profiles]);

    var participants = [];
    ChatRoomData?.participants?.map((value, index) => {
      return participants.push({
        id: value?.id,
        profileImageUrl: value?.profileImageUrl,
        displayName: value?.displayName,
      });
    });

    var images = [];
    var tokens = [];
    ChatRoomData?.participants?.map((value, index) => {
      images.push(value?.profileImageUrl);
      value?.expoToken?.map((value, item) => {
        tokens.push(value);
      });
    });
    setExpoTokens([...tokens]);

    ChatRoomData?.type == "CIRCLE"
      ? null
      : images.push(ChatRoomData?.loggedUser?.profileImageUrl);
    setImages(images);

    // const name =[]
    //   membersName??.map((value, index) => {
    //    name.push(value.displayName);
    //  });
    //  console.log("name", name);
    // setmemberName(name);

    //setmemberName(membersName);
    // StatusBar.setHidden(true);
    //call from firebase for get the whole chat for the perticular project
    GetChatData();
  }, []);
  const commingSoonText = () => {
    return (
      <View style={CommonStyle.comingSoonLayout}>
        <Text style={CommonStyle.comingSoonText}>Coming Soon</Text>
      </View>
    );
  };
  const renderTagSheet = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setTagSheet(false);
        }}
      >
        <BottomSheet isVisible={tagSheet}>
          <View
            style={{
              paddingTop: RFValue(12, 844),
              paddingBottom: RFValue(20, 844),
              paddingHorizontal: RFValue(24, 844),
              backgroundColor: COLORS.monoWhite900,
              borderTopLeftRadius: RFValue(24, 844),
              borderTopRightRadius: RFValue(24, 844),
            }}
          >
            <View
              style={{
                borderWidth: 2,
                width: RFValue(40, 844),
                alignSelf: "center",
                borderColor: COLORS.monoBlack700,
                borderRadius: RFValue(24, 844),
              }}
            ></View>
            <TouchableOpacity
              onPress={() => {
                pickImage();
              }}
            >
              <View
                style={[CommonStyle.sheetTab, { marginTop: RFValue(20, 844) }]}
              >
                <View
                  style={[
                    CommonStyle.iconContainer,
                    { backgroundColor: bgColor[0] },
                  ]}
                >
                  <SvgUri
                    svgXmlData={icons[0]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
                </View>
                <Text style={CommonStyle.sheetText}>{tags[0]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickDocument();
              }}
            >
              <View
                style={[CommonStyle.sheetTab, { marginTop: RFValue(20, 844) }]}
              >
                <View
                  style={[
                    CommonStyle.iconContainer,
                    { backgroundColor: bgColor[1] },
                  ]}
                >
                  <SvgUri
                    svgXmlData={icons[1]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
                </View>
                <Text style={CommonStyle.sheetText}>{tags[1]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTagSheet(false);
                navigation.navigate("ChatMoodboard", {
                  ChatRoomData: ChatRoomData,
                });
              }}
            >
              <View
                style={[CommonStyle.sheetTab, { marginTop: RFValue(20, 844) }]}
              >
                <View
                  style={[
                    CommonStyle.iconContainer,
                    { backgroundColor: bgColor[2] },
                  ]}
                >
                  <Image
                    source={IMAGES.WhiteMoodBoard}
                    style={CommonStyle.navIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={CommonStyle.sheetText}>{tags[2]}</Text>
              </View>
            </TouchableOpacity>
            <View style={[CommonStyle.disableSheet]}>
              <TouchableOpacity>
                <View
                  style={[
                    CommonStyle.sheetTab,
                    { marginTop: RFValue(20, 844) },
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.iconContainer,
                      { backgroundColor: bgColor[3] },
                    ]}
                  >
                    <SvgUri
                      svgXmlData={icons[3]}
                      width={RFValue(24, 844)}
                      height={RFValue(24, 844)}
                    />
                  </View>
                  <Text style={CommonStyle.sheetText}>{tags[3]}</Text>
                </View>
              </TouchableOpacity>
              {commingSoonText()}
            </View>
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
    );
  };

  const bottomSheetModalOptionsRef = useRef(null);

  const handlePresentOptionsPress = useCallback(() => {
    bottomSheetModalOptionsRef.current?.present();
  }, []);
  const handleDismissOptionsPress = useCallback(() => {
    bottomSheetModalOptionsRef.current?.dismiss();
  }, []);

  const handleOptionsSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;

  const snap2 = Platform.OS == "ios" ? "10%" : "10%";
  const snapPointsOptions = useMemo(() => [snap2, snap2], []);

  const OptionsTags = [
    "Console",
    "Add Members",
    "Mute",
    "Archive",
    "Exit Chat",
  ];
  const OptionsIcons = [
    SVGS.CONSOLE,
    SVGS.USER_PLUS,
    SVGS.MIC_OFF,
    SVGS.ARCHIVE,
    SVGS.EXIT_CHAT,
  ];

  const renderOptionsSheet = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setOptionsSheet(false);
        }}
      >
        <BottomSheet isVisible={optionsSheet}>
          <View
            style={{
              paddingTop: RFValue(12, 844),
              paddingBottom: RFValue(20, 844),
              paddingHorizontal: RFValue(24, 844),
              backgroundColor: COLORS.monoWhite900,
              borderTopLeftRadius: RFValue(24, 844),
              borderTopRightRadius: RFValue(24, 844),
            }}
          >
            <View
              style={{
                borderWidth: 2,
                width: RFValue(40, 844),
                alignSelf: "center",
                borderColor: COLORS.monoBlack700,
                borderRadius: RFValue(24, 844),
              }}
            ></View>
            <TouchableOpacity
              onPress={() => {
                Analytics.logEvent("screen_view", {
                  firebase_screen:
                    ChatRoomData?.type == "CIRCLE"
                      ? "CircleInfoChat"
                      : "ProjectInfoChat",
                  userId: profileData?.id,
                  displayName: profileData?.displayName,
                  isCreator: profileData?.isCreator,
                });
                ChatRoomData?.type == "CIRCLE"
                  ? props.navigation.navigate("CircleInfo", {
                      contact: ChatRoomData?.participants,
                    })
                  : props.navigation.navigate("ProjectInfo", {
                      data: ChatRoomData,
                      images: images,
                    });
                setOptionsSheet(false);
              }}
            >
              <View
                style={[CommonStyle.sheetTab, { marginTop: RFValue(32, 844) }]}
              >
                <SvgUri
                  svgXmlData={OptionsIcons[0]}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />

                <Text style={CommonStyle.sheetText}>{OptionsTags[0]}</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {
                  ChatRoomData?.type == "CIRCLE"
                    ? null
                    : props.navigation.navigate("AddParticipants", {
                        participants: participants,
                      });
                }}
              >
                <View
                  style={[CommonStyle.sheetTab, { marginTop: RFValue(32, 844) }]}
                >
                  <SvgUri
                    svgXmlData={OptionsIcons[1]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
    
                  <Text style={CommonStyle.sheetText}>{OptionsTags[1]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  null;
                }}
              >
                <View
                  style={[CommonStyle.sheetTab, { marginTop: RFValue(32, 844) }]}
                >
                  <SvgUri
                    svgXmlData={OptionsIcons[2]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
    
                  <Text style={CommonStyle.sheetText}>{OptionsTags[2]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  null;
                }}
              >
                <View
                  style={[CommonStyle.sheetTab, { marginTop: RFValue(32, 844) }]}
                >
                  <SvgUri
                    svgXmlData={OptionsIcons[3]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
    
                  <Text style={CommonStyle.sheetText}>{OptionsTags[3]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  null;
                }}
              >
                <View
                  style={[CommonStyle.sheetTab, { marginTop: RFValue(32, 844) }]}
                >
                  <SvgUri
                    svgXmlData={OptionsIcons[4]}
                    width={RFValue(24, 844)}
                    height={RFValue(24, 844)}
                  />
    
                  <Text style={CommonStyle.sheetText}>{OptionsTags[4]}</Text>
                </View>
              </TouchableOpacity> */}
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
    );
  };
  const GetChatData = async () => {
    setchatRoomData(ChatRoomData);
    setsenderId(await AsyncStorage.getItem(STORAGE_KEY.USER_ID));
    setSenderName(await ChatRoomData?.loggedUser?.displayName);
    // Get data for all the chat for given member
    const unsubRef = collection(db, "Message", ChatRoomData.id, "mymsg");

    const querySnapshot = query(unsubRef, orderBy("timestamp", "desc"));
    onSnapshot(querySnapshot, async (snapshot) => {
      // setTimeout(() => {
      //   scrollviewref.scrollTo(0);
      // }, 0.001);
      setchatData(
        snapshot.docs?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          loader: true,
        }))
      );

      //update message and conversation document for update last msg information
      (await AsyncStorage.getItem(STORAGE_KEY.USER_ID)) ? updateReadBy() : "";
    });
  };

  //function for update read by member
  const updateReadBy = async () => {
    const msgRef = collection(db, "Message", ChatRoomData.id, "mymsg");

    const querySnapshot = query(msgRef, orderBy("timestamp", "asc"));

    const GetData = await getDocs(querySnapshot);
    GetData.forEach(async (doc) => {
      if (
        doc
          .data()
          .msgReadBy.includes(
            await AsyncStorage.getItem(STORAGE_KEY.USER_ID)
          ) == false
      ) {
        //update message read by into message collecation.....
        const abc = doc.data().msgReadBy;
        abc.push(await AsyncStorage.getItem(STORAGE_KEY.USER_ID));

        const ref = doc(db, "Message", ChatRoomData.id, "mymsg", doc.id);
        setDoc(ref, {
          msgReadBy: abc,
        });
        //const abcd=['8bca1cf0-3d36-4c29-9833-49c5f9c9aca6']
        //update message read by into conversation collection.....
        //console.log(GetConvoData.docs[0].data().lastMsgInfo, "-----");
        var lastMsgInfo = {
          msg: GetConvoData.docs[0].data().lastMsgInfo.msg,
          //msg: "hello nikhilesh",
          senderId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
          msgReadBy: abc,
          timestamp: serverTimestamp(),
        };
        const ref1 = doc(db, "Conversation", ChatRoomData.id);
        setDoc(ref1, {
          lastMsgInfo: lastMsgInfo,
        });
      }
    });
  };
  // const encrypt = (text) => {
  //   var CryptoJS = require("crypto-js");

  //   var ciphertext = CryptoJS.AES.encrypt(text, cryptoSecret);
  //   console.log("encrypted text", ciphertext.toString());
  //   return ciphertext.toString();
  // };
  // const decrypt = (ciphertext) => {

  //   var CryptoJS = require("crypto-js");
  //   var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), cryptoSecret);
  //   var plaintext = bytes.toString(CryptoES.enc.Utf8);

  //   return plaintext;
  // };
  // Function for send msg and update conversation's last message
  const sendMsg = async (imageurl) => {
    var msgId = uuid.v4();
    const msgType = isDocument
      ? 4
      : imageurl
      ? FileType == "video"
        ? 3
        : 2
      : 1;
    addDoc(
      collection(
        db,

        "Message",
        ChatRoomData.id,
        "mymsg"
      ),
      {
        Id: msgId,
        ConversationId: ChatRoomData.id,
        senderId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
        senderName: await ChatRoomData?.loggedUser?.displayName,
        messageType: msgType,
        fileURL: imageurl ? imageurl : "",
        fileName: docName ? docName : "",
        fileSize: docSize ? docSize : "",
        Text: ForDocImgUpload ? "" : Msg,
        isReplyMessage: reply ? true : false,
        parentMessageId: reply ? replyData.parentMessageId : "",
        timestamp: serverTimestamp(),
        msgReadBy: [],
        DocumentCaption: ForDocImgUpload ? Msg : "",
      }
    );

    var senderInfo = {
      senderId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
      senderName: await ChatRoomData?.loggedUser?.displayName,
      timestamp: serverTimestamp(),
    };

    var lastMsgInfo = {
      msg: ForDocImgUpload
        ? isDocument
          ? "sent document"
          : "sent image"
        : Msg,
      senderId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
      msgReadBy: [await AsyncStorage.getItem(STORAGE_KEY.USER_ID)],
      timestamp: serverTimestamp(),
    };

    //update conversation
    updateDoc(doc(db, "Conversation", ChatRoomData.id), {
      lastMsgInfo: lastMsgInfo,
      senderInfo: senderInfo,
    }).then(() => {
      expoTokens.map((value, index) => {
        let token = decodeToken(value);
        if (ChatRoomData.type == "CIRCLE") {
          PushNotification(
            token,
            `${senderInfo.senderName}`,
            `${lastMsgInfo.msg}`
          );
        } else {
          PushNotification(
            token,
            `${ChatRoomData?.name}`,
            `${senderInfo.senderName}: ${lastMsgInfo.msg}`
          );
        }
      });
    });

    setMsg("");
    setreply(false);
    setreplyData([]);
    setImgDoc("");
    setForDocImgUpload(false);
    setFileType("");
    setisDocument(false);
    setTagSheet(false);
    //bottmosheet.current.close();
    // setTimeout(() => {
    //   scrollviewref?.scrollTo(0);
    // }, 100);
  };

  //function when long press for reply msg
  const ForReply = (item) => {
    var replyData = {
      MsgSenderName: item.data.senderName,
      parentMessageId: item.data.Id,
      ParentMsg: item.data.Text,
      ParentFileUrl: item.data.fileURL,
      MessageType: item.data.messageType,
    };
    setreplyData(replyData);
    setreply(true);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    const uploadfile = result.uri;
    var fileSize = await FileSystem.getInfoAsync(uploadfile);

    if (fileSize.size / 1024 / 1024 > 15) {
      alert("image size should be less than 15 mb.");
    } else {
      setImgDoc(uploadfile);
      setDocSize(fileSize.size);
      setDocName(fileSize.name);
      setForDocImgUpload(true);
      setFileType(result.type);
      setTagSheet(false);
    }
  };

  const pickDocument = async () => {
    let doumentResult = await DocumentPicker.getDocumentAsync({});

    const uploadfile = doumentResult.uri;
    var fileSize = await FileSystem.getInfoAsync(uploadfile);
    //const fileName = handleSplitText(doumentResult.name);

    if (fileSize.size / 1024 / 1024 > 15) {
      alert("Document size should be less than 15 mb.");
    } else {
      setDocName(doumentResult.name);
      // console.log("nameee", docName)
      setDocSize(fileSize.size);
      setImgDoc(uploadfile);
      setForDocImgUpload(true);
      setisDocument(true);
      setFileType("doc");
      setTagSheet(false);
    }
  };

  //upload document into firebase...
  const UploadDocument = async () => {
    console.log("uploading Document");
    var uploadfile = isImgDoc;
    let filename = uploadfile.substring(uploadfile.lastIndexOf("/") + 1);
    console.log(uploadfile);

    var addImages = new Date().getTime();
    console.log("addImages", addImages);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uploadfile, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `userimage/${addImages + filename}`);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(url, "downloadurlmineeeeeeeee");
            setuploadloader(false);
            sendMsg(url);

            console.log("uploading Document2");
          })
          .catch((error) => {
            console.log(error, "errorrr");
          });
      });
    } catch (e) {
      console.log(e, "errorrr");
    }
  };

  //remove member from member id array from conversation collection for exit chat
  const ExitChat = async () => {
    console.log(ChatRoomData.id);
    const convoRef = query(
      collection("ChatImplementation", "Conversation_Message", "Conversation"),
      where("ConversationId", "==", ChatRoomData.id)
    );

    const GetConversation = getDocs(convoRef);
    const Allmembers = GetConversation.docs[0].data().MemberId;
    console.log(Allmembers);
    const idForRemove = Allmembers.findIndex((data, id) => data == senderID);
    Allmembers.splice(idForRemove, 1);
    console.log(Allmembers, "-------");

    updateDoc(
      doc("ChatImplementation", "Conversation_Message", "Conversation"),
      {
        MemberId: Allmembers,
      }
    );

    props.navigation.navigate("ChatRoom");
  };
  const handleSplitText = (text) => {
    console.log("splittext", text);
    if (text?.length > 24) {
      return (
        text.substring(0, 14) +
        "..." +
        text.substring(text?.length - 5, text?.length)
      );
    } else {
      return text;
    }
  };
  const extractFileDetail = async (uri) => {
    var fileDetails = await FileSystem.getInfoAsync(uri);
    console.log("fileDetails", fileDetails);
    return fileDetails ? fileDetails : null;
  };
  const getFileExtention = (fileUrl) => {
    var extension = fileUrl.split(/[#?]/)[0].split(".").pop().trim();
    console.log("extension", extension);
    // To get the file extension
    return extension;
  };
  const downloadFile = async (uri) => {
    // const downloadInstance = FileSystem.createDownloadResumable(
    //   uri,
    //   FileSystem.documentDirectory + "image.jpg"
    // );
    try {
      const result = await FileSystem.downloadAsync(
        //file uri
        uri,
        //path to save
        FileSystem.documentDirectory +
          new Date().toISOString() +
          "." +
          getFileExtention(uri)
      );
      console.log("result", result);
      Sharing.shareAsync(result.uri, {});

      //saveFile(result.uri)
    } catch (err) {
      alert("Download Failed");
    }
  };
  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };
  const renderFile = (uri, name, size) => {
    //var details
    var ext = getFileExtention(uri);
    return (
      <View
        style={{
          width: "90%",
          borderWidth: 0.5,
          borderColor: COLORS.monoBlack500,
          borderRadius: RFValue(8, 844),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: RFValue(64, 844),
          }}
        >
          <View
            style={[
              CommonStyle.fileImage,
              {
                backgroundColor:
                  ext == "docx" || ext == "pdf"
                    ? COLORS.teritiaryWarning
                    : COLORS.teritiaryPurple,
              },
            ]}
          >
            <Image
              source={
                ext == "docx" || ext == "pdf"
                  ? IMAGES.documentLogoChat
                  : IMAGES.imageLogoChat
              }
              style={{
                width: RFValue(32, 844),
                height: RFValue(32, 844),
                resizeMode: "center",
              }}
            />

            {/* <Icon
                color={COLORS.monoBlack500}
                name="image"
                type="feather"
                size={16}
              /> */}
          </View>
          <View style={CommonStyle.fileTextContainer}>
            <Text numberOfLines={1} style={CommonStyle.fileNameText}>
              {name ? handleSplitText(name) : "File_Size_43"}
            </Text>
            <Text style={CommonStyle.fileSizeText}>
              {size ? (size / 1024 / 1024).toFixed(2) : ""} MB
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => downloadFile(uri)}>
          <View
            style={{
              padding: RFValue(12, 844),
              alignSelf: "center",
            }}
          >
            <Icon
              color={COLORS.monoBlack500}
              name="arrow-down"
              type="feather"
              size={16}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const ChatDateConverter = (date) => {
    if (moment().isSame(date, "day")) {
      return STRINGS.TODAY;
    }
    if (moment().diff(date, "days") === -1) {
      return STRINGS.YESTERDAY;
    }
    if (!moment().isSame(date, "year")) {
      return moment(date).format(STRINGS.DATE_FORMAT_WITH_YEAR);
    } else {
      return moment(date).format(STRINGS.DATE_FORMAT);
    }
  };
  const renderItem = ({ item, index }) => {
    //console.log("item chat",item.data)
    var indexData = chatData.findIndex((object) => {
      return object.data.timestamp == item.data.timestamp;
    });
    //console.log("item chat", indexData);
    var currentFieldWithoutFormate =
      item.data.timestamp && moment(item.data.timestamp.toDate());
    var currentField =
      item.data.timestamp &&
      moment(item.data.timestamp.toDate()).format("DD-MM-YYYY");
    var aboveField =
      item.data.timestamp && index < chatData.length - 1
        ? moment(chatData[indexData + 1].data.timestamp.toDate()).format(
            "DD-MM-YYYY"
          )
        : "";

    var imageIndex = memberProfile.findIndex(
      (data, index) => data.id == item.data.senderId
    );

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
      <View>
        <View style={CommonStyle.mainViewForChat}>
          {currentField != aboveField ? (
            <Text
              style={{
                color: "#333333",
                fontSize: RFValue(16, 844),
                fontFamily: "Poppins_500Medium",
                marginBottom: RFValue(8, 844),
                marginTop: RFValue(8, 844),
              }}
            >
              {ChatDateConverter(currentFieldWithoutFormate) === "Invalid date"
                ? ""
                : ChatDateConverter(currentFieldWithoutFormate)}
            </Text>
          ) : undefined}

          <View style={CommonStyle.sepratorView}></View>
          <TouchableOpacity
            onLongPress={() => {
              ForReply(item);
            }}
            activeOpacity={1}
            style={CommonStyle.mainTouchbleStyle}
          >
            <Image
              source={{ uri: memberProfile[imageIndex].profileImageUrl }}
              style={CommonStyle.ProfileImgstyle}
            />
            <View style={CommonStyle.subViewForchatData}>
              <ChatField
                senderName={
                  item.data.senderId == senderID ? "You" : item.data.senderName
                }
                timeData={
                  item.data.timestamp &&
                  moment(item.data.timestamp.toDate()).format("hh:mm a")
                }
              />
              {item.data.messageType == 1 ? (
                pattern.test(item.data.Text) ? (
                  <Hyperlink
                    onPress={(url, text) => Linking.openURL(item.data.Text)}
                    linkStyle={{ color: "#2980b9",textDecorationLine: 'underline' }}

                  >
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
                  </Hyperlink>
                ) : (
                  <Hyperlink
                    onPress={(url, text) => Linking.openURL(url)}
                    linkStyle={{ color: "#2980b9",textDecorationLine: 'underline' }}
                  >
                    <Text style={CommonStyle.msgView}>{item.data.Text}</Text>
                  </Hyperlink>
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
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("ImagePreview", {
                          image: item.data.fileURL,
                        });
                      }}
                    >
                      <View style={{ justifyContent: "center" }}>
                        <Image
                          onLoad={() => {
                            // alert()
                            chatData[index].loader = false;
                            setchatData(chatData);
                          }}
                          style={CommonStyle.chatViewImgVideo}
                          source={{ uri: item.data.fileURL }}
                        />
                      </View>
                    </TouchableOpacity>
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
                    renderFile(
                      item.data.fileURL,
                      item.data.fileName ? item.data.fileName : "",
                      item.data.fileSize ? item.data.fileSize : ""
                    )
                  ) : undefined}
                </View>
              )}

              {/* for reply start */}

              {item.data.isReplyMessage ? (
                <View style={CommonStyle.ReplyMainView}>
                  {/* <View style={CommonStyle.sepratorForReply}></View> */}
                  <View style={{}}>
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
                                data.data.Id == item.data.parentMessageId
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
                          fontSize: RFValue(14, 844),
                          color: COLORS.monoBlack700,
                          fontFamily: "Poppins_400Regular",
                        }}
                        numberOfLines={2}
                      >
                        {
                          chatData[
                            chatData.findIndex(
                              (data, index) =>
                                data.data.Id == item.data.parentMessageId
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
                                data.data.Id == item.data.parentMessageId
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
                                data.data.Id == item.data.parentMessageId
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

              {/* {senderID == item.data.senderId &&
              chatData.length - 1 == index &&
              memberIds.length == item.data.msgReadBy.length ? (
                <View style={CommonStyle.seenView}>
                  <Image
                    source={require("../../assets/images/images/true.png")}
                    style={CommonStyle.seenIcon}
                  />
                  <Text style={CommonStyle.seenTxt}>Seen</Text>
                </View>
              ) : undefined} */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={CommonStyle.container} edges={["bottom"]}>
      {/* Header start */}
      <Header
        projectName={
          ChatRoomData.type == "CIRCLE"
            ? ChatRoomData?.participants[0]?.displayName
            : ChatRoomData?.name
        }
        onPress={() => {
          Analytics.logEvent("screen_view", {
            firebase_screen:
              ChatRoomData?.type == "CIRCLE"
                ? "CircleInfoChat"
                : "ProjectInfoChat",
            userId: profileData?.id,
            displayName: profileData?.displayName,
            isCreator: profileData?.isCreator,
          });
          ChatRoomData?.type == "CIRCLE"
            ? props.navigation.navigate("CircleInfo", {
                contact: ChatRoomData?.participants,
              })
            : props.navigation.navigate("ProjectInfo", {
                data: ChatRoomData,
                images: images,
              });
        }}
        //  imgBackground={conversationImageBackground}
        //memberName={memberName}
        onBackClick={() => {
          //();
          props.navigation.goBack();
        }}
        onMenuClick={() => {
          setsheetData(1);
          setOptionsSheet(true);
        }}
        subText={
          ChatRoomData.type == "CIRCLE"
            ? ChatRoomData?.participants[0].status == "ACTIVE"
              ? "Online"
              : ChatRoomData?.participants[0].status == "BACKGROUND"
              ? "Away"
              : "Offline"
            : memberName
        }
        images={images}
      />
      {/* header end */}
      <View style={Styles.chatToggleWrapper}>
        <TouchableOpacity style={[Styles.chatToggle, Styles.chatActiveToggle]}>
          <View>
            <Text style={[Styles.chatToggleText, Styles.chatActiveToggleText]}>
              Messages
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.chatToggle} onPress={onSwipeLeft}>
          <View>
            <Text style={Styles.chatToggleText}>Moodboard</Text>
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <>
          {chatData && chatData?.length > 0 ? (
            <FlatList
              //style={{}}
              inverted
              data={chatData.slice(0, chatLimit)}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => setChatlimit(chatLimit + 20)}
              onEndReachedThreshold={0.7}
            />
          ) : (
            <View style={CommonStyle.NochatView}>
              <NothingHere text="Say Hi!!👋" image={IMAGES.ChatNotFound} />
            </View>
          )}
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
                      <Text style={CommonStyle.parentMsg}>
                        {replyData.ParentMsg}
                      </Text>
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
                      <View style={{ width: "80%", borderWidth: 2 }}></View>
                    )}
                  </View>
                ) : (
                  <View style={{ width: "83%" }}>
                    {FileType == "doc" ? (
                      renderFile(isImgDoc, docName, docSize)
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
                      <ActivityIndicator
                        size="small"
                        color={COLORS.monoWhite900}
                        animating
                      />
                    ) : undefined}
                    {/* </View> */}
                  </View>
                )}
                <TouchableOpacity
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
            ) : undefined}
            <View style={CommonStyle.bottomSubView}>
              <View style={CommonStyle.bottomotherSubView}>
                <TouchableOpacity
                  onPress={() => {
                    setsheetData(2);
                    setTagSheet(true);
                  }}
                >
                  <Image
                    source={require("../../assets/images/images/plus.png")}
                    style={CommonStyle.plusBtn}
                  />
                </TouchableOpacity>
                <TextInput
                  textAlignVertical="center"
                  value={Msg}
                  onChangeText={(val) => setMsg(val)}
                  placeholder="Type your message here"
                  style={CommonStyle.msgInput}
                  multiline={true}
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
                <View style={CommonStyle.sendBtnImg}>
                  <SvgUri svgXmlData={SVGS.WHITE_SEND} />
                </View>
                {/* <Image
                  source={require("../../assets/images/images/send.png")}
                  style={CommonStyle.sendBtnImg}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </>

        {/* <RBSheet ref={bottmosheet} openDuration={250}>
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
                      onPress={() => {}}
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
          </RBSheet> */}
        {renderTagSheet()}
        {renderOptionsSheet()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { circle } = state;
  return { circle };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCircleApi: (requestParam, tokenDetail) => {
      dispatch({
        type: circleTypes.GET_CIRCLE_DATA,
        requestParam,
        tokenDetail,
      });
    },
    resetMemberReducer: () => {
      dispatch({ type: projectActionTypes?.RESET_ACCEPT_PROJECT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
