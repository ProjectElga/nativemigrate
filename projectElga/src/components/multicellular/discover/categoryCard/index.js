import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import Styles from "./Styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
export default class CategoryCard extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <ImageBackground
          source={{ uri: this.props.image }}
          imageStyle={Styles.imageStyle}
          style={Styles.wrapper}
          resizeMode="cover"
        >
          <View style={Styles.textBgWrapper}>
            <Text style={Styles.text}>{this.props.text}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
