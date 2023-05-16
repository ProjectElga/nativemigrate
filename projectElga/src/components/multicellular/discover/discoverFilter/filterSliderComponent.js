import React, { Component } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";
import Icon from "react-native-vector-icons/Ionicons";
import SVGS from "../../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import { Slider } from "react-native-elements";
import ToggleSwitch from "toggle-switch-react-native";

export default class SliderComponent extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Slider
          value={this.props.value}
          onValueChange={(value) => {
            this.props.onValueChange(value);
          }}
          style={{
            width: "95%",
            alignSelf: "center",
            //  height: 30,
            marginTop: RFValue(8, 844),
          }}
          trackStyle={{ height: 2 }}
          step={this.props.step}
          disabled={this.props.disabled}
          minimumValue={this.props.minValue}
          maximumValue={this.props.maxValue}
          thumbTintColor={COLORS.primaryTeal500}
          minimumTrackTintColor={COLORS.primaryTeal500}
          maximumTrackTintColor={COLORS.monoBlack500}
          thumbStyle={{
            height: RFValue(24, 844),
            width: RFValue(24, 844),
            borderRadius: 50,
            backgroundColor: COLORS.primaryTeal500,
            borderWidth: 6,
            borderColor: "rgba(196, 196, 196, 0.6)",
          }}
        />
        <View style={styles.footerWrapper}>
          <Text style={styles.leftFooter}>{this.props.leftFooter}</Text>
          <Text style={styles.leftFooter}>{this.props.rightFooter}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  titleText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  footerWrapper: {
    marginTop: RFValue(8, 844),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftFooter: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
  },
  rightWrapper: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
  },
});
