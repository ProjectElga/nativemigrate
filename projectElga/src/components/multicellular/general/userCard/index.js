import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import Styles from "./Styles";
import IMAGES from "../../../../themes/Images";
import profile from "../../../../assets/jsons/profile/profiledetails";
import FollowerInfo from "../../../unicellular/profile/followerInfo";
import SaveIcon from "../saveIcon";
import STRINGS from "../../../../constants/Strings";
import COLORS from "../../../../themes/colors";
import shadow from "../../../../constants/shadow";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";
import FollowerInfoBar from "../../profile/followerInfoBar/followerInfoBar";
import ConvertDistance from "../../../../utils/ConvertDistance";
import { nFormatter } from "../../../../utils/SocialNumberFormat";

export default function UserCard(props) {
  const { totalIndicators, currentPosition } = props;
  const [state, setstate] = useState(false);
  const { userData, isAdmin, dontShowBrand } = props;
  const [showModal, setShowModal] = useState(false);
  const [tag, setTage] = useState(["elga", "elgaroma", "elgaroma", "elgaroma"]);
  const {
    socialInsights: { instagramInsight = {}, youtubeInsight = {} } = {},
  } = userData;
  const handleSplitText = (text, limit) => {
    if (text?.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };
  const renderBio = () => {
    console.log("userData>>", userData);
    return (
      <View
        style={{
          paddingTop: RFValue(2, 844),
          width: "100%",
          alignSelf: "center",
        }}
      >
        {userData?.bio ? (
          <Text style={[Styles.bioText, { marginLeft: 0, flexShrink: 0 }]}>
            {handleSplitText(userData?.bio, 44)}
          </Text>
        ) : null}

        {/* <Text style={Styles.bioCategory}>#ContentCreator</Text> */}
        {/* {(userData?.tag && userData?.tag.length > 0 && (
          <View style={{ width: "50%" }}>
            <Text numberOfLines={2}>
              {userData?.tag && userData?.tag.length > 0 && userData?.tag?.map((value, index) => {
                return <Text style={Styles.tag}>#{value.tag} </Text>;
              })}
            </Text>
          </View>
        )) || <View style={{ width: "50%" }} />} */}
      </View>
    );
  };
  const renderWithdrawModal = () => {
    return (
      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: RFValue(248, 844),
                height: RFValue(64, 844),
                backgroundColor: COLORS.monoWhite900,
                borderRadius: RFValue(16, 844),
                alignItems: "center",

                paddingHorizontal: RFValue(20, 844),
              }}
            >
              <Image source={IMAGES.wa} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  const crossCheckButtons = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            props.onPressCross ? props.onPressCross() : null;
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.monoGhost500,
              height: RFValue(40, 844),
              width: RFValue(40, 844),
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="plus"
              type="feather"
              color={COLORS.monoBlack500}
              style={{
                transform: [{ rotate: "45deg" }],
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.onPressCheck ? props.onPressCheck() : null;
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primaryTeal500,
              height: RFValue(40, 844),
              width: RFValue(56, 844),
              borderRadius: RFValue(20, 844),
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
            }}
          >
            <Icon name="check" type="feather" color={COLORS.monoWhite900} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback
      onLongPress={() => {
        props.onLongPress ? props.onLongPress() : null;
      }}
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}
    >
      <View style={[shadow, Styles.card]}>
        <ImageBackground
          source={{ uri: userData?.coverImageUrl }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 16 / 5,
          }}
          imageStyle={{
            borderTopLeftRadius: RFValue(16, 844),
            borderTopRightRadius: RFValue(16, 844),
            backgroundColor: "#DAE2F8"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={props.onPressSaved}>
              <View
                style={{
                  zIndex: 2,
                  marginTop: RFValue(12, 844),
                  marginRight: RFValue(24, 844),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: RFValue(34, 844),
                  height: RFValue(34, 844),
                  backgroundColor: COLORS.monoWhite900,
                  borderRadius: RFValue(20, 844),
                }}
              >
                <SaveIcon isSaved={props.isSaved} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
        {/* <View
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            alignSelf: "flex-end",
          }}
        >
          <SaveIcon isSaved={props.isSavedPage ? true : userData?.isSaved} />
        </View> */}
        <View
          style={{
            paddingHorizontal: RFValue(24, 844),
            borderTopColor: COLORS.monoGhost500,
            borderTopWidth: 1,
          }}
        >
          {isAdmin ? (
            dontShowBrand ? null : (
              <View
                style={{
                  paddingRight: RFValue(20, 844),
                  position: "absolute",
                  alignSelf: "flex-end",
                  marginTop: RFValue(16, 844),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={IMAGES.companyActive}
                  style={{
                    width: RFValue(20, 844),
                    height: RFValue(20, 844),
                    marginRight: 4,
                  }}
                />
                <Text style={Styles.brandInfo}>
                  {handleSplitText(userData?.userAgency?.name, 20)}
                </Text>
                {/* <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(14, 844),
                    color: COLORS.monoBlack500,
                    marginTop: Platform.OS == "ios" ? 0 : -4,
                  }}
                >
                  {userData?.userAgency?.designation}
                </Text> */}

                {props.circle && crossCheckButtons()}
              </View>
            )
          ) : (
            <View
              style={{
                paddingRight: RFValue(24, 844),
                position: "absolute",
                alignSelf: "flex-end",
                marginTop: RFValue(20, 844),
                flexDirection: "row",
              }}
            >
              <Image
                source={IMAGES.InstagramColored}
                style={{
                  width: RFValue(24, 844),
                  height: RFValue(24, 844),
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                  color: COLORS.monoBlack700,
                  marginLeft: 8,
                }}
              >
                {instagramInsight?.followersCount
                  ? nFormatter(instagramInsight?.followersCount)
                  : "N.A"}
              </Text>
              <Image
                source={IMAGES.YoutubeRed}
                style={{
                  marginLeft: RFValue(16, 844),
                  width: RFValue(24, 844),
                  height: RFValue(24, 844),
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                  color: COLORS.monoBlack700,
                  marginLeft: 8,
                }}
              >
                {youtubeInsight?.subscriberCount
                  ? nFormatter(youtubeInsight?.subscriberCount)
                  : "N.A"}
              </Text>
            </View>
          )}

          <View style={Styles.profilePicture}>
            <Image
              source={
                userData.profileImageUrl
                  ? { uri: userData.profileImageUrl }
                  : props.image
                  ? { uri: props.image }
                  : IMAGES.Crewmate_7
              }
              style={Styles.profileImage}
            />
          </View>
          <Text style={Styles.profileNameText}>
            {userData?.displayName || userData?.name} .{" "}
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: RFValue(14, 844),
                color: COLORS.monoBlack700,
              }}
            >
              {ConvertDistance(userData?.distance || 0)}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 2,
            }}
          >
            {userData?.subCategoryNames &&
              userData?.subCategoryNames.length > 0 &&
              userData.subCategoryNames.map((key, index) => {
                return (
                  <View>
                    {index < 2 ? (
                      <Text
                        style={[
                          Styles.subCategory,
                          {
                            fontFamily: "Poppins_400Regular",
                            color: COLORS.monoBlack500,
                          },
                        ]}
                      >
                        {key.name}
                        {index === userData.subCategoryNames.length - 2
                          ? ", "
                          : " "}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            {userData?.subCategoryNames?.length > 2 ? (
              <Text
                style={[Styles.subCategory, { color: COLORS.primaryTeal400 }]}
              >
                +{userData.subCategoryNames.length - 2}
              </Text>
            ) : null}
          </View>
          {renderBio()}
        </View>
        {props.hideActionBtn ? null : (
          <View style={Styles.picDetailWrapper}>
            <View style={Styles.userDetailView}>
              <View style={Styles.followerDetailContainer}>
                <View
                  style={{
                    marginTop: RFValue(12, 844),
                    paddingTop: RFValue(12, 844),
                    alignSelf: "flex-end",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopWidth: 1,
                    borderTopColor: COLORS.monoGhost500,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      props.onCirclePress ? props.onCirclePress() : null;
                    }}
                  >
                    <View
                      style={{
                        width: RFValue(200, 844),
                        paddingHorizontal: RFValue(20, 844),
                        paddingVertical: RFValue(2, 844),
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 1,
                      }}
                    >
                      <Image
                        source={
                          props?.circletext === "Request Sent"
                            ? IMAGES.RequestSentRed
                            : props?.circletext === "Message"
                            ? IMAGES.MessageGreen
                            : props?.circletext === "Accept Request"
                            ? IMAGES.RequestSentIcon
                            : IMAGES.sendRequest
                        }
                        style={Styles.svgIcon}
                        resizeMode="contain"
                      />

                      <Text
                        style={{
                          color:
                            props?.circletext === "Request Sent"
                              ? COLORS.teritiaryWarning
                              : props?.circletext === "Message"
                              ? COLORS.primaryTeal400
                              : props?.circletext === "Accept Request"
                              ? COLORS.primaryTeal400
                              : COLORS.monoBlack700,
                          fontSize: RFValue(16, 844),
                          fontFamily: "Poppins_500Medium",
                          lineHeight: RFValue(22, 844),
                        }}
                      >
                        {props.circletext}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {props.circle && crossCheckButtons()}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
