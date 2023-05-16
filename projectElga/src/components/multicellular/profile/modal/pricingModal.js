import React, { Component } from "react";
import { View, Image, Text, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import IMAGES from "../../../../themes/Images";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import Icon from "react-native-vector-icons/Ionicons";
import TextInputWithText from "../textInput/textInput";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../../constants/SvgUri";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { updateUser } from "../../../../reducers/profile/edit";
class PricingModal extends Component {
  constructor() {
    super();
    this.state = {
      priceModalVisible: false,
      dropdownOpen: false,
      unitData: [
        { label: "Hour", value: "Hour" },
        { label: "Project", value: "Project" },
      ],
      activeUnit: "",
      projectType: "",
      price: ""
    };
  }
  handleUnit = (item) => {
    this.setState({ activeUnit: item.value })
  }
  handleSubmit = () => {
    const { projectDetails } = this.props.edit;
    let arr = [];
    arr = projectDetails;
    const object = {
      project: this.state.projectType,
      price: this.state.price,
      unit: this.state.activeUnit?.value === "Hour" ? "Hr" : "Project"
    }
    if (this.state.projectType !== "") {
      arr.push(object);
      this.props.updateUserProject(arr)
      this.setState({ priceModalVisible: false });
    }
  }
  renderModal = () => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        backdropColor="black"
        visible={this.state.priceModalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ priceModalVisible: false });

          }}
        >
          <View style={Styles.modalFullContainer}>
            <View style={Styles.modalCardContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ priceModalVisible: false });
                }}
              >
                <Icon
                  name="ios-close"
                  size={24}
                  color="#aaaaaa"
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableWithoutFeedback>
              <TextInputWithText
                text="Project Type"
                textColor={COLORS.monoBlack700}
                placeholder="eg: Podcast"
                value={this.state.projectType}
                onChangeText={(text) => {
                  this.setState({ projectType: text });
                }}
              />

              <TextInputWithText
                text="Price"
                textColor={COLORS.monoBlack700}
                placeholder="eg: 500"
                value={this.state.price}
                width="90%"
                onChangeText={(text) => {
                  this.setState({ price: text });
                }}
                rightInputComponent={() => {
                  return (
                    <View style={Styles.priceIcon}>
                      <Text style={Styles.rupeesText}>₹₹₹</Text>
                    </View>
                  );
                }}
              />
              <View style={{ marginTop: RFValue(24, 844) }}>
                <Text style={Styles.unitText}>Unit</Text>
                <View style={Styles.pickerContainer}>
                  <View style={Styles.unitBtnWrapper}>
                    {this.state.unitData.map((item) => (
                      <TouchableWithoutFeedback onPress={() => this.handleUnit(item)}>
                        <View style={this.state.activeUnit === item.value ? Styles.unitBtnActive : Styles.unitBtn}>
                          <Text style={this.state.activeUnit === item.value ? Styles.unitBtnTextActive : Styles.unitBtnText}>{item.label}</Text>
                        </View>
                      </TouchableWithoutFeedback>

                    ))}

                  </View>
                  <TouchableWithoutFeedback onPress={this.handleSubmit}>
                    <View style={Styles.greenTickContainer}>
                      <Image
                        source={IMAGES.GreenTick}
                        style={Styles.greenTick}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          // onPress={() => {
          //   this.setState({ priceModalVisible: true });
          // }}
        >
          <View style={Styles.btnContainer}>
            <SvgUri
              svgXmlData={SVGS.PLUS_GREY}
              width={RFValue(24, 844)}
              height={RFValue(24, 844)}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderModal()}

      </View>
    );
  }
}
const Styles = StyleSheet.create({
  pricingPlusContainer: {
    marginTop: RFValue(10, 844),
    paddingTop: RFValue(8, 844),
    paddingBottom: RFValue(8, 844),
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(12, 844),
    width: RFValue(124, 844),
  },
  modalFullContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // margin: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalCardContainer: {
    width: "80%",
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    padding: RFValue(24, 844),
    //opacity:1
  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  rupeesText: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    lineHeight: RFValue(24, 844),
  },
  unitText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginLeft: RFValue(10, 844),
  },
  btnContainer: {
    marginTop: RFValue(16, 844),
    borderWidth: 1,
    borderColor: COLORS.monoBlack500,
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: RFValue(56, 844),
    paddingVertical: RFValue(24, 844),
    height: RFValue(56, 844),
    width: RFValue(124, 844),
  },
  pickerContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: RFValue(60, 844)
  },
  priceIcon: {
    borderBottomRightRadius: RFValue(12, 844),
    borderTopRightRadius: RFValue(12, 844),
    marginTop: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-5%",
    width: "15%",
  },
  unitBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  unitBtn: {
    marginTop: RFValue(16, 844),
    borderWidth: 1,
    borderColor: COLORS.monoBlack500,
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(44, 844),
    marginRight: RFValue(4, 844),
    minWidth: RFValue(64, 844)
  },
  unitBtnActive: {
    marginTop: RFValue(16, 844),
    borderWidth: 1,
    borderColor: COLORS.monoWhite900,
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(44, 844),
    backgroundColor: COLORS.primaryTeal400,
    marginRight: RFValue(4, 844),
    minWidth: RFValue(64, 844)
  },
  unitBtnText: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  },
  unitBtnTextActive: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  },
  greenTickContainer: {
    backgroundColor: COLORS.monoGhost500,
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  greenTick: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
});

const mapStateToProps = (state) => {
  const { profile, edit } = state;
  return { profile, edit };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProject: (projectDetailData) => {
      dispatch({ type: updateUser.UPDATE_USER_PROJECT_DETAIL, projectDetailData });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)((PricingModal));