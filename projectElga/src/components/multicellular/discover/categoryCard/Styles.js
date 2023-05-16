import React, { Component } from "react";
import {  StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
 const Styles = StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius:RFValue(15,844),
      width:RFValue(156,844),
      height:RFValue(96,844),
      marginRight:RFValue(16,844),  shadowColor: "#555555",
      shadowOpacity: 0.05,
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 2,
      },
    },
    imageStyle:{
        borderRadius:RFValue(15,844)
    },
    text: {
      fontFamily: "Poppins_700Bold",
      fontSize: RFValue(16, 844),
      lineHeight:RFValue(24,844),
      color: COLORS.monoWhite900,
      textAlign: "center",

    },
    textBgWrapper:{
      width:"100%",
      height:"100%",
      backgroundColor:"#0000004a",
      paddingHorizontal:RFValue(8,844),
      borderRadius:RFValue(15,844),
      justifyContent: "center",
      alignItems: "center",
    },
    logo:{
        width:RFValue(147,844),
        height:RFValue(26,844)
    }
  });
  export default Styles