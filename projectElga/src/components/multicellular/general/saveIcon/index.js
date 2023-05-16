import React, { Component } from "react";
import { Image ,View} from "react-native";
import IMAGES from "../../../../themes/Images";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Styles from "./Style";
import { RFValue } from "react-native-responsive-fontsize";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";

export default class SaveIcon extends Component {
  render() {
    return (
      <View style={{width:RFValue(34,844),height:RFValue(34,844),alignItems:"center",justifyContent:"center"}}>
        <SvgUri
          svgXmlData={this.props.isSaved ? SVGS.RED_SAVED : SVGS.GREY_SAVED}
          width={
            this.props.width ? RFValue(this.props.width, 844) : RFValue(22, 844)
          }
          height={
            this.props.height
              ? RFValue(this.props.height, 844)
              : RFValue(22, 844)
          }
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        </View>
    );
  }
}
