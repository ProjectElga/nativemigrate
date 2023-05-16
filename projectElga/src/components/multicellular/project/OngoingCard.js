import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SVGS from "../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import { RFValue } from "react-native-responsive-fontsize";
import moment from "moment-timezone";
import momentjs from "moment";
import COLORS from "../../../themes/colors";

export default function OnGoingCard(props) {
  //const [title, setTitle] = useState("");
  const handleDate = (dt) => {
    const date = moment(props.date).tz("Asia/kolkata").format();
    return momentjs(date).fromNow();
  };
  const handleSplitText = (text) => {
    if (text?.length > 12) {
      return text.substring(0, 12) + "...";
    } else {
      return text;
    }
  };

  const images = props.images;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.outerView}>
        <View style={styles.arcivedCardWrapper}>
          <View style={styles.profilePictureView}>
            <View>
              <View
                style={{
                  // borderWidth:2,
                  width: RFValue(48, 844),
                  height: RFValue(48, 844),
                  // flexDirection: "row",
                  justifyContent: "flex-start",
                  //borderColor: COLORS.monoGhost500,
                  //borderRadius: RFValue(32, 844),
                }}
              >
                <View
                  style={{
                    width: RFValue(40, 844),
                    height: RFValue(40, 844),
                    borderWidth: 1,
                    borderColor: COLORS.monoGhost500,
                    borderRadius: RFValue(30, 844),

                    alignSelf: "flex-start",
                  }}
                >
                  <Image
                    source={{
                      uri: images[0]
                        ? images[0]
                        : "https://images.unsplash.com/photo-1495100793874-7f94aecae1fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                    }}
                    style={styles.profileImage}
                  />
                </View>
                {images.length > 1 && (
                  <View
                    style={{
                      position: "absolute",
                      marginBottom: -8,
                      marginLeft: -4,
                      alignSelf: "flex-end",
                      bottom: 8,
                      width: RFValue(28, 844),
                      height: RFValue(28, 844),
                      borderWidth: 1.5,
                      borderColor: COLORS.monoGhost500,
                      borderRadius: RFValue(32, 844),
                      justifyContent: "center",
                    }}
                  >
                    {images.length > 2 && (
                      <View
                        style={{
                          opacity: 1,
                          position: "absolute",
                          zIndex: 3,
                          alignSelf: "center",
                          top: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.monoWhite900,
                            alignSelf: "center",
                            fontSize: RFValue(9, 844),
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          {(images.length - 1 > 99)
                            ? "99+"
                            : `+${images.length - 1}`}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        backgroundColor: images.length > 2 ? "#000000" : null,
                        opacity: 1,
                        zIndex: 2,
                        borderRadius: RFValue(28, 844),
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "black",
                          borderWidth: 2,
                          opacity: images.length > 2 ? 0.5 : 0,
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          zIndex: 1,
                          borderRadius: RFValue(28, 844),
                        }}
                      ></View>
                      <Image
                        source={{ uri: images[1] }}
                        style={styles.profileImage}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.innerView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    styles.projectTitle,
                    {
                      color: props.read
                        ? COLORS.monoBlack500
                        : COLORS.monoBlack900,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {props.title}
                </Text>
              </View>
              {props.date ? (
                <Text
                  style={[
                    styles.description,
                    {
                      fontFamily: "Poppins_400Regular",
                      fontSize: RFValue(12, 944),
                      color: COLORS.monoBlack500,
                      // marginBottom: 2,

                      //marginRight: 4,
                    },
                  ]}
                >
                  {props.date}
                </Text>
              ) : null}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={[
                  styles.categoryContainer,
                  {
                    marginLeft: props.showProfileName ? 8 : null,
                  },
                ]}
              >
                {props.profileName ? (
                  <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>
                      {handleSplitText(props.profileName)}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.category2}>
                  <Text style={styles.category2Text}>{props.mainCategory}</Text>
                </View>
                {props.subCategory ? (
                  <View style={styles.category1}>
                    <Text style={styles.category1Text}>
                      {props.subCategory}
                    </Text>
                  </View>
                ) : null}
              </View>
              {props.read ? null : (
                <View style={styles.chatNumber}>
                  {/* <Text
              style={{
                alignSelf: "center",
                color: COLORS.monoWhite900,
                fontSize: RFValue(12, 844),
              }}
            >
              {props.chatNum}
            </Text> */}
                </View>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.description,
                  {
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(14, 944),
                    color: props.read
                      ? COLORS.monoBlack500
                      : COLORS.monoBlack700,

                    marginTop: 4,
                    // marginRight:
                  },
                ]}
                numberOfLines={1}
              >
                {props.subtitleText}
              </Text>
              {/*<Text
                style={[styles.description, { color: COLORS.primaryTeal400 }]}
              >
                {props.plusNum}
              </Text> */}
            </View>
          </View>
          {/* <View
            style={[
              styles.chatDetailWindow,
              { justifyContent: props.date ? "flex-start" : "center" },
            ]}
          >
            {/* ) : null} */}

          {/*props.showFileIcon ? (
              <SvgUri
                svgXmlData={SVGS.FILE}
                width={RFValue(24, 844)}
                height={RFValue(24, 844)}
                style={{ marginTop: RFValue(16, 844) }}
              />
            ) : null}
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arcivedCardWrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(6, 844),
    flexDirection: "row",
    //marginBottom: 1,
    width: "100%",
  },
  innerView: {
    marginLeft: RFValue(16, 844),
    justifyContent: "flex-start",
    width: "88%",
  },
  outerView: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: RFValue(16, 844),
    paddingLeft: RFValue(8, 844),
    // borderBottomColor: COLORS.monoGhost500,
    // borderBottomWidth: 1.5,
    backgroundColor: COLORS.monoWhite900,
    width: Dimensions.get("window").width,
  },
  profileNameContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  profilePictureView: {
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  chatDetailWindow: {
    width: "18%",
    alignItems: "center",
  },
  profilePicture: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderWidth: 1.5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderColor: COLORS.monoGhost500,
    borderRadius: RFValue(32, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(28, 844),
    justifyContent: "center",
    alignItems: "center",
  },
  projectTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
  },
  date: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack700,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  category1: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoBlack500,
    height: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  category1Text: {
    color: COLORS.monoWhite900,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_400Regular",
    marginHorizontal: RFValue(8, 844),
    // marginTop: 1,
  },
  category2: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    height: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: 4,
    borderWidth: 0.5,
    borderColor: "#EEEEEE",
  },
  category2Text: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_400Regular",
    marginHorizontal: RFValue(8, 844),
    //marginTop: 1,
  },
  description: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 944),
    marginTop: 2,
    color: COLORS.monoBlack500,
  },
  chatNumber: {
    width: RFValue(8, 844),
    height: RFValue(8, 844),
    borderRadius: 12,
    backgroundColor: COLORS.primaryTeal400,
    alignItems: "center",
    justifyContent: "center",
    marginRight: RFValue(24, 844),
  },
  smallImage: {
    width: RFValue(12, 844),
    height: RFValue(12, 844),
    borderRadius: RFValue(6, 844),
  },
  profileName: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    alignSelf: "center",
    marginRight: 4,
  },
});
