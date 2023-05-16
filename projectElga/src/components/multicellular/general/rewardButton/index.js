import { LinearGradient } from "expo-linear-gradient";
import SvgUri from "expo-svg-uri";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../../constants/SvgUri";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import * as Analytics from "expo-firebase-analytics";

const RewardButton = () => {
  const navigation = useNavigation();
  //const analytics = getAnalytics();

  return (
    <TouchableOpacity
      onPress={() => {
        Analytics.logEvent("screen_view", {
          firebase_screen: "RewardPage",
        });

        navigation.navigate("RewardPage");
      }}
    >
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={["#7B61FF", "#FB46FB", "#FFC200"]}
        style={styles.wrapper}
      >
        <SvgUri
          svgXmlData={SVGS.GIFT}
          width={RFValue(24, 844)}
          height={RFValue(24, 844)}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default RewardButton;
