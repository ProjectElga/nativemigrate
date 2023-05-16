import React from "react";
import SvgUri from "expo-svg-uri";
import { useSelector } from "react-redux";
import { Image, Text, View } from "react-native";
import SVGS from "../../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import { Styles } from "./Styles";
import shadow from "../../../../constants/shadow";
import { moodboardData } from "../../../../config/MoodBoardConfig";

export default function MoodBoardCard(props) {
  const { text, image, isShowBorder } = props;
  const profile = useSelector((state) => state.profile);
  const { profileData } = profile;
  const { profileImageUrl = "" } = profileData;
  return (
    <View
      style={[Styles.wrapper, shadow, isShowBorder ? Styles.borderView : null]}
    >
      <View style={Styles.headerSection}>
        <View>
          <Text style={Styles.title}>Thumbnail Ideas</Text>
        </View>
        <View style={Styles.iconContainer}>
          <SvgUri
            svgXmlData={SVGS.BLACK_SHARE}
            width={RFValue(18, 844)}
            height={RFValue(18, 844)}
            style={Styles.icon}
          />
          <SvgUri
            svgXmlData={SVGS.BLACK_THREE_DOTS}
            width={RFValue(18, 844)}
            height={RFValue(18, 844)}
            style={Styles.icon}
          />
        </View>
      </View>
      <View style={Styles.infoContainer}>
        <Text style={Styles.text}>{"4 items"}</Text>
      </View>

      <View style={Styles.imageBgContainer}>
        {moodboardData?.images?.map((item, index) => {
          return (
            <View style={Styles.imageBgContainerInner} key={index}>
              <Image
                style={Styles.images}
                source={{
                  uri: item,
                }}
              />
            </View>
          );
        })}
      </View>
      <View style={Styles.bottomContainer}>
        <View style={Styles.profileContainer}>
          <View style={[Styles.iconWrapper]}>
            <Image source={{ uri: profileImageUrl }} style={Styles.profile} />
          </View>
          <View style={[Styles.iconWrapper, { marginLeft: RFValue(-5, 844) }]}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
              }}
              style={Styles.profile}
            />
          </View>
        </View>
        <View>
          <View style={Styles.sharedTextContainer}>
            <Text style={Styles.sharedText}>Shared</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
