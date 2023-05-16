import React, { useState } from "react";
import { withNavigation } from "react-navigation";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, View, Image, TouchableOpacity } from "react-native";
import COLORS from "../../../../themes/colors";

import Styles from "./Styles";

function MainCategoryBox(props) {
  return (
    <TouchableOpacity onPress={props.onPress} key={props.key}>
      <View
        style={[
          props.isIcon ? Styles.mcContainerwithIcon : Styles.mcContainer,
          {
            backgroundColor: props.isActive
              ? COLORS.monoBlack900
              : props.bgColor?props.bgColor:COLORS.monoGhost500,
          },
        ]}
      >
        {props.isIcon ? (
          <Image source={props.icon} style={Styles.icon} />
        ) : (
          <Text
            style={[
              Styles.mcText,
              {
                color: props.isActive
                  ? COLORS.monoWhite900
                  : COLORS.monoBlack700,
              },
            ]}
          >
            {props.text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
export default (MainCategoryBox);
