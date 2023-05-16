import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import MoreInput from "../../more/input";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
import moment from "moment-timezone";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import { assignAgency } from "../../../../reducers/onboard/more";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      showNextButton: true,
      error: false,
      show: false,
    };
  }

  renderInputs = () => {
    const {
      more: { organisationName = "", designation = "", websiteName = "" },
      more = {},
    } = this.props;
    return (
      <View>
        <MoreInput
          placeholder="Enter Organisation Name"
          color={this.props.inputColor}
          value={organisationName}
          onChangeText={(text) => {
            this.props.setOrgansation(text);
            this.props?.resetOrg();
          }}
          error={this.props.orgError}
          showErrorMsg={this.props.orgError}
        />
        <MoreInput
          placeholder="Enter your designation"
          color={this.props.inputColor}
          value={designation}
          onChangeText={(text) => {
            this.props.setDesignation(text);
            this.props?.resetdesignationError();
          }}
          error={this.props.designationError}
          showErrorMsg={this.props.designationError}
        />
        <MoreInput
          placeholder="Enter your company website"
          color={this.props.inputColor}
          value={websiteName}
          onChangeText={(text) => {
            this.props.setWebsiteName(text.toLowerCase());
            this.props?.resetWebsite();
          }}
          error={this.props.websiteError}
          showErrorMsg={this.props.websiteError}
        />
      </View>
    );
  };
  renderCheckBox = () => {
    const { isChecked } = this.props.more;
    return (
      <View style={Styles.checkboxContainer}>
        <CheckBox
          checkBoxColor={COLORS.primaryTeal500}
          onClick={() => {
            this.props.setIsChecked(!isChecked);
          }}
          isChecked={isChecked}
        //  leftText={"CheckBox"}
        />
        <Text style={Styles.checkboxText}>I currently work here</Text>
      </View>
    );
  };
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.props.setStartDate(currentDate);
  };
  onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.props.setEndDate(currentDate);
  };
  showDatepicker = () => {
    const { startDate } = this.props.more;
    this.setState({ show: true });
    DateTimePickerAndroid.open({
      value: startDate,
      mode: "date",
      is24Hour: true,
      dateFormat: "YYYY-MM-DD",
      onChange: this.onChange,
    });
  };
  showEndDatepicker = () => {
    const { endDate } = this.props.more;
    this.setState({ show: true });
    DateTimePickerAndroid.open({
      value: endDate,
      mode: "date",
      is24Hour: true,
      dateFormat: "YYYY-MM-DD",
      onChange: this.onChangeEndDate,
    });
  };
  formatDate = (date) => {
    return moment(date).tz("Asia/kolkata").format("YYYY-MM-DD")
  }

  renderDates = () => {
    const { startDate, isChecked, endDate } = this.props.more;
    const { show } = this.state;
    return (
      <View style={Styles.dateContainer}>
        <TouchableOpacity
          style={[
            Styles.datePicker,
            { backgroundColor: this.props.inputColor },
          ]}
          onPress={this.showDatepicker}
        >
          <View>
            <Text style={Styles.datePickerText}>
              {startDate !== "" ? this.formatDate(startDate) : "Start"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.datePicker,
            {
              backgroundColor: isChecked
                ? COLORS.monoBrightGray
                : this.props.inputColor,
            },
          ]}
          onPress={this.showEndDatepicker}
          disabled={isChecked}
        >
          <View>
            <Text style={Styles.datePickerText}>
              {endDate !== "" ? this.formatDate(endDate) : "Start"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { more = {} } = this.props;
    return (
      <View>
        {this.renderInputs()}
        {this.renderCheckBox()}
        {this.renderDates()}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  datePicker: {
    paddingHorizontal: RFValue(24, 844),
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
    borderRadius: RFValue(12, 844),
    height: RFValue(56, 844),
    justifyContent: "center",
    width: "48%",
  },
  datePickerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: RFValue(24, 844),
    marginLeft: 8,
  },
  checkboxText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    marginLeft: RFValue(16, 844),
    color: COLORS.monoBlack700,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(24, 844),
  },
  saveText: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_700Bold",
    color: COLORS.primaryTeal500,
  },
  input: {
    marginTop: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: RFValue(72, 844),
    borderRadius: RFValue(15, 844),
    paddingHorizontal: RFValue(20, 844),
  },
});
const mapStateToProps = (state) => {
  const { more } = state;
  return { more };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrgansation: (organisationName) => {
      dispatch({ type: assignAgency.ADD_ORGANISTION, organisationName });
    },
    setDesignation: (designation) => {
      dispatch({ type: assignAgency.ADD_DESIGNATION, designation });
    },
    setWebsiteName: (websiteName) => {
      dispatch({ type: assignAgency.ADD_WEBSITE, websiteName });
    },
    setStartDate: (startDate) => {
      dispatch({ type: assignAgency.ADD_START_DATE, startDate });
    },
    setEndDate: (endDate) => {
      dispatch({ type: assignAgency.ADD_END_DATE, endDate });
    },
    setIsChecked: (isChecked) => {
      dispatch({ type: assignAgency.IS_WORKING_CURRENTLY, isChecked });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
