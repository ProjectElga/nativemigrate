import React, { Component } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import BottomNavBar from "../../general/bottomNavBar/bottomNavBar";
import ProfileHeader from "../header/header";
import ProfileButton from "../button/profileButton";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import Carousel from "react-native-snap-carousel";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import TextInputWithText from "../textInput/textInput";
import AttachmentButton from "../../../unicellular/button/attachmentButton";
import InputBox from "../actionButtonInput";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);

export default class CollabCard extends Component {
  constructor() {
    super();
    this.state = {
      projectTypes: ["Paid", "Barter", "Split", "Network"],
      selectedType: "Paid",
      to: "lorem ipsum",
      projectName: "lorem ipsum",
      projectBudget: "250",
      barterDetails: "lorem ipsum",
      recieverShare: "40",
      projectDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non maecenas neque blandit. Purus libero pellentesque porttitor velit  #openforcollaboration",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non maecenas neque blandit. Purus libero pellentesque porttitor velit  #openforcollaboration",
    };
  }

  renderSubject = () => {
    return <InputBox multiline={false} placeholder="Project Title" />;
  };
  renderProjectType = () => {
    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        <View style={Styles.textContainer}>
          <Text style={Styles.componentText}>Type</Text>
          <Image
            source={IMAGES.Info}
            style={{ width: RFValue(24, 844), height: RFValue(24, 844) }}
          />
        </View>
        <View style={Styles.textIconContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
          >
            {this.state.projectTypes.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({
                      selectedType: item,
                    });
                  }}
                >
                  <View
                    style={[
                      Styles.projectTypeCard,
                      {
                        backgroundColor:
                          this.state.selectedType == item
                            ? COLORS.primaryTeal500
                            : COLORS.monoGhost500,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        Styles.projectTypeCardText,
                        {
                          color:
                            this.state.selectedType == item
                              ? COLORS.monoWhite900
                              : COLORS.primaryTeal500,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  };
  renderProjectBudget = () => {
    return (
      <InputBox
        multiline={false}
        width="70%"
        placeholder="Project Budget"
        rightComponent={() => {
          return (
            <View style={Styles.rupeesContainer}>
              <Text style={Styles.rupeesText}>₹₹₹</Text>
            </View>
          );
        }}
      />
    );
  };
  renderBarterDetails = () => {
    return (
      <TextInputWithText
        text="Details"
        value={this.state.barterDetails}
        onChangeText={(text) => {
          this.setState({
            barterDetails: text,
          });
        }}
      />
    );
  };
  renderRecieverShare = () => {
    return (
      <TextInputWithText
        text="Reciever Share(%)"
        width="25%"
        textAlign="center"
        value={this.state.recieverShare}
        onChangeText={(text) => {
          this.setState({
            recieverShare: text,
          });
        }}
      />
    );
  };
  renderDetails = () => {
    return (
      <TextInputWithText
        multiline={true}
        text="Details"
        value={this.state.details}
        onChangeText={(text) => {
          this.setState({
            details: text,
          });
        }}
        height="big"
      />
    );
  };
  renderProjectDescription = () => {
    return (
      <InputBox multiline={true} placeholder="Description" noDivider={true} />
    );
  };

  render() {
    return (
      <View>
        {this.renderSubject()}
        {/* {this.renderProjectType()} */}

        {this.state.selectedType == "Paid"
          ? this.renderProjectBudget()
          : this.state.selectedType == "Barter"
          ? this.renderBarterDetails()
          : this.state.selectedType == "Split"
          ? this.renderRecieverShare()
          : this.renderDetails()}
        {this.state.selectedType != "Network"
          ? this.renderProjectDescription()
          : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
  blackCross: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  bodyWrapper: {
    paddingTop: RFValue(24, 844),
    width: "100%",
    paddingBottom: RFValue(43, 844),
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(12, 844),
  },

  componentText: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(8, 844),
    alignItems: "flex-end",
  },
  inputBar: {
    paddingHorizontal: RFValue(25, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    marginTop: RFValue(10, 844),
    width: "100%",
    paddingTop: RFValue(15, 844),
    paddingBottom: RFValue(15, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    fontSize: RFValue(12, 844),
  },

  multiLineInput: {
    lineHeight: RFValue(24, 844),
  },
  projectTypeCard: {
    paddingHorizontal: RFValue(32, 844),
    paddingVertical: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  projectTypeCardText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
  },
  rupeesContainer: {
    paddingHorizontal: RFValue(10, 844),
    paddingVertical: RFValue(4, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.primaryTeal400,
  },
  rupeesText: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 24,
    justifyContent: "space-between",
  },
});
