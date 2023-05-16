import React, { Component } from "react";
import { View, Text, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import styles from "./Style";
import Footer from "../../../components/multicellular/general/onBoardFooter/Footer";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
import AddExperience from "../../../components/multicellular/profile/addExperienceCard/addExperience";
import { assignAgency } from "../../../reducers/onboard/more";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import SnackBar from "../../../components/unicellular/snackbar";
import STRINGS from "../../../constants/Strings";
import AuthHeader from "../../../components/multicellular/auth/header";
import * as Analytics from "expo-firebase-analytics";
import moment from "moment-timezone";
class More extends Component {
  constructor() {
    super();
    this.state = {
      showNextButton: true,
      orgError: false,
      websiteError: false,
      showSnack: false,
      designationError: false,
      webisteValidateError: false
    };
  }
  async componentWillReceiveProps(nextProps, nextState) {
    const { isSuccessfull } = nextProps.more;
    if (isSuccessfull) {
      await AsyncStorage.setItem(STORAGE_KEY.IS_NEW_USER, "false");
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      await AsyncStorage.setItem(STORAGE_KEY.IS_NEW_USER, 'false');
      this.props?.navigation?.navigate("BrandSelfView", {
        userId: userId,
        tokenDetail: tokenDetail,
      });
    }
  }

  validate = (str) => {
    const regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      this.setState({ webisteValidateError: true });
      return false;
    }
  };
  formatDate = (date) => {
    return moment(date).tz("Asia/kolkata").format("YYYY-MM-DD")
  }
  handleSubmitForm = async () => {
    const {
      organisationName = "",
      designation = "",
      websiteName = "",
      startDate,
      endDate,
      isChecked
    } = this.props.more;
    const requestBody = {
      // agencyDetail: {
      name: organisationName,
      companyWebsite: websiteName.toLowerCase(),
      designation: designation,
      startDate: this.formatDate(startDate),
      endDate: !isChecked ? this.formatDate(endDate) : null,
      // },
    };
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const displayName = await AsyncStorage.getItem(
      STORAGE_KEY.USER_DISPLAY_NAME
    );
    const website = this.validate(websiteName);
    if (organisationName == "") {
      this.setState({ orgError: true });
    }
    if (designation == "") {
      this.setState({ designationError: true });
    }
    if (websiteName == "" || !website) {
      setInterval(() => {
        this.setState({ showSnack: false });
      }, 5000);
      this.setState({ websiteError: true, showSnack: true });
    }
    if (organisationName != "" && websiteName != "" && website && designation !== "") {
      this.props.callAssignIdentityApi(userId, requestBody, tokenDetail);
      Analytics.logEvent("onboard_socials", {
        contentType: "socials",
        userId: userId,
        displayName: displayName,
      
      });
      this.props.navigation.navigate("BrandSelfView", {
        userId: userId,
        tokenDetail: tokenDetail,
      });
    }
  };
  onCLickSkip = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.navigation.navigate("BrandSelfView", {
      userId: userId,
      tokenDetail: tokenDetail,
    });

  }
  render() {
    return (
      <View style={styles.wrapper}>
         <View>
          <AuthHeader
            title="Organisation"
            subtitle="Share Details"
            description="Build trust, share your Experience details"
            rightComp={() => {
              return (
                <TouchableOpacity
                  style={{ backgroundColor: COLORS.monoWhite900 }}
                  onPress={this.onCLickSkip}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: RFValue(16, 844),
                      color: COLORS.monoBlack900,
                    }}
                  >
                    Skip
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={{ marginTop: RFValue(10, 844) }}>
            <AddExperience
              inputColor={COLORS.monoGhost500}
              orgError={this.state.orgError}
              websiteError={this.state.websiteError}
              designationError={this.state.designationError}
              resetOrg={() => {
                this.setState({
                  orgError: false,
                });
              }}
              resetdesignationError={() => {
                this.setState({
                  designationError: false,
                });
              }}
              resetWebsite={() => {
                this.setState({
                  websiteError: false,
                  webisteValidateError: true
                });
              }}
            />
          </View>
        </View>
        {this.state.showSnack && (
          <SnackBar
            visible={this.state.showSnack}
            text={this.state.webisteValidateError ? "Please enter a valid website" : "Please fill required details."}
            onDismiss={() => {
              this.setState({
                showSnack: true,
              });
            }}
          />
        )}
        <Footer
          onBackPress={() => {
            this.props.navigation.goBack(null);
          }}
          onNextPress={this.handleSubmitForm}
        /> 
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { more } = state;
  return { more };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callAssignIdentityApi: (userId, requestBody, tokenDetail) => {
      dispatch({
        type: assignAgency.ASSIGN_AGENCY,
        userId,
        requestBody,
        tokenDetail,
      });
    },
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withNavigation(More));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More);