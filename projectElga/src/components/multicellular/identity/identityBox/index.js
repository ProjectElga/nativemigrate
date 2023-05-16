import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, ActivityIndicator } from "react-native";
import COLORS from "../../../../themes/colors";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";

function IdentityBox(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ paddingHorizontal: RFValue(20, 844) }}
    >
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={
          props.active
            ? ["#2CDD93", "#1BBDBDE8"]
            : [COLORS.monoChromeBlack, COLORS.monoChromeBlack]
        }
        style={{
          paddingTop: props.active ? 1.3 : 0.8,
          paddingBottom: props.active ? 1.6 : 0.9,
          paddingLeft: props.active ? 1.3 : 0.8,
          paddingRight: props.active ? 1.5 : 1,
          width: "100%",
          borderRadius: RFValue(16, 844),
          marginTop: RFValue(20, 844),
          height: RFValue(64, 844),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.active ? (
          <SvgUri
            style={{ position: "absolute", zIndex: 1, top: -3, right: -3 }}
            svgXmlData={SVGS.CHECK_CIRCLE_GRADIENT}
            width={RFValue(18, 844)}
            height={RFValue(18, 844)}
          />
        ) : null}
        <View style={Styles.identityboxView}>
          {props.loading ? (
            <ActivityIndicator
              style={[Styles.identityboxText, Styles.loaderSnipper]}
              size="small"
              color={COLORS.monoBlack500}
              animating
            />
          ) : (
            <Text style={Styles.identityboxText}>{props.title}</Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
// export default withNavigation(IdentityBox);
export default (IdentityBox);

