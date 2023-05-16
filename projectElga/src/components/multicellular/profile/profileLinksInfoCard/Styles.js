import { StyleSheet } from "react-native";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
const semibold = "Poppins_600SemiBold";
const regular = "Poppins_400Regular";

const Styles = StyleSheet.create({
  card: {
    paddingVertical: RFValue(30, 844),

    backgroundColor: COLORS.monoWhite900,
 
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    marginBottom: RFValue(16, 844),
  },
  icon: {
    width: RFValue(80, 844),
    height: RFValue(80, 844),
  },
  title: {
    color: COLORS.monoBlack900,
    fontSize: RFValue(18, 844),
    fontFamily: semibold,
    textAlign: "center",
    lineHeight: RFValue(36, 844),
  },
  desctiption: {
    color: COLORS.monoBlack900,
    fontSize: RFValue(16, 844),
    fontFamily: regular,
  },
  detailsBox:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop:RFValue(12, 844),
    textAlign:"left"
  },
  topBox:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width:"100%",
    marginBottom:RFValue(4, 844),

  },
  separators: {
    backgroundColor: COLORS.monoGhost500,
    height: 1.5,
    width: "100%",
    borderRadius: RFValue(24, 844),
    marginVertical: RFValue(12,844)
  },
  text:{
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
    fontFamily: regular,
    marginBottom: RFValue(24, 844),
    textAlign: "left",
  }
});
export default Styles;
