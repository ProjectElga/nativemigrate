import React, { Component } from "react";
import {
  Text,
  View,
  Linking,
  StyleSheet,
  Share,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width - RFValue(48, 844);
export default class CompanyDetails extends Component {
  handleLinking = (url) => {
    Linking.openURL(url);
  };
  render() {
    return (
      <TouchableOpacity onLongPress={this.props.onLongPress}>
      <View style={{ marginTop: RFValue(24, 844) }}>
        <View style={Styles.titleTextContainer}>
          <Text style={Styles.headerText}>{this.props.companyName}</Text>
          <Text style={Styles.dateText}>{this.props.date}</Text>
        </View>
        <Text style={[Styles.subtitleText, { color: COLORS.monoBlack700 }]}>
          {this.props.designation}
        </Text>
        <TouchableOpacity
          onPress={() => this.handleLinking(this.props.website)}
        >
          <View>
            <Text style={[Styles.subtitleText, { color: COLORS.monoBlack500 }]}>
              {this.props.website}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    );
  }
}
const Styles = StyleSheet.create({
  titleTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack900,
    fontSize: RFValue(16, 844),
    width: "50%",
  },
  dateText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    width: "50%",
    textAlign: "right",
    marginTop: 3,
  },
  subtitleText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    marginTop: RFValue(4, 844),
  },
});
