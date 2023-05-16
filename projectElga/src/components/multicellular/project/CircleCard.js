import SvgUri from "expo-svg-uri";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import SVGS from "../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
import shadow from "../../../constants/shadow";
import IMAGES from "../../../themes/Images";
import { Icon } from "react-native-elements";
export default function CircleCard(props) {
  const { userData, isAdmin } = props;
  const [modal, setModal] = useState(false);
  const crossCheckButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {props.inCircle ? (
          <TouchableOpacity onPress={props.onPressMessage}>
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
              <SvgUri
                svgXmlData={SVGS.MESSAGE_ICON_BLACK}
                width={RFValue(18, 844)}
                height={RFValue(18, 844)}
              />
            </View>
          </TouchableOpacity>
        ) : null}
        {props.cross ? (
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
        ) : null}
        {props.pending ? (
          <TouchableOpacity
            onPress={() => {
              props.onPressCheck ? props.onPressCheck() : null;
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.monoBlack900,
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
        ) : null}
      </View>
    );
  };
  const uncircleModal = () => {
    return (
      <Modal visible={modal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setModal(false);
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
            <TouchableWithoutFeedback
              onPress={() => {
                props.uncirclePress ? props.uncirclePress() : null;
              }}
            >
              <View
                style={{
                  width: RFValue(248, 844),
                  height: RFValue(64, 844),
                  backgroundColor: COLORS.monoWhite900,
                  borderRadius: RFValue(16, 844),
                  alignItems: "center",
                  flexDirection: "row",
                  paddingHorizontal: RFValue(20, 844),
                }}
              >
                <SvgUri
                  svgXmlData={SVGS.RED_DUSTBIN}
                  width={RFValue(24, 844)}
                  height={RFValue(24, 844)}
                />
                <Text
                  style={{
                    marginLeft: RFValue(12, 844),
                    color: COLORS.teritiaryWarning,
                    fontSize: RFValue(14, 844),
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Uncircle
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}
      onLongPress={() => {
        setModal(true);
      }}
    >
      <View
        style={{
          width: "100%",

          height: RFValue(88, 844),
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: RFValue(16, 844),
          justifyContent: "space-between",
          // borderBottomColor: COLORS.monoGhost500,
          // borderBottomWidth: 1.5,
          backgroundColor: COLORS.monoWhite900,
        }}
      >
        {props.showUncircle ? uncircleModal() : null}
        <View style={{ flexDirection: "row", width: "75%" }}>
          <View style={styles.profilePicture}>
            <Image
              style={styles.profileImage}
              source={
                userData.profileImageUrl
                  ? { uri: userData.profileImageUrl }
                  : props.image
                  ? { uri: props.image }
                  : IMAGES.Crewmate_7
              }
            />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              marginLeft: RFValue(12, 844),
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(16, 844),
                color: COLORS.monoBlack900,
              }}
            >
              {userData?.displayName || userData?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {userData?.subCategoryNames &&
                userData?.subCategoryNames.length > 0 &&
                userData.subCategoryNames.map((key, index) => {
                  return (
                    <View>
                      {index < 1 ? (
                        <Text
                          style={{
                            fontFamily: "Poppins_400Regular",
                            fontSize: RFValue(14, 844),
                            color: COLORS.monoBlack500,
                          }}
                        >
                          {index == 0 ? "" : ", "}
                          {key.name}
                        </Text>
                      ) : null}
                    </View>
                  );
                })}
            </View>
            <View style={{ width: "95%" }}>
              <Text
                style={{
                  fontSize: RFValue(14, 844),
                  color: COLORS.monoBlack700,
                  fontFamily: "Poppins_400Regular",
                }}
                numberOfLines={1}
              >
                {userData?.bio ? userData?.bio : "hi there"}
              </Text>
            </View>
          </View>
        </View>
        {crossCheckButtons()}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  arcivedCardWrapper: {
    paddingVertical: RFValue(20, 844),
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginBottom: RFValue(16, 844),
  },
  innerView: {
    marginLeft: RFValue(24, 844),
    justifyContent: "space-evenly",
    width: "82%",
  },

  innerViewForSent: {
    marginLeft: RFValue(24, 844),
    justifyContent: "space-evenly",
    width: "62%",
  },
  profilePictureView: {
    width: "18%",
    alignItems: "center",
    justifyContent: "center",
  },

  profilePicture: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(50, 844),
    borderWidth: 1.5,
    borderColor: COLORS.monoGhost500,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
  },
  projectTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
  },
  date: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack700,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(8, 844),
    flexDirection: "row",
  },
  category1: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.primaryTeal400,
    height: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  category1Text: {
    color: COLORS.monoWhite900,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
  category2: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(16, 844),
  },
  category2Text: {
    color: COLORS.primaryTeal500,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
  description: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack500,
  },
  closebuttonView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
});
