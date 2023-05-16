import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../../themes/colors";
import SvgUri from "expo-svg-uri";
import shadow from "../../../../constants/shadow";

export default function CreatorCard(props) {
  const { userData, image, isAccepted, onCirclePress, onPress } = props;
  const renderIconContainer = () => {
    return (
      <TouchableOpacity
        onPress={onCirclePress}
        style={[Styles.svgIconContainer, shadow]}
      >
        <Image source={image} style={Styles.svgIcon} resizeMode="contain" />
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.card}>
      <ImageBackground
        style={Styles.imageBg}
        source={{ uri: userData.profileImageUrl }}
      >
        {!isAccepted && renderIconContainer()}
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <LinearGradient
            style={Styles.bottomSection}
            colors={[
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.3)",
              "rgba(0,0,0,0.1)",

              "rgba(0,0,0,0.01)",
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          >
            <View>
              <Text style={Styles.title}>
                {userData?.displayName || userData?.name}
              </Text>
              <Text>
                {userData?.subCategoryNames &&
                  userData?.subCategoryNames?.length > 0 &&
                  userData.subCategoryNames.map((key, index) => {
                    return index < 1 ? (
                      <Text style={Styles.subTitle}>{key.name}</Text>
                    ) : null;
                  })}
                {userData?.subCategoryNames?.length > 1 ? (
                  <Text style={Styles.subTitle}>
                    {` +${userData.subCategoryNames.length - 1}`}
                  </Text>
                ) : null}
              </Text>
              <Text style={Styles.description} numberOfLines={2}>{userData.bio}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const Styles = StyleSheet.create({
  card: {
    height: RFValue(285, 844),
    width: "100%",
  },
  imageBg: {
    flex: 1,
    overflow: "hidden",
    borderRadius: RFValue(12, 844),
  },
  svgIcon: {
    width: RFValue(16, 844),
    height: RFValue(16, 844),
  },
  bottomSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    padding: RFValue(12, 844),
  },
  title: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoWhite900,
    width: "100%",
  },
  description: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoWhite900,
  },
  subTitle: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.primaryTeal300,
  },
  svgIconContainer: {
    width: RFValue(36, 844),
    height: RFValue(36, 844),
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(1000, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: RFValue(12, 844),
    top: RFValue(12, 844),
    zIndex: 10,
  },
});
