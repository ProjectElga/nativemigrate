import React, { useState } from "react";
import { withNavigation } from "react-navigation";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, View, TouchableOpacity} from "react-native";
import COLORS from "../../../../themes/colors";

import Styles from "./Styles";

function SubCategoryBox(props) {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setActive(!active);
        props.onPress(active)
      }}
      key={props.key}
    >
      <View style={props.isActive ? Styles.scContainerActive : Styles.scContainer}>
        <Text
          style={[
            Styles.scText,
            {
              color: props.isActive ? COLORS.monoWhite900 : COLORS.monoBlack700,
            },
          ]}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default (SubCategoryBox);
