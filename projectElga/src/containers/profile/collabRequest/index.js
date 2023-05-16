import React, { Component, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import Styles from "./Style";
import profile from "../../../assets/jsons/profile/profiledetails";
import folios from "../../../assets/jsons/profile/folio";
import citations from "../../../assets/jsons/profile/citations";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import SocialCard from "../../../components/multicellular/profile/socialCard/socialCard";
import FollowerInfoBar from "../../../components/multicellular/profile/followerInfoBar/followerInfoBar";
import CategoryBox from "../../../components/multicellular/profile/catergoryBox/categoryBox";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import CollabCard from "../../../components/multicellular/profile/collabCard/collabCard";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import { SignupTypes } from "../../../reducers/auth/signup";
import CompanyDetails from "../../../components/multicellular/profile/companyDetails/companyDetail.js";
import SaveIcon from "../../../components/multicellular/general/saveIcon";
import ProjectCard from "../../../components/multicellular/profile/projectCard/projectCard";
import ActionButton from "../../../components/multicellular/profile/button/actionButton";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
const height = Dimensions.get("window").height;
const width = Dimensions.get("screen").width;

export default class CollabRequest extends Component {
  constructor() {
    super();
    this.state = {
      projectTypes: ["Paid", "Barter", "Split", "Network"],
      selectedType: "Paid",
      to: "",
      projectName: "",
      slidedown: new Animated.ValueXY(0),
      slideUp: new Animated.ValueXY(0),
    };
  }
  slideDown = (value) => {
    Animated.spring(value, {
      toValue: { x: 0, y: RFValue(416, 844) },
      bounciness: 0,
      speed: 6,
      useNativeDriver: true,
    }).start();
  };
  slideUp = (value) => {
    Animated.spring(value, {
      toValue: { x: 0, y: RFValue(-416, 844) },
      bounciness: 0,
      speed: 6,
      useNativeDriver: true,
    }).start();
  };
  renderHeader = () => {
    return (
      <View style={Styles.headerContainer}>
        <Text style={Styles.headerTitle}>Collab Request</Text>

        <Icon
          name="ios-close"
          size={24}
          color="#aaaaaa"
          onPress={() => {
            this.props.navigation.goBack(null);
            this.slideDown(this.state.slideUp);
            this.slideUp(this.state.slidedown);
          }}
        />
      </View>
    );
  };

  renderPicDetail = () => {
    return (
      <View style={Styles.picDetailWrapper}>
        <View style={Styles.profilePicture}>
          <Image source={profile.profilePic} style={Styles.profileImage} />
        </View>
        <View style={{ marginLeft: 16, justifyContent: "center" }}>
          <Text style={Styles.profileNameText}>{profile.profileName}</Text>
          <Text style={Styles.userNameText}>
            {profile.userName} | Within 5 kms
          </Text>
          <Text style={Styles.categoryText}>{profile.categories}</Text>
        </View>
      </View>
    );
  };

  renderBio = () => {
    return (
      <View style={Styles.bioContainer}>
        <Text style={Styles.bioText}>
          Hello lovely Human :) Please fill the form below if you have a
          collabortion request. I hope you have already thought of what project
          you’d like us to work upon. I prefer paid collaborations but if you
          have any interesting project in mind
        </Text>
      </View>
    );
  };
  renderManagedBy = () => {
    return (
      <View style={Styles.managedByContainer}>
        <Text style={Styles.managedByText}>Managed By</Text>
        <Image source={IMAGES.Sample_profile} style={Styles.managedByPic} />
        <Text style={Styles.managedByText}>Riya Shah</Text>
      </View>
    );
  };

  renderProfileCard = () => {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.slidedown.y }],
          zIndex: 0,
        }}
      >
        <View
          style={[
            Styles.detailCard,
            { transform: [{ translateY: RFValue(-416, 844) }] },
          ]}
        >
          {this.renderHeader()}
          {this.renderPicDetail()}
          {this.renderBio()}
          {this.renderManagedBy()}
        </View>
      </Animated.View>
    );
  };
  renderProjectDetaiHeader = () => {
    return (
      <View style={Styles.headerContainer}>
        <Text style={Styles.headerTitle}>Project Details</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        >
          <Image
            source={IMAGES.UserPlus}
            style={{ width: 24, height: 24 }}
          ></Image>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderProjectDetailsCard = () => {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.state.slideUp.y }],
          marginTop: RFValue(48, 844),
        }}
      >
        <View
          style={[
            Styles.detailCard,
            {
              marginTop: RFValue(-32, 844),
              marginBottom: RFValue(24, 844),
              transform: [{ translateY: RFValue(416, 844) }],
            },
          ]}
        >
          {this.renderProjectDetaiHeader()}
          <CollabCard />
        </View>
      </Animated.View>
    );
  };
  componentDidMount() {
    this.slideDown(this.state.slidedown);
    this.slideUp(this.state.slideUp);
  }

  render() {
    return (
      <BottomSheetModalProvider>
        <View style={{ justifyContent: "flex-end" }}>
          <View style={Styles.wrapper}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
              }}
              behavior="padding"
              enabled
     
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={"never"}
              >
                {this.renderProfileCard()}

                {this.renderProjectDetailsCard()}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>

          <BottomNavBar />
        </View>
      </BottomSheetModalProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { signup } = state;
  return signup;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserLoginToken: () => {
      dispatch({ type: SignupTypes.RESET_LOGIN_TOKEN });
    },
  };
};
