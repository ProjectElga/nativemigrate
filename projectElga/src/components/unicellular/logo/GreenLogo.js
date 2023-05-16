import React, { useEffect } from "react";
import IMAGES from "../../../themes/Images";

import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import Styles from "./Styles";

export default function GreenLogo() {
  return (
    <View>
      <Image style={Styles.greenLogo} source={IMAGES.GreenLogo} />
    </View>
  );
}
