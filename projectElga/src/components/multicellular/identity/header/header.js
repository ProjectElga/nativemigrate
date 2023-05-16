import React, { Component } from "react";

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";

export default class IdentityHeader extends Component {
  constructor() {
    super();
    this.state = {
      instagramPress: false,
      youtubePress: false,
    };
  }
  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{this.props.title}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.onPress();
            }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.headerSubTitleText}>{this.props.subtitle}</Text>
        {this.props.details ? (
          <Text style={styles.headerDetailText}>{this.props.details}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(50, 844),
    color: COLORS.primaryTeal500,
    lineHeight: RFValue(54, 844),
    paddingTop: 3,
  },
  headerSubTitleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(24, 844),
    color: COLORS.monoBlack900,
  },
  headerDetailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14,844),
    color: COLORS.monoBlack900,
    width: "90%",
  },
  skipText: {
    fontSize: RFValue(16,844),
    zIndex:10,
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    paddingBottom: 10,

  },
});
