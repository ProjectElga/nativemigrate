import SvgUri from "expo-svg-uri";
import React, { Component } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { withNavigation } from "react-navigation";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";
import styles from "../pendingPage/Style";

class PendingLoader extends Component {
  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Skeleton
          styles={{
            width: RFValue(270, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Projects", {
              activeTab: 1,
            });
          }}
        >
          <SvgUri width={20} height={20} svgXmlData={SVGS.GREYCLOSE} />
        </TouchableOpacity>
      </View>
    );
  };
  renderSecondBar = () => {
    return (
      <View style={styles.dateCategoryContainer}>
        <Skeleton
          styles={{
            width: RFValue(150, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
      </View>
    );
  };
  renderMiddleContainer = () => {
    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        <Skeleton
          styles={{
            width: RFValue(300, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
        <Skeleton
          styles={{
            marginTop: RFValue(24, 844),
            width: RFValue(300, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
        <Skeleton
          styles={{
            marginTop: RFValue(24, 844),
            width: RFValue(250, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
      </View>
    );
  };
  renderBottom = () => {
    return (
      <View>
        <Skeleton
          styles={{
            marginTop: RFValue(40, 844),
            width: RFValue(300, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
        <Skeleton
          styles={{
            marginTop: RFValue(24, 844),
            width: RFValue(250, 844),
            height: RFValue(16, 844),
            borderRadius: RFValue(12, 844),
          }}
        />
      </View>
    );
  };
  renderFooter = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" ,marginBottom:RFValue(20,844)}}>
        <Skeleton
          styles={{
            height: RFValue(64, 844),
            width: "48%",
            borderRadius: RFValue(12, 844),
          }}
        />
        <Skeleton
          styles={{
            height: RFValue(64, 844),
            width: "48%",
            borderRadius: RFValue(12, 844),
          }}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={[styles.wrapper, { height: "100%",justifyContent:"space-between" }]}>
          <View>
        {this.renderHeader()}
        {this.renderSecondBar()}
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.monoGhost500,
            width: "100%",
            marginTop: RFValue(16, 844),
          }}
        ></View>
        {this.renderMiddleContainer()}

        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.monoGhost500,
            width: "100%",
            marginTop: RFValue(40, 844),
          }}
        ></View>
             {this.renderBottom()}
        </View>
               <View>
   
        {this.renderFooter()}
        </View>
      </View>
    );
  }
}
export default (PendingLoader);
