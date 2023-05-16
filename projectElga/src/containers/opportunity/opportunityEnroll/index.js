import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
import SaveButtons from "../../../components/multicellular/profile/saveButton/saveButtons";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import Styles from "./Styles";
import TextInputWithText from "../../../components/multicellular/profile/textInput/textInput";
import { RFValue } from "react-native-responsive-fontsize";
import MainCategoryBox from "../../../components/multicellular/userCategory/mainCategoryBox";
import CollabCard from "../../../components/multicellular/profile/collabCard/collabCard";
import { Icon } from "react-native-elements";
import AttachmentButton from "../../../components/unicellular/button/attachmentButton";
import ActionButtonFooter from "../../../components/multicellular/profile/actionButtonFooter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import InputBox from "../../../components/multicellular/profile/actionButtonInput";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);

export default class OpportunityEnroll extends Component {
  constructor() {
    super();
    this.state = {
      projectTypes: ["Paid", "Barter", "Split", "Network"],
      selectedType: "Paid",
      to: "lorem ipsum",
      projectName: "lorem ipsum",
      projectBudget: "250",
      deliverable: "",
    };
  }

  renderHeader = () => {
    return (
      <ProfileHeader
        text="Enroll"
        showBackIcon={true}
        fontSize={RFValue(24, 844)}
        onBackPress={() => {
          //this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <TouchableWithoutFeedback onPress={()=>{
              this.props.navigation.goBack(null);
            }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: RFValue(16, 844),
                  color: COLORS.primaryTeal400,
                }}
              >
                Send
              </Text>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  };

  _renderForm = () => {
    return (
      <View>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack700,
            marginTop: RFValue(12, 844),
            paddingHorizontal: RFValue(16, 844),
          }}
        >
          Deliverable
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.monoGhost500,
            width: "100%",
            marginTop: RFValue(16, 844),
            paddingHorizontal: RFValue(16, 844),
          }}
        ></View>
          <InputBox multiline={true} placeholder="Start typing your Deliverables here" noDivider={true} />
      </View>
    );
  };
  renderFile = () => {
    return (
      <View style={Styles.fileCard}>
        <Image
          source={IMAGES.bg1}
          style={[
            Styles.fileImage,
            {
              borderTopLeftRadius: RFValue(16, 844),
              borderBottomLeftRadius: RFValue(16, 844),
            },
          ]}
        />
        <View style={Styles.fileTextContainer}>
          <Text style={Styles.fileNameText}>File_name_47.jpg</Text>
          <Text style={Styles.fileSizeText}>2,000 KB</Text>
        </View>
        <View style={{ padding: RFValue(12, 844) }}>
          <Icon color={COLORS.monoBlack500} name="x" type="feather" size={16} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <BottomSheetModalProvider>
        <View style={{ height: "100%", backgroundColor: COLORS.monoWhite900 }}>
          <View style={Styles.wrapper}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={{height:"85%"}}>
                <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                  {this.renderHeader()}
                </View>
                {this._renderForm()}
              </View>
            </TouchableWithoutFeedback>
            <View style={{ marginBottom: RFValue(16, 844) }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                overScrollMode="never"
                horizontal
                style={{
                  marginRight: RFValue(-16, 844),
                  paddingRight: RFValue(16, 844),
                }}
              >
                <View style={Styles.fileContainer}>
                  {/* {this.renderFile()}
                  {this.renderFile()} */}
                </View>
              </ScrollView>
            </View>
          </View>

          <KeyboardAvoidingView style={{ height: "10%" }}>
            <ActionButtonFooter />
          </KeyboardAvoidingView>
        </View>
      </BottomSheetModalProvider>
    );
  }
}
