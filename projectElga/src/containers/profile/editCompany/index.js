
import React, { Component } from "react";

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CheckBox from "react-native-check-box";
import MoreInput from "../../../components/multicellular/more/input";
import Styles from "./Style";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
import AddExperience from "../../../components/multicellular/profile/addExperienceCard/addExperience";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import { Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { assignAgency } from "../../../reducers/onboard/more";
import moment from "moment-timezone";
import { profileTypes } from "../../../reducers/profile/profile";

class EditCompany extends Component {
  constructor() {
    super();
    this.state = {
      showNextButton: true,
      isChecked: false,
      startDate: "",
      endDate: "",
      companyName: "Hindustan Unilever",
      designation: "Marketing Lead",
      website: "unileverindia.com",
      experiences: [1],
      designationError: false,
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
      this.props.callAgencyApi(userId, tokenDetail);
      this.props.callProfileApi(userId, tokenDetail);
      this.props.navigation.navigate("BrandSelfView", {
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
      // this.props.navigation.navigate("BrandSelfView", {
      //   userId: userId,
      //   tokenDetail: tokenDetail,
      // });
    }
  };
  handleBack = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callAgencyApi(userId, tokenDetail);
    this.props.callProfileApi(userId, tokenDetail);
    this.props.navigation.goBack(null);
  }
  renderHeader = () => {
    return (
      <ProfileHeader
        text="Add Experience"
        showBackIcon={true}
        onBackPress={this.handleBack}
        rightComponent={() => {
          return (
            <TouchableOpacity
              onPress={this.handleSubmitForm}
            >
              <View style={Styles.saveButton}>
                <Text style={Styles.saveText}>Save</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  render() {
    return (
      <View style={Styles.wrapper}>
        {this.renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">

          <View>
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

        </ScrollView>
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
    callProfileApi: (userId, tokenDetail) => {
      dispatch({ type: profileTypes.GET_PROFILE_DATA, userId, tokenDetail });
    },
    callAgencyApi: (userId, tokenDetail) => {
      dispatch({
        type: assignAgency.GET_AGENCY,
        userId,
        tokenDetail,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)((EditCompany))