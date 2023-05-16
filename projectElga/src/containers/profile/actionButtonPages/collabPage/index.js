import React, {
  Component,
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import FormData from "form-data";
import { connect, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import InputBox from "../../../../components/multicellular/profile/actionButtonInput";
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import SvgUri from "expo-svg-uri";

import Styles from "./Style";
import SVGS from "../../../../constants/SvgUri";

import SelectTag from "../../../../components/multicellular/profile/selectTag";

import ProjectModal from "../../../../components/multicellular/profile/modal/projectTypeModal";
import MODALSPR from "../../../../assets/jsons/profile/projectModal";

import { createCollab } from "../../../../reducers/actionButton/collab";
import * as FileSystem from "expo-file-system";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import PushNotification from "../../../../components/multicellular/notification";
import decodeToken from "../../../../utils/decodeToken";
import SnackBar from "../../../../components/unicellular/snackbar";
import { profileTypes } from "../../../../reducers/profile/profile";
import * as Analytics from "expo-firebase-analytics";

const CollabPage = (props) => {
  const tags = ["Paid", "Barter", "Split", "Network"];
  const [showModal, setShowModal] = useState(false);
  const [activeTag, setActiveTag] = useState("");
  const [oppModal, setOppModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setbudget] = useState("");
  const [description, setdescription] = useState("");
  const [recieverShare, setRecieverShare] = useState("");
  const [barterDetail, setBarterDetail] = useState("");
  const collab = useSelector((state) => state.collab);
  const { isSuccessfull, loading, participants = [] } = collab;
  const [image, setImage] = useState("");
  const [imageSize, setImageSize] = useState("");
  const profile = useSelector((state) => state.profile);
  const [showSnack, setShowSnack] = useState(false);
  const [tagError, setTagError] = useState(false);
  const { profileData } = profile;
  useEffect(() => {
    effect();
    if (isSuccessfull) {
      const {
        profile: { profileData = {}, gtProfileloading },
      } = props;
      const recieverUserArr = participants?.length > 0 ? participants : [];
      const expoToken = recieverUserArr.map(({ expoToken }) => expoToken);
      console.log("expoToken>>", expoToken);
      expoToken?.map((item) => {
        item?.map((key) => {
          const token = decodeToken(key);
          PushNotification(
            token,
            "Project Request",
            `${profileData?.displayName} wants to initiate project '${title}'.`
          );
        });
      });
      // props.navigation.navigate("SuccessPage", {
      //   image: IMAGES.requestSent,
      //   message: "✨ Great! Collab Request Sent ✨ ",
      //   navScreen: "Projects",
      //   title: title,
      //   budget: budget,
      //   description: description,
      //   recieverName: profileData?.displayName,
      // });

      props.navigation.navigate("Projects");
    }
  }, [isSuccessfull]);
  const effect = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    props.callProfileApi(userId, tokenDetail, userId);
  };

  const renderFile = () => {
    const fileSize =
      imageSize > 1024 ? imageSize / 1024 + "MB" : imageSize + "KB";
    return (
      <View style={Styles.fileCard}>
        <Image
          source={{ uri: image }}
          style={[
            Styles.fileImage,
            {
              borderTopLeftRadius: RFValue(16, 844),
              borderBottomLeftRadius: RFValue(16, 844),
            },
          ]}
        />
        <View style={Styles.fileTextContainer}>
          <Text style={Styles.fileNameText}>File_name_47.jpg</Text>
          <Text style={Styles.fileSizeText}>{fileSize}</Text>
        </View>
        <View style={{ padding: RFValue(12, 844) }}>
          <Icon
            color={COLORS.monoBlack500}
            name="arrow-down"
            type="feather"
            size={16}
          />
        </View>
      </View>
    );
  };
  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        selectImage();
      }
    }
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.cancelled) {
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        setImage(result.uri);
        setImageSize(fileInfo.size);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const handleSubmitForm = async () => {
    Analytics.logEvent("Collaborate_send", {
      contentType: "colab",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    if (title == "" || activeTag == "") {
      if (title == "") {
        setShowSnack(true);
        setInterval(() => {
          setShowSnack(false);
        }, 5000);
      }
      if (activeTag == "") {
        setTagError(true);
      }
    } else {
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

      const recieverUserArr = participants;
      const recieverParticipants = recieverUserArr?.map(({ id, inCircle }) => ({
        id,
        inCircle,
      }));
      const details =
        activeTag == "Split"
          ? recieverShare
          : activeTag == "Barter"
          ? barterDetail
          : activeTag == "Paid"
          ? budget
          : null;

      const requestParam = {
        type: "COLLABORATION",
        id: userId,
        saveAsDraft: false,
      };

      const xyz = {
        subject: title,
        description: description,
        participants: recieverParticipants,
        priceDetails: {
          entityType: activeTag.toUpperCase(),
          details: details,
        },
      };

      let formData = new FormData();
      formData.append("project", JSON.stringify(xyz));

      props.callCreateCollabApi(userId, requestParam, tokenDetail, formData);
    }
  };

  const renderRequestTo = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: RFValue(16, 844),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {name != "" ? (
            <Image
              source={{
                uri:
                  name != ""
                    ? "https://images.unsplash.com/photo-1624610802166-391c117daf75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    : null,
              }}
              style={{
                width: RFValue(48, 844),
                height: RFValue(48, 844),
                borderRadius: RFValue(24, 844),
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddParticipants");
              }}
            >
              <View
                style={{
                  width: RFValue(48, 844),
                  height: RFValue(48, 844),
                  borderRadius: RFValue(24, 844),
                  backgroundColor: COLORS.monoGhost500,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.USER_PLUS}
                  width={RFValue(20, 844)}
                  height={RFValue(20, 844)}
                />
              </View>
            </TouchableOpacity>
          )}

          {name != "" ? (
            <View
              style={{
                justifyContent: "space-between",
                marginLeft: RFValue(12, 844),
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                  color: COLORS.monoBlack700,
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: RFValue(12, 844),
                  color: COLORS.monoChatGray,
                }}
              >
                Manager: NA
              </Text>
            </View>
          ) : participants?.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddParticipants");
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                {participants?.map((item, index) => {
                  if (index < 3) {
                    return (
                      <View
                        style={{
                          width: RFValue(48, 844),
                          height: RFValue(48, 844),
                          borderRadius: RFValue(24, 844),
                          borderWidth: 2,
                          borderColor: COLORS.monoGhost500,
                          marginLeft: index > 0 ? RFValue(-8, 844) : 0,
                        }}
                      >
                        <Image
                          source={{ uri: item?.profileImageUrl }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: RFValue(24, 844),
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.source = IMAGES.UserProfile;
                          }}
                        />
                      </View>
                    );
                  }
                })}
                {participants?.length > 3 ? (
                  
                    
                    <View style={Styles.participantsContainer}>
                      <Text style={Styles.participantsNumber}>
                        +{participants?.length - 3}
                      </Text>
                    </View>
                ) : null}
              </View>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: RFValue(16, 844),
                color: COLORS.monoBlack700,
                marginLeft: 8,
              }}
            >
              Request To
            </Text>
          )}
        </View>
        <TouchableOpacity>
          <SelectTag
            tags={["Paid", "Barter", "Split", "Network"]}
            title="Select Tag"
            activeTag={activeTag}
            onPress={(tag) => {
              setActiveTag(tag);
              setTagError(false);
            }}
            onPressInfo={() => {
              setOppModal(true);
            }}
            backgroundColor={
              tagError ? COLORS.teritiaryWarning : COLORS.monoBlack700
            }
            textColor={tagError ? COLORS.teritiaryWarning : COLORS.monoBlack700}
          />
          <ProjectModal
            visible={oppModal}
            onPress={() => {
              setOppModal(false);
            }}
            data={MODALSPR}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubject = () => {
    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        <InputBox
          width={"90%"}
          multiline={false}
          text="Title"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
      </View>
    );
  };
  // renderProjectType = () => {
  //   return (
  //     <View style={{ marginTop: RFValue(16, 844) }}>
  //       <View style={Styles.textContainer}>
  //         <Text style={Styles.componentText}>Type</Text>
  //         <Image
  //           source={IMAGES.Info}
  //           style={{ width: RFValue(24, 844), height: RFValue(24, 844) }}
  //         />
  //       </View>
  //       <View style={Styles.textIconContainer}>
  //         <ScrollView
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           overScrollMode="never"
  //         >
  //           {this.state.projectTypes.map((item, index) => {
  //             return (
  //               <TouchableOpacity
  //                 onPress={() => {
  //                   this.setState({
  //                     selectedType: item,
  //                   });
  //                 }}
  //               >
  //                 <View
  //                   style={[
  //                     Styles.projectTypeCard,
  //                     {
  //                       backgroundColor:
  //                         this.state.selectedType == item
  //                           ? COLORS.primaryTeal500
  //                           : COLORS.monoGhost500,
  //                     },
  //                   ]}
  //                 >
  //                   <Text
  //                     style={[
  //                       Styles.projectTypeCardText,
  //                       {
  //                         color:
  //                           this.state.selectedType == item
  //                             ? COLORS.monoWhite900
  //                             : COLORS.primaryTeal500,
  //                       },
  //                     ]}
  //                   >
  //                     {item}
  //                   </Text>
  //                 </View>
  //               </TouchableOpacity>
  //             );
  //           })}
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // };

  const renderBarterDetails = () => {
    return (
      <InputBox
        text="Barter Detail"
        onChangeText={(text) => {
          setBarterDetail(text);
        }}
      />
    );
  };
  const renderRecieverShare = () => {
    return (
      <InputBox
        multiline={false}
        width="70%"
        text="Reciever share (%)"
        onChangeText={(text) => {
          setRecieverShare(text);
        }}
        rightComponent={() => {
          return (
            <Image
              source={IMAGES.Info}
              style={{
                width: RFValue(20, 844),
                height: RFValue(20, 844),
                borderWidth: 2,
              }}
            />
          );
        }}
      />
    );
  };
  const pricingModal = () => {
    return (
      <Modal visible={priceModal} transparent={true}>
        <TouchableOpacity
          onPress={() => {
            setPriceModal(false);
          }}
        >
          <View style={Styles.modalWrapper}>
            <View style={Styles.modalCard}>
              <View style={Styles.modalHeader}>
                <Text style={Styles.modalPricingText}>Pricing</Text>
                <TouchableOpacity
                  onPress={() => {
                    setPriceModal(false);
                  }}
                >
                  <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
                </TouchableOpacity>
              </View>

              <View style={Styles.modalColumnWrapper}>
                <View style={Styles.modalColumn1Wrapper}>
                  <Text style={Styles.modalColumnValues}>Project Type</Text>
                  <View style={Styles.divider}></View>
                  <Text style={Styles.modalColumnValues}>Vocals</Text>
                  <Text style={Styles.modalColumnValues}>Photography</Text>
                </View>

                <View style={Styles.modalColumn2Wrapper}>
                  <Text style={Styles.modalColumnValues}>Pricing(INR)</Text>
                  <View style={Styles.divider}></View>
                  <Text style={Styles.modalColumnValues}>5000</Text>
                  <Text style={Styles.modalColumnValues}>16000</Text>
                </View>

                <View style={Styles.modalColumn3Wrapper}>
                  <Text style={Styles.modalColumnValues}>Basis</Text>
                  <View style={Styles.divider}></View>
                  <Text style={Styles.modalColumnValues}>Hourly</Text>
                  <Text style={Styles.modalColumnValues}>Hourly</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  const renderProjectBudget = () => {
    return (
      <InputBox
        onChangeText={(text) => {
          setbudget(text);
        }}
        multiline={false}
        width="70%"
        text="Budget"
        rightComponent={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                setPriceModal(true);
              }}
            >
              <View style={Styles.rupeesContainer}>
                <Text style={Styles.rupeesText}>₹₹₹</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderProjectDescription = () => {
    return (
      <View style={{ height: "100%" }}>
        <InputBox
          multiline={true}
          width={"100%"}
          height={"100%"}
          placeholder="Description"
          noDivider={true}
          onChangeText={(text) => {
            setdescription(text);
          }}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      accessible={false}
      activeOpacity={1}
    >
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              paddingRight: RFValue(8, 844),
              paddingLeft: RFValue(16, 844),
              paddingTop: RFValue(48, 844),
            }}
          >
            <ProfileHeader
              text="Project Details"
              showBackIcon={true}
              fontSize={RFValue(24, 844)}
              onBackPress={() => {
                props.navigation.goBack(null);
              }}
              rightComponent={() => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmitForm();
                    }}
                  >
                    <View style={Styles.saveButton}>
                      <Text style={Styles.saveText}>Send</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 16,
                zIndex: 2,

                width: "100%",
              }}
            ></View>
          </View>
          {renderRequestTo()}
          {renderSubject()}

          {activeTag == "Split"
            ? renderRecieverShare()
            : activeTag == "Barter"
            ? renderBarterDetails()
            : activeTag == "Paid"
            ? renderProjectBudget()
            : null}
          {renderProjectDescription()}
        </View>
        {/* {image != "" && (
            <View
              style={{
                borderWidth:2,
                paddingLeft: RFValue(16, 844),
                width: "100%",
                paddingBottom: RFValue(-20, 844),
                alignSelf: "flex-end",
                height: RFValue(92, 844),
                flexDirection: "row",
                marginLeft: RFValue(16, 844),
              }}
            >
              {renderFile()}
            </View>
          )} */}
      </View>
      {/* <View style={{ height: "10%" }}>
          <ActionButtonFooter
            onPressImage={() => {
              getPermissionAsync();
            }}
          />
        </View> */}

      {loading && <ActivityIndicator size="large" />}
      {showSnack ? (
        <SnackBar
          visible={showSnack}
          text="Project Title is required"
          onDismiss={() => {
            setShowSnack(false);
          }}
        />
      ) : null}
      {pricingModal()}
    </TouchableOpacity>
  );
};
const mapStateToProps = (state) => {
  const { collab, profile } = state;
  return { collab, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callProfileApi: (userId, tokenDetail, entityId) => {
      dispatch({
        type: profileTypes.GET_PROFILE_DATA,
        userId,
        tokenDetail,
        entityId,
      });
    },
    callCreateCollabApi: (userId, requestParam, tokenDetail, formData) => {
      dispatch({
        type: createCollab.ADD_COLLAB,
        userId,
        requestParam,
        tokenDetail,
        formData,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollabPage);
