import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../themes/colors";

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
  iconWrapper:{
    height: "40%",
    marginTop: RFValue(110, 844),
    marginBottom: RFValue(-74, 844),
    alignItems: "center",
  },
  iconSubWrapper:{
    flexDirection: "row",
    width: "55%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loaderWindow:{
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
    opacity: 0.5,
    position:"absolute",
    zIndex:100,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  loaderText:{
    color:"#fff"
  },

  icon1:{
    backgroundColor: COLORS.teritiaryWarning,
    width: RFValue(72, 844),
    height: RFValue(72, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  icon2:{
    backgroundColor: COLORS.primaryTeal400,
    width: RFValue(72, 844),
    height: RFValue(72, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-30deg" }],
  },
  icon3:{
    backgroundColor: COLORS.teritiaryBlue,
    width: RFValue(72, 844),
    height: RFValue(72, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "30deg" }],
    alignSelf: "center",
  },
  icon4:{
    backgroundColor: COLORS.teritiaryPurple,
    width: RFValue(84, 844),
    height: RFValue(84, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "0deg" }],
  },
  wrapper:{
  
    paddingTop:RFValue(64,844),
    height: "100%",
    width: "100%",
    flex:1,
    justifyContent: "space-between",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom:RFValue(40,844)
  },
  overlay:{
    height:"100%",
    width:"100%",
  },
  logo: {
   alignSelf:"center",
    resizeMode: "contain",
    marginBottom: Platform.OS=="ios"?RFValue(25,844):RFValue(10,844),
    
  },
});

export default styles;
