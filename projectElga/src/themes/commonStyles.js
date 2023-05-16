import { StyleSheet, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as colors from "./chatColors";
import COLORS from "./colors";

const { height, width } = Dimensions.get("window");

const CommonStyle = StyleSheet.create({
  //chat screen style
  container: {
    flex: 1,
    backgroundColor: COLORS.monoWhite900,
  },
  navIcon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  NochatView:{
    flex: 1,
  },
  disableSheet: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    opacity: 0.5,
    width: "100%"
  },
  comingSoonLayout:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(20, 844),
    borderColor:COLORS.monoBlack700,
    paddingVertical: RFValue(5,844),
    paddingHorizontal: RFValue(15,844),
    borderWidth:1,
    borderRadius: 100
  },
  comingSoonText:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(10, 844),
    color: COLORS.monoBlack700,
  },
  fileCard: {
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginRight: RFValue(16, 844),
    height: RFValue(72, 844),
  },
  fileImage: {
    width: RFValue(56, 844),
    height: RFValue(56, 844),
    borderRadius: RFValue(8, 844),
    margin: 4,

    // borderTopLeftRadius: RFValue(16, 844),
    // borderBottomLeftRadius: RFValue(16, 844),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.monoBlack500,
  },
  fileNameText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
  },
  fileTextContainer: {
    marginLeft: RFValue(16, 844),
    paddingVertical: RFValue(12, 844),
    justifyContent: "space-evenly",
  },
  fileSizeText: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  scrollviewstyle: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: COLORS.monoWhite900,
  },
  nochattxt: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 200,
  },
  mainViewForChat: { width: "92%", alignSelf: "center" },
  sepratorView: {
    borderBottomColor: COLORS.monoGhost500,
    borderBottomWidth: 1.5,
  },
  mainTouchbleStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: RFValue(8, 844),
  },
  ProfileImgstyle: {
    borderWidth: 1.5,
    borderColor: COLORS.monoGhost500,
    backgroundColor: "pink",
    height: RFValue(40, 844),
    width: RFValue(40, 844),
    borderRadius: RFPercentage(3),
    marginRight: RFPercentage(2),
    alignSelf: "flex-start",
  },
  subViewForchatData: { width: "83%" },
  topViewInChatView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: RFValue(-12, 844),
  },
  senderNameTxt: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    //marginBottom: RFPercentage(0.5),
    color: COLORS.monoBlack900,
    //width: "66%",
    //fontWeight: "600",
  },
  timeTxt: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack500,
    textAlign: "right",
    marginRight:4
  },

  ReplyMainView: {
    marginTop: RFPercentage(1),
    backgroundColor: COLORS.monoGhost500,
    width: "80%",
    paddingRight: RFPercentage(2),
    borderRadius: RFPercentage(2),
    flexDirection: "row",
    paddingVertical: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(1),
  },
  sepratorForReply: {
    width: RFPercentage(1.2),
    backgroundColor: "grey",
    marginRight: RFPercentage(0.5),
    borderRadius: RFPercentage(1),
    backgroundColor: "#52CCB3",
    borderTopLeftRadius: RFPercentage(2),
    borderBottomLeftRadius: RFPercentage(2),
  },

  msgView: {
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,

    fontFamily: "Poppins_400Regular",
  },
  BottomView: { bottom: 5, backgroundColor: COLORS.monoWhite900 },
  replyBoxView: {
    marginTop: 4,
    borderTopColor: COLORS.monoGhost500,
    borderBottomColor: COLORS.monoGhost500,
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    width: "100%",
    paddingVertical: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  replyBoxSender: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack700,
  },
  replyBoxSenderSub: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.teritiaryBlue,
  },
  parentMsg: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,
  },
  replyBoxCrossIcon: {
    height: RFPercentage(5),
    width: RFPercentage(5),
    borderColor: RFPercentage(5),
  },
  bottomSubView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFPercentage(1.5),
    backgroundColor: COLORS.monoWhite900,
  },
  sheetTab: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(28, 844),
  },
  iconContainer: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    borderRadius: RFValue(30, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  sheetText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginLeft: RFValue(24, 844),
  },
  iconView: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(20, 844),
  },
  iconViewBtn: {
    flexDirection: "row",
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    marginRight: RFValue(30, 844),
  },
  footerInner: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFValue(24, 844),
  },
  footerWrapper: {
    height: "100%",
    borderTopColor: COLORS.monoGhost500,
    borderTopWidth: 1.5,
    backgroundColor: COLORS.monoWhite900,
  },
  bottomotherSubView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(12, 844),
    width: "83%",
    backgroundColor: COLORS.monoWhite900,

    marginTop: RFValue(18, 844),
  },
  plusBtn: { height: RFPercentage(4), width: RFPercentage(4) },
  msgInput: {
    width: "89%",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    fontFamily: "Poppins_400Regular",
    minHeight:RFValue(50,844),
    maxHeight:RFValue(100,844),
   // height
    borderColor: "transparent",
    backgroundColor: COLORS.monoGhost500,
    borderWidth: 1,
    paddingTop: RFValue(8, 844),
    paddingBottom: RFValue(8, 844),
    paddingHorizontal: RFValue(16, 844),
    color: "grey",
    borderRadius: 30,
    marginLeft: 8,
    fontSize: RFValue(16, 844),
    textAlignVertical: "center",
    alignContent: "center",
  },
  commentInput: {
    width: "100%",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    fontFamily: "Poppins_400Regular",
    minHeight:RFValue(50,844),
    maxHeight:RFValue(100,844),
   // height
    borderColor: "transparent",
    backgroundColor: COLORS.monoGhost500,
    borderWidth: 1,
    paddingTop: RFValue(8, 844),
    paddingBottom: RFValue(8, 844),
    paddingHorizontal: RFValue(16, 844),
    color: "grey",
    borderRadius: 30,
    marginLeft: 8,
    fontSize: RFValue(16, 844),
    textAlignVertical: "center",
    alignContent: "center",
  },
  sendCommentBtn: { alignItems: "flex-end", width: "15%", marginTop: RFValue(12, 844) },
  sendBtn: { alignItems: "flex-end", width: "15%", marginTop: RFValue(8, 844) },
  sendBtnImg: {
    height: RFPercentage(6),
    width: RFPercentage(6),
    marginBottom: RFValue(8, 844),
    borderRadius:RFPercentage(3),
    backgroundColor:COLORS.monoBlack900,
    alignItems:"center",
    justifyContent:"center"
  },
  // UserList Screen
  UIDTxtInput: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 30,
  },
  LoginBtn: {
    backgroundColor: "#F39C12",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 5,
  },
  LoginTxt: { color: "white", fontSize: 20, paddingVertical: 5 },

  // ChatRoom screen
  MainparentView: {
    paddingVertical: RFPercentage(2),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.Grey,
    borderBottomWidth: 1,
    paddingHorizontal: RFPercentage(1),
  },
  subView1: { flexDirection: "row", width: "74%", alignItems: "center" },
  subView2: { width: "25%", alignItems: "flex-end" },
  ProjectProfile: {
    height: RFPercentage(8),
    width: RFPercentage(8),
    borderRadius: RFPercentage(8),
    backgroundColor: "grey",
  },
  namesView: {
    justifyContent: "space-between",
    width: "74%",
    marginLeft: RFPercentage(2),
  },
  ProjectnameU: { fontSize: RFValue(16), color: colors.SecondBlack },
  senderNameU: {
    fontSize: RFValue(14),
    marginVertical: RFPercentage(1),
    color: colors.GreyText,
  },
  LastMsgU: { fontSize: RFValue(14), color: colors.GreyText },
  timeU: { fontSize: RFValue(14), color: colors.GreyText },

  //Chat screen

  RBMainV: { backgroundColor: "white", width: width },
  RBTopImg: {
    height: RFPercentage(4),
    width: RFPercentage(8),
    resizeMode: "contain",
    alignSelf: "center",
  },
  RBTouchble: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: RFPercentage(1),
  },
  Sheet1Icon: {
    height: RFPercentage(6),
    width: RFPercentage(10),
    resizeMode: "contain",
    marginRight: RFPercentage(1),
  },
  Sheet2Icon: {
    height: RFPercentage(4),
    width: RFPercentage(10),
    resizeMode: "contain",
    marginRight: RFPercentage(1),
  },
  sheetTxt: { fontSize: RFValue(16), color: colors.LightBlack },
  ReplyViewForImgVideo: {
    height: RFPercentage(8),
    width: RFPercentage(8),
    resizeMode: "contain",
  },
  AfterSelectMediaV: {
    marginLeft: RFPercentage(2),
    height: RFPercentage(20),
    width: RFPercentage(36),
  },
  seenView: { justifyContent: "flex-end", flexDirection: "row" },
  seenIcon: {
    height: RFPercentage(2),
    width: RFPercentage(2),
    resizeMode: "contain",
  },
  seenTxt: {
    color: colors.Green,
    fontSize: RFValue(12),
    marginLeft: RFPercentage(1),
  },
  replyBoxSenderName: {
    fontSize: RFValue(14, 844),
    color: colors.Blue,
    paddingTop: RFPercentage(1),
    marginBottom: RFPercentage(1),
    fontFamily: "Poppins_500Medium",
  },
  replyboxImageVideo: {
    height: RFPercentage(5),
    width: RFPercentage(5),
    resizeMode: "contain",
  },
  chatViewImgVideo: {
    width: "90%",
    height: undefined,

    aspectRatio: 16 / 9,
    borderRadius: RFValue(8, 844),
  },
});

export default CommonStyle;
