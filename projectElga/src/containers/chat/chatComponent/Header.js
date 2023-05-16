import SvgUri from "expo-svg-uri";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
const Header = ({
  projectName,
  memberName,
  onBackClick,
  onMenuClick,
  images,
  imgBackground,
  subText,
  onPress,
}) => {
  const handleMemberName = (memberName) => {
    var text = "";

    for (var i = 0; i < 2; i++) {
      var temp = i != 0 ? ", " + memberName[i] : memberName[i];
      text = text + temp;
    }

    return text;
  };
  return (
    // <ImageBackground
    //   source={{ uri: imgBackground }}
    //   resizeMode="cover"
    //   style={{
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     paddingHorizontal: RFPercentage(2),
    //     //backgroundColor: COLORS.primaryTeal500,
    //     height: RFValue(102, 844),
    //     paddingTop: RFValue(36,844),
    //   }}
    // >
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: RFPercentage(2),
          backgroundColor: COLORS.monoWhite900,
          height: RFValue(100, 844),
          paddingTop: RFValue(50, 844),
          // borderBottomWidth: 2,
          // borderColor: COLORS.monoGhost500,
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "90%" }}
        >
          <TouchableOpacity
            onPress={onBackClick}
            style={{
              height: "100%",
              justifyContent: "center",
              width: RFValue(16, 844),
            }}
          >
            <SvgUri
              width="24"
              height="24"
              svgXmlData={SVGS.BACK_BUTTON_BLACK}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <View
                style={{
                  // borderWidth:2,
                  width: RFValue(44, 844),
                  height: RFValue(44, 844),
                  // flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: RFValue(16, 844),
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
                      bottom: 0,
                      right: -4,
                      width: RFValue(35, 844),
                      height: RFValue(35, 844),
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

            <View style={{ width: "75%", marginLeft: RFPercentage(1.5) }}>
              <Text
                style={{
                  fontSize: RFValue(16, 844),
                  fontFamily: "Poppins_600SemiBold",
                  color: COLORS.monoBlack900,
                }}
                numberOfLines={1}
              >
                {projectName}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* {memberName
              ? memberName.map((value, index) => {
                  return (
                   != 0 ? ", " + value : value}
                    </Text>
                  );
                })
              : "online"} */}
                <Text
                  style={{
                    fontSize: RFValue(14, 844),
                    fontFamily: "Poppins_400Regular",
                    color: COLORS.monoBlack500,
                  }}
                  numberOfLines={1}
                >
                  {typeof subText == "string"
                    ? subText
                    : handleMemberName(subText)}
                  <Text style={{ color: COLORS.primaryTeal500 }}>
                    {" "}
                    {typeof subText == "string"
                      ? null
                      : subText.length > 2
                      ? "+" + String(subText.length - 2)
                      : null}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => onMenuClick()}>
            <SvgUri
              width="24"
              height="24"
              svgXmlData={SVGS.THREE_DOTS_VERTICAL_BLACK}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    //</ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(28, 844),
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Header;
