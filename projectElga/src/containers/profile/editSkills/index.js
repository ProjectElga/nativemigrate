import React, { Component } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import MoreInput from "../../../components/multicellular/more/input";
import Styles from "./Style";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
export default class EditSkills extends Component {
  constructor() {
    super();
    this.state = {
      showNextButton: true,
      isChecked: false,
      newSkill: "",
      skills: ["Graphic Designer", "Marketing Lead"],
    };
  }

  renderHeader = () => {
    return (
      <ProfileHeader
        text="Skills"
        showBackIcon={true}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              <Text style={Styles.saveText}>Save</Text>
            </TouchableWithoutFeedback>
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
          {this.state.skills.map((value, index) => {
            return (
              <View style={Styles.textInputContainer}>
                <TextInput
                  placeholder="Enter New Skill"
                  value={value}
                  style={Styles.textInput}
                  onChangeText={(text) => {
                    const skills = this.state.skills;
                    skills.splice(index, 1);
                    skills.push(text),
                      this.setState({
                        skills: [...skills],
                      });
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    const skills = this.state.skills;
                    skills.splice(index, 1);
                    this.setState({
                      skills: [...skills],
                    });
                  }}
                >
                  <Icon
                    name="x"
                    type="feather"
                    size={20}
                    color={COLORS.monoBlack500}
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          })}

          <TouchableWithoutFeedback
            onPress={() => {
              const skills = this.state.skills;
              skills.push("");
              this.setState({
                skills: [...skills],
              });
            }}
          >
            <View
              style={[
                Styles.buttonContainer,
                { marginBottom: RFValue(24, 844) },
              ]}
            >
              <Icon
                name="plus"
                type="feather"
                size={20}
                color={COLORS.primaryTeal500}
                style={{ marginRight: RFValue(16, 844) }}
              />
              <Text
                style={[
                  Styles.buttonText,
                  {
                    color: COLORS.monoBlack700,
                  },
                ]}
              >
                Add Skill
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}
