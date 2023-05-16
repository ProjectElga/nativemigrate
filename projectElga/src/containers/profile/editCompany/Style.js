import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: 25,
    paddingTop: RFValue(76, 844),
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
  saveText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
  },
  saveButton: {
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(10, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(200, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: RFValue(24, 844),
    marginLeft: 8,
  },
  checkboxText: {
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
  buttonContainer: {
    marginTop: RFValue(24, 844),
    width: "100%",
    height: RFValue(72, 844),
    borderRadius: RFValue(16, 844),
    paddingHorizontal: RFValue(20, 844),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
  },
  buttonText: { fontSize: 12, fontFamily: "Poppins_500Medium" },
  divider:{
    width: "100%",
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
    marginTop: RFValue(24, 844),
  }
});
export default styles;
