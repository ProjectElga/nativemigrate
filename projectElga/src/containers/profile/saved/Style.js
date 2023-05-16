import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";

const styles = StyleSheet.create({
  authWrapper: {
    height: "100%",
    width: "100%",
  },
  imageWrapper: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  iconWrapper: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },
  opportunityView: {
    marginTop: RFValue(24, 844),
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bodyWrapper: {
  
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    
  },
  filterContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(16, 844),
 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
    paddingBottom: RFValue(0, 844),
    paddingHorizontal: RFValue(16, 844),
  },
  folioWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

  },
  userCardView:{
   marginTop:RFValue(16,844),
   marginBottom:RFValue(8,844)
   
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    alignItems: "center",
    lineHeight: RFValue(24, 844),
    width: "70%",
  },
  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.monoWhite900,
    paddingVertical: RFValue(8, 844),
    borderRadius: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
  },

  categoryTab: {
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
    marginTop: RFValue(16, 844),
    borderRadius: RFValue(8, 844),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categorybutton:{
    paddingVertical: RFValue(12, 844),
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(8, 844),
    width: "50%",
    shadowColor: "black",
  },
  categoryText:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  }
});

export default styles;
