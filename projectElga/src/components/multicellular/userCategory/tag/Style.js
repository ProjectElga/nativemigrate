import { StyleSheet } from "react-native";
import COLORS from "../../../../themes/colors";
const Styles = StyleSheet.create({
 wrapper:{
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.monoBlack700,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical:12,
    paddingHorizontal:16,
    marginRight: 10,
    marginBottom: 10,
 },
 textWrapper:{
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight:5
 },
});
export default Styles;
