import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Styles = StyleSheet.create({
  wrapper:{
    width: width,
    height: height,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.monoBlack500,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  card:{
    width: RFValue(280, 844),
    paddingHorizontal: RFValue(24, 844),
    paddingVertical: RFValue(32, 844),
    backgroundColor: COLORS.monoWhite900,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(20, 844),
  },
  image:{ width: RFValue(105, 844), height: RFValue(105, 844) },
  title:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginTop: RFValue(32, 844),
  },
  subTitle:{
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    //marginTop: RFValue(32, 844),
    textAlign: "center",
  },
  buttonWrapper:{
    height: RFValue(48, 844),
    width: "100%",
    marginTop: RFValue(16, 844),
  },
  button:{
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(48, 844),
    width: "100%",
  },
  buttonText:{
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoWhite900,
  }
});
export default Styles;
