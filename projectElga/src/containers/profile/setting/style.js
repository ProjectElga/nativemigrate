import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
  detailCard: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    paddingHorizontal: RFValue(22, 844),
    paddingVertical: RFValue(22, 844),
  },
  detailContainer:{
    paddingHorizontal: RFValue(16, 844)
    
  },
  optionBoxContainer:{
    backgroundColor:COLORS.monoGhost500,
    borderRadius: RFValue(24, 844),
    paddingHorizontal:RFValue(20, 844),
    marginTop:RFValue(16,844)
  },
  optionView:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingVertical:RFValue(24,844)
  },
  logoutOptionView:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingVertical:RFValue(24,844)
},
  optionText:{
    fontSize: RFValue(16,844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    lineHeight:RFValue(32,844)
  },
  logoutOptionText:{
    fontSize: RFValue(16,844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.teritiaryRed500,
    lineHeight:RFValue(32,844)
  },
  titleText:{
    fontSize: RFValue(16,844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primaryTeal500,
    lineHeight:RFValue(32,844),
    paddingLeft:RFValue(12,844)
  },
  bottomBorder:{
      borderBottomColor:"#E2E2E2",
      borderBottomWidth:0.5
  },
  viewBox:{
      paddingTop:RFValue(24,844)
  },
  logoutIcon:{
      marginLeft:RFValue(10,844)
  },
  versionTextView:{
    paddingVertical:RFValue(24,844),
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  versionText:{
    color: COLORS.monoBlack500,
    fontSize: RFValue(14,844),
    fontFamily: "Poppins_500Medium",
  }

});
export default Styles;
