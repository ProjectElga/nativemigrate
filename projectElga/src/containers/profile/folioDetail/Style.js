import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
const Styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      //flexDirection: "column-reverse",
    },
    toggleBar: {
      width: RFValue(34,844),
      height: RFValue(6,844),
      backgroundColor: COLORS.monoGhost500,
      borderRadius: RFValue(20,844),
      alignSelf: "center",

     // alignItems:"center"
      
    },
  
    headerContainer: {
      marginTop: RFValue(-25,844),
      zIndex: 1,
      height: "20%",
      backgroundColor: COLORS.monoWhite900,
      paddingHorizontal: RFValue(32,844),
      paddingBottom: RFValue(32,844),
      borderRadius: RFValue(24,844),
    },
    titleContainer: {
   marginLeft:8,
      width: "50%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleText: {
      fontFamily: "Poppins_500Medium",
      fontSize: RFValue(16, 844),
      color: COLORS.monoBlack900,
    },
    subtitleContainer: {
    
      width: "100%",
      marginTop: RFValue(8,844),
      alignItems: "center",
      flexDirection: "row",
    },
    subtitleText: {
      marginLeft:8,
      fontSize: RFValue(14, 844),
      fontFamily: "Poppins_400Regular",
      color: COLORS.monoBlack500,
      alignSelf: "center",
    },
    modalWrapper: {
      marginVertical: RFValue(24,844),
      paddingHorizontal: RFValue(32,844),
      height: "80%",
      width: "100%",
      backgroundColor: COLORS.monoWhite900,
      borderRadius: RFValue(24,844),
    },
    descriptionText: {
      marginTop: 8,
      fontFamily: "Poppins_400Regular",
      fontSize: RFValue(14, 844),
      color: COLORS.monoBlack700,
    },
    divider: {
      borderWidth: 1,
      borderColor: COLORS.monoGhost500,
      width: "100%",
      alignSelf: "center",
      marginTop: RFValue(24,844),
    },
    addComment: {
      fontFamily: "Poppins_700Bold",
      fontSize: RFValue(16,844),
      color: COLORS.primaryTeal500,
      marginTop: RFValue(12,844),
    },
    commentInput: {
      paddingHorizontal: RFValue(16,844),
      width: "100%",
      height: RFValue(60,844),
      marginTop: RFValue(16,844),
      backgroundColor: COLORS.monoGhost500,
      borderRadius: RFValue(12,844),
      fontFamily: "Poppins_600SemiBold",
      fontSize: RFValue(14,844),
    },
    similarProjects: {
      fontFamily: "Poppins_700Bold",
      fontSize: RFValue(16,844),
      color: COLORS.primaryTeal500,
      marginTop: RFValue(12,844),
    },
    seeMore: {
      alignSelf: "center",
      color: COLORS.monoBlack500,
      fontFamily: "Poppins_600SemiBold",
      fontSize: 10,
      marginTop: RFValue(24,844),
    },
  });
  export default Styles
  