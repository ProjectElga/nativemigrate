import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";

const styles = StyleSheet.create({
  pageWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
  },
  chatHeader: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: "100%",
    paddingLeft: RFValue(24, 844),
    paddingRight: RFValue(24, 844),
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: RFValue(55, 844),
    paddingBottom: RFValue(20, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderBottomWidth: 0,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 1,
  },
  headerInfoSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(34, 844),
    paddingTop: RFValue(16, 844),
    paddingBottom: RFValue(12, 844),
    paddingHorizontal: RFValue(24, 844),
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.monoBlack500,
  },
  inputContainer: {
    width: RFValue(280, 844),
    marginHorizontal: RFValue(16, 844),
  },
  profilePicture: {
    width: RFValue(54, 844),
    height: RFValue(54, 844),
    borderRadius: RFValue(50, 844),
    marginHorizontal: RFValue(12, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
  },
  headerBackButton: {
    width: RFValue(16, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },
  plusButtonContainer: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },
  sentButtonContainer: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(50, 844),
    backgroundColor: COLORS.primaryTeal500,
    justifyContent: "center",
    alignItems: "center",
  },
  headerChatTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoWhite900,
  },
  headerUsersname: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoWhite900,
    marginTop: RFValue(8, 844),
  },
  chatFooter: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingLeft: RFValue(16, 844),
    paddingRight: RFValue(32, 844),
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
    borderBottomWidth: 0,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 1,

  },
  headerSpace: {
    height: RFValue(130, 844),
  },
  footSpace: {
    height: RFValue(110, 844),
  },
  chatLayout: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingLeft: RFValue(16, 844),
    marginTop: RFValue(16, 844),
  },
  chatLayoutOwned:{
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "row-reverse",
    paddingLeft: RFValue(16, 844),
    marginTop: RFValue(16, 844),
    maxWidth:"75%",
  },
  divider: {
    borderTopWidth: 1,
    color: "#eeee",
    width: "70%",
    marginRight: RFValue(12, 844),
    opacity: 0.1,
  },
  chatDetailContainer: {
    marginLeft: RFValue(12, 844),
    maxWidth:"75%",
    backgroundColor:COLORS.monoGhost500,
    padding: RFValue(12, 844),
    borderRadius:RFValue(16, 844)
  },
  chatDetailContainerOwner:{
    marginRight: RFValue(12, 844),
    // maxWidth:"100%",
    backgroundColor:COLORS.monoWhite900,
    padding: RFValue(12, 844),
    borderRadius:RFValue(16, 844),
    borderWidth:RFValue(1, 844),
    borderColor:'#EEEEEE'
  },
  chatDetailOwner:{
    marginRight: RFValue(0, 844),
    // maxWidth:"100%",
    backgroundColor:COLORS.monoWhite900,
    padding: RFValue(12, 844),
    borderRadius:RFValue(16, 844),
    borderWidth:RFValue(1, 844),
    borderColor:'#EEEEEE'
  },
  dividerLayout: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  chatDate: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    paddingVertical: RFValue(4, 844),
  },
  chatprofilePicture: {
    width: RFValue(32, 844),
    height: RFValue(32, 844),
    borderRadius: RFValue(50, 844),
  },
  chatprofileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
  },
  emptyProfileImage:{
    width: RFValue(0, 844),
    height: RFValue(0, 844),
  },

  chatUserName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.primaryTeal500,
  },
  chatText: {
    color: COLORS.monoBlack700,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
  },
  chatToggleWrapper: {
    width:"100%",
    display:"flex",
    flexDirection:"row",
    
  },
  chatToggle: {
    width:"50%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding: RFValue(16,844),
    borderBottomColor: COLORS.monoGhost500,
    borderBottomWidth: RFValue(2, 844)
  },
  chatActiveToggle: {
    borderBottomColor: COLORS.primaryTeal400,
    borderBottomWidth: RFValue(2, 844)
  },
  chatToggleText: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  chatActiveToggleText: {
    color: COLORS.monoBlack700,
  },
});

export default styles;
