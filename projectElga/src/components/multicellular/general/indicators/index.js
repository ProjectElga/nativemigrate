import React, { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import Styles from "./Styles";

export default function Indicators(props) {
  const { totalIndicators, currentPosition } = props;
  return (
    <View style={Styles.indicatorsContainer}>
      {[...Array(totalIndicators)].map((item, index) => {
        return (
          <View
            style={
              index + 1 === currentPosition
                ? Styles.inActiveIndicator
                : Styles.activeIndicator
            }
            key={index}
          />
        );
      })}
    </View>
  );
}
