import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View } from "react-native";
import Styles from "./Style";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";

function Tag(props) {
  return (
    <View style={Styles.wrapper}>

      <View style={Styles.textWrapper}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(14, 844),
            color: COLORS.monoWhite900,
          }}
        >
          {props.category}
        </Text>
      </View>
      <Icon
        name="close-outline"
        size={20}
        color={COLORS.monoWhite900}
        onPress={() => {
          props.onPress();
        }}
      />
    </View>
  );
}

export default (Tag);
