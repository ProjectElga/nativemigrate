import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../../../themes/colors";

import Styles from "./Style";
import { Icon } from "react-native-elements";

export default function NextButton(props) {
  return (
    <TouchableOpacity onPress={props.loading ? null : props.onPress} disabled={props.disabled}>
      <View
        style={[
          Styles.button,
          {
            opacity: props.opacity ? props.opacity : 1,
            width: "100%",
          },
        ]}
      >
        <Text style={Styles.buttonText}>
          {props.loading ? "..." : props?.title || "Continue"}
        </Text>
        {props.loading ? null :
          <Icon
            type="feather"
            name="arrow-right"
            size={20}
            color={COLORS.monoWhite900}
            style={{ marginLeft: 8, marginBottom: 2 }}
          />}
      </View>
    </TouchableOpacity>
  );
}
