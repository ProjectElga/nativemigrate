import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: "100%",
    paddingHorizontal: RFValue(20, 844),
    paddingTop: RFValue(64, 844),
    paddingBottom: RFValue(24, 844),
    justifyContent: "space-between",
  },
  datePicker: {
    paddingHorizontal: RFValue(24, 844),
    color: COLORS.monoBlack500,
    borderRadius: RFValue(12, 844),
    height: RFValue(56, 844),
    justifyContent: "center",
    width: "48%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: RFValue(24, 844),
    marginLeft: 8,
  },
  checkboxText:{
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    marginLeft: RFValue(16, 844),
    color: COLORS.monoBlack700,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(24, 844),
  },
  input: {
    marginTop: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: RFValue(72, 844),
    borderRadius: RFValue(15, 844),
    paddingHorizontal: RFValue(20, 844),
  },
 
});
export default styles;
