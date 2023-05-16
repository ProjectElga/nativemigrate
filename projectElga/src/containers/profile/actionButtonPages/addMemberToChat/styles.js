import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import COLORS from "../../../../themes/colors";
const Styles=StyleSheet.create({
    saveText: {
        fontSize: RFValue(14, 844),
        fontFamily: "Poppins_500Medium",
        color: COLORS.monoWhite900,
      },
      saveButton:{
        paddingHorizontal: RFValue(16,844),
        paddingVertical:RFValue(10,844),
        backgroundColor: COLORS.primaryTeal400,
        borderRadius: RFValue(200, 844),
        alignItems: "center",
        justifyContent: "center",
      },
      skeletonUserCard: {
        width: "100%",
        // height: RFValue(118, 844),
        paddingHorizontal: RFValue(6, 844),
        paddingVertical: RFValue(20, 844),
        backgroundColor: COLORS.monoWhite900,
        borderRadius: RFValue(15, 844),
        marginBottom: RFValue(16, 844),
        flexDirection: "row",
      },
      sCardProfile: {
        width: RFValue(56, 844),
        height: RFValue(56, 844),
        borderRadius: RFValue(50, 844),
      },
      sCardBlock: {
        justifyContent: "space-around",
    
        marginLeft: RFValue(20, 844),
        width: "70%",
      },
      sCardStick: {
        height: RFValue(16, 844),
        borderRadius: RFValue(12, 844),
      },
})
export default Styles