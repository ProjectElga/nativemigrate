import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { profileTypes } from "../../../reducers/profile/profile";
import IMAGES from "../../../themes/Images";
import ProfileHeader from "../../../components/multicellular/profile/header/header";
import Styles from "./Style";
import { RFValue } from "react-native-responsive-fontsize";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import { updateUser } from "../../../reducers/profile/edit";
import COLORS from "../../../themes/colors";
import TextInputWithText from "../../../components/multicellular/profile/textInput/textInput";
import PricingModal from "../../../components/multicellular/profile/modal/pricingModal";
import SvgUri from "expo-svg-uri";
import SVGS from "../../../constants/SvgUri";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import EditPlus from "../../../components/unicellular/button/editPlusButton";
import URLS from "../../../constants/Urls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import { makePostApiCall } from "../../../api";
import { call } from "redux-saga/effects";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";
import db, { storage } from "../../../config/firebaseConfig";
import ComingSoonCard from "../../../components/multicellular/general/comingSoon";
import * as Analytics from "expo-firebase-analytics";
import SnackBar from "../../../components/unicellular/snackbar";

class EditPage extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      username: "",
      profileCall: false,
      displayName: "",
      userNameError: false,
      userNameError: false,
      userNameError: false,
      localErrorMsg: "",
      image: "",
      skills: "Musician, Dancer, Photographer",
      bio: "",
      genre: [],
      managedBy: "Rohit Singh",
      website: "loremipsum.com",
      priceModalVisible: false,
      projectType: "",
      price: "",
      pitch:
        " Hello lovely Human :) Please fill the form below if you have a collabortion request. I hope you have already thought of what project you’d like us to work upon. I prefer paid collaborations but if you have any interesting project in mind",
    };
  }
  async componentWillReceiveProps(nextProps, nextState) {
    const { profileData } = nextProps.profile;
    const { isSuccessFullUpdate, error } = nextProps.edit;
    const {
      displayName,
      userName,
      bio,
      subCategoryNames = [],
      tag = [],
      profileImageUrl = "",
      coverImageUrl = "",
      isCreator,
    } = profileData;

    if (!this.state.profileCall) {
      const subcategories = [];

      subCategoryNames?.map((key, index) => {
        const name = key.name;
        subcategories.push(name);
      });

      const tags = [];
      tag?.map((key, index) => {
        tags.push(key);
      });

      this.setState({
        username: userName,
        displayName: displayName,
        skills: subcategories,
        bio: bio,
        profileCall: true,
        image: profileImageUrl,
        cover: coverImageUrl,
      });
    }

    if (isSuccessFullUpdate) {
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      this.props.callProfileApi(userId, tokenDetail);
      this.props.callReset();
      if (isCreator) {
        this.props.navigation.navigate("Profile");
      } else {
        this.props.navigation.navigate("BrandSelfView");
      }
    }
    if (error) {
      setTimeout(() => {
        this.props.callReset();
      }, 3000);
    }
  }
  getBlob = async (url) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", url, true);
      xhr.send(null);
    });
  };
  handleSubmitForm = async () => {
    const {
      profileData,
      categoriesArr = [],
      genreArr = [],
    } = this.props.profile;
    const { profileImageUrl = "", coverImageUrl = "" } = profileData;
    console.log("submitGenre", genreArr);
    if (this.state.username == "") {
      this.setState({ userNameError: true });
    }
    if (this.state.displayName == "") {
      this.setState({ displayNameError: true });
    }
    if (this.state.bio == "") {
      this.setState({ bioError: true });
    }
    if (!categoriesArr) {
      this.setState({ categoryError: true });
    }
    if (categoriesArr && categoriesArr?.length === 0) {
      this.setState({ categoryError: true });
    }
    if (
      this.state.username !== "" &&
      this.state.displayName !== "" &&
      this.state.bio !== "" &&
      categoriesArr &&
      categoriesArr?.length > 0
    ) {
      const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      const requestBody = {
        bio: this.state.bio,
        genre: genreArr,
        userName: this.state.username,
        displayName: this.state.displayName,
        subCategoryNames: categoriesArr,
        tag: genreArr,
        managingUserIds: "",
        managedByUserId: "",
        profileImageUrl: this.state.image,
        coverImageUrl: this.state.cover,
        agency: "",
        projectBudgetDetails: {
          name: "Vocals",
          price: "500",
          unit: "HOUR",
        },
      };
      const requestBodyElastic = {
        id: userId,
        bio: this.state.bio,
        genre: genreArr,
        userName: this.state.username,
        displayName: this.state.displayName,
        subCategoryNames: categoriesArr,
        tag: genreArr,
        managingUserIds: "",
        managedByUserId: "",
        profileImageUrl: this.state.image,
        coverImageUrl: this.state.cover,
        agency: "",
        projectBudgetDetails: {
          name: "Vocals",
          price: "500",
          unit: "HOUR",
        },
      };

      this.props.callEditUserApi(userId, requestBody, tokenDetail);
      // this.props.callElasticApi(userId, requestBodyElastic, tokenDetail);
    }

    this.props.callReset();

    // this.props.navigation.navigate("Profile", {
    //   selfView: true,
    //   userId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
    //   tokenDetail: await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
    // });
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const { profileData } = this.props.profile;
    Analytics.logEvent("screen_view", {
      firebase_screen: "EditPage",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });

    this.props.callProfileApi(userId, tokenDetail);
    this.setState({
      userId: userId,
    });
  }
  handleCategoryEdit = () => {
    const { profileData } = this.props.profile;
    const { isCreator } = profileData;
    Analytics.logEvent("screen_view", {
      firebase_screen: "EditCategory",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    this.props.navigation.navigate("EditCategory", {
      identity: isCreator ? 1 : 2,
    });
  };
  renderHeader = () => {
    return (
      <ProfileHeader
        text="Edit Profile"
        showBackIcon={true}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <TouchableOpacity onPress={this.handleSubmitForm}>
              <View style={Styles.saveButton}>
                <Text style={Styles.saveText}>Save</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  renderCoverPicture = () => {
    const { profileData } = this.props.profile;
    const { coverImageUrl = "" } = profileData;

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.getPermissionAsync("cover");
          }}
        >
          <View style={Styles.coverPicture}>
            <ImageBackground
              source={{
                uri: this.state.cover,
              }}
              style={Styles.bgImg}
            >
              <View style={Styles.coverOverlay}></View>
              <View style={Styles.editIconWrapper}>
                <SvgUri
                  svgXmlData={SVGS.EDIT}
                  width={RFValue(14, 844)}
                  height={RFValue(14, 844)}
                />
                <Text style={Styles.editText}>Edit</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderProfilePicture = () => {
    const { profileData } = this.props.profile;
    const { profileImageUrl = "" } = profileData;
    return (
      <View
        style={{ position: "absolute", zIndex: 1, bottom: RFValue(-52, 844) }}
      >
        <TouchableOpacity
          onPress={() => {
            this.getPermissionAsync("profile");
          }}
        >
          <View style={Styles.profilePicture}>
            <ImageBackground
              source={{
                uri: this.state.image,
              }}
              style={Styles.bgImg}
              imageStyle={{
                borderRadius: RFValue(55, 844),
              }}
            >
              <View style={Styles.profileOverlay}></View>
              <View style={Styles.editIconWrapper}>
                <SvgUri
                  svgXmlData={SVGS.EDIT}
                  width={RFValue(14, 844)}
                  height={RFValue(14, 844)}
                />
                <Text style={Styles.editText}>Edit</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderUsername = () => {
    return (
      <TextInputWithText
        text="User Name"
        value={this.state.username}
        onChangeText={(text) => {
          this.setState({ username: text });
          if (text !== "") {
            this.setState({ userNameError: false });
          }
        }}
        error={this.state.userNameError}
      />
    );
  };
  renderDisplayName = () => {
    return (
      <TextInputWithText
        text="Display Name"
        value={this.state.displayName}
        onChangeText={(text) => {
          this.setState({ displayName: text });
          if (text !== "") {
            this.setState({ displayNameError: false });
          }
        }}
        error={this.state.displayNameError}
      />
    );
  };
  renderSkills = () => {
    const { categoriesArr = [], profileData } = this.props.profile;
    const { profileImageUrl = "", isCreator } = profileData;

    // let type = this.props.navigation.getParam("type");

    return (
      <View style={{ marginTop: RFValue(24, 844) }}>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: RFValue(16, 844),
            color: COLORS.primaryTeal500,
          }}
        >
          Categories
        </Text>
        {/* <View><Text>{JSON.stringify(profileData)}</Text></View> */}

        <EditPlus
          onPress={this.handleCategoryEdit}
          error={this.state.categoryError}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {categoriesArr.map((key, index) => {
            return (
              <View
                style={{
                  marginRight: RFValue(16, 844),
                  marginVertical: RFValue(16, 844),
                  backgroundColor: COLORS.monoGhost500,
                  borderRadius: RFValue(12, 844),
                  padding: RFValue(12, 844),
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: RFValue(14, 844),
                    color: COLORS.monoBlack700,
                  }}
                >
                  {key.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  renderBio = () => {
    return (
      <TextInputWithText
        multiline={true}
        text="About Me"
        value={this.state.bio}
        height="big"
        onChangeText={(text) => {
          this.setState({ bio: text });
          if (text !== "") {
            this.setState({ bioError: false });
          }
        }}
        error={this.state.bioError}
      />
    );
  };
  renderGenre = () => {
    const { genreArr = [], profileData = {} } = this.props.profile;
    return (
      <View style={{ marginTop: RFValue(24, 844) }}>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: RFValue(16, 844),
            color: COLORS.primaryTeal500,
          }}
        >
          Tags
        </Text>
        <EditPlus
          onPress={() => {
            Analytics.logEvent("screen_view", {
              firebase_screen: "EditTags",
              userId: profileData?.id,
              displayName: profileData?.displayName,
              isCreator: profileData?.isCreator,
            });
            this.props.navigation.navigate("EditTags", {
              genres: [],
            });
          }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {genreArr.map((key, index) => {
            return (
              <View
                style={{
                  marginTop: RFValue(16, 844),
                  // marginLeft: RFValue(16, 844),
                  marginRight: RFValue(16, 844),

                  backgroundColor: COLORS.monoGhost500,
                  borderRadius: RFValue(12, 844),
                  padding: RFValue(12, 844),
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: RFValue(14, 844),
                    color: COLORS.monoBlack700,
                  }}
                >
                  {key.tag}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  commingSoonText = () => {
    return (
      <View style={Styles.comingSoonLayout}>
        <Text style={Styles.comingSoonText}>Coming Soon</Text>
      </View>
    );
  };
  renderPricing = () => {
    const { projectDetails } = this.props.edit;
    return (
      <View style={{ marginTop: RFValue(32, 844) }}>
        <View style={Styles.disableLayout}>
          <Text style={Styles.componentText}>Add Services</Text>
          {this.commingSoonText()}
        </View>

        <View style={{ opacity: 0.5 }}>
          <PricingModal />
          {projectDetails &&
            projectDetails.length > 0 &&
            projectDetails.map((item) => (
              <View style={Styles.pricingInput}>
                <Text style={Styles.pricingInputText}>{item?.project}</Text>
                <Text style={Styles.pricingInputText}>{item?.price}</Text>
                <Text style={Styles.pricingInputText}>{item?.unit}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  };
  renderManagingCard = () => {
    return (
      <View style={Styles.managingCardContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={IMAGES.Sample_profile}
            style={Styles.managingCardPic}
          />
          <View style={{ marginLeft: RFValue(12, 844) }}>
            <Text style={Styles.managingCardDisplayName}>Anisha Chauhan</Text>
            <Text style={Styles.managingCardUsername}>@AnishaChauhan</Text>
          </View>
        </View>
        <SvgUri
          svgXmlData={SVGS.RED_DUSTBIN}
          width={RFValue(16, 844)}
          height={RFValue(20, 844)}
        />
      </View>
    );
  };
  renderManagedBy = () => {
    const { profileData } = this.props.profile;
    const { isCreator } = profileData;

    return (
      <View style={Styles.managingWrapper}>
        <Text style={Styles.managingText}>
          {isCreator ? "Managed By" : "Managing"}
        </Text>
        {/* <EditPlus /> */}
        <ComingSoonCard
          image="https://images.unsplash.com/photo-1474403078171-7f199e9d1335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          title="Manage Console"
          line1="Let Managers take the charge"
          line2="Focus on your creativity"
        />
        {/* {this.renderManagingCard()}
        {this.renderManagingCard()} */}
      </View>
    );
  };

  renderCollaborationPitch = () => {
    return (
      <TextInputWithText
        multiline={true}
        text="Collaboration Pitch"
        value={this.state.pitch}
        height="big"
        onChangeText={(text) => {
          this.setState({ pitch: text });
        }}
      />
    );
  };
  getPermissionAsync = async (type) => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        this.pickImage(type);
      }
    }
  };

  pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri, type);
    }
  };

  uploadImage = async (uri, type) => {
    const { userId } = this.state;
    const response = await fetch(uri);
    const blob = await response.blob();
    var storageRef;
    type == "cover"
      ? (storageRef = ref(storage, "cover/" + userId))
      : (storageRef = ref(storage, "profile/" + userId));
    uploadBytes(storageRef, blob)
      .then((response) => {
        this.fetchImage(type);
      })
      .catch((error) => {
        console.log("errorUpload", error.message);
      });
  };

  fetchImage = (type) => {
    const { userId } = this.state;
    var storageRef;
    type == "cover"
      ? (storageRef = ref(storage, "cover/" + userId))
      : (storageRef = ref(storage, "profile/" + userId));
    getDownloadURL(storageRef)
      .then((url) => {
        type == "cover"
          ? this.setState({ cover: url })
          : this.setState({ image: url });
      })
      .catch((error) => {
        console.log("fetch", error);
      });
  };

  selectImage = async (type) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.cancelled) {
        let localUri = result.uri;
        try {
          const fetchResponse = await fetch(localUri);
          // alert('fetchResponse'+ JSON.stringify(fetchResponse));
          const blob = await fetchResponse.blob();
          // let url = URL.createObjectURL(fetchResponse);

          let filename = localUri.split("/").pop();

          // Infer the type of the image
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let form = new FormData();
          form.append("file", {
            name: result.fileName,
            type: result.type,
            uri:
              Platform.OS === "android"
                ? result.uri
                : result.uri.replace("file://", ""),
          });
          const params = {
            id: userId,
            entityId: userId,
            mediaType: "PROFILE",
            backupHeader: `Bearer ${tokenDetail}`,
          };
          // this.props.callImageUploadFile(params, tokenDetail, form)
          const response = await axios({
            method: "POST",
            url: URLS.BASE_URL + URLS.API_UPLOAD_PHOTO,
            data: form,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokenDetail}`,
            },
            params: params,
            transformRequest: (data, error) => {
              return form;
            },
          }).catch((error) => {
            console.log("POST REQ ERROR: ", error);
          });
        } catch (error) {
          alert("ERR: " + error);
        }

        type == "cover"
          ? this.setState({ cover: result.uri })
          : this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    // let type = this.props.navigation.getParam("type");
    const { genreArr = [] } = this.props.profile;
    const { error, errorMsg } = this.props.edit;
    return (
      <View style={Styles.wrapper}>
        <View style={{ paddingHorizontal: RFValue(16, 844) }}>
          {this.renderHeader()}
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={"never"}
          keyboardShouldPersistTaps="never"
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {this.renderProfilePicture()}
            {this.renderCoverPicture()}
          </View>
          {error && (
            <SnackBar
              visible={error}
              text={errorMsg}
              onDismiss={() => {
                this.props.callReset();
              }}
            />
          )}
          <View style={Styles.editContainer}>
            {this.renderUsername()}
            {this.renderDisplayName()}
            {this.renderSkills()}

            {this.renderBio()}
            <View>{this.renderGenre()}</View>
            <View style={Styles.dividerContainer}>
              <View style={Styles.divider}></View>
              <View style={{ width: "27%" }}>
                <Text style={Styles.collaborationText}>Collaboration</Text>
              </View>
            </View>
            {this.renderManagedBy()}

            {this.renderPricing()}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { profile, edit } = state;
  return { profile, edit };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callProfileApi: (userId, tokenDetail) => {
      dispatch({ type: profileTypes.GET_PROFILE_DATA, userId, tokenDetail });
    },
    callImageUploadFile: (params, tokenDetail, form) => {
      dispatch({
        type: updateUser.UPDATE_USER_PHOTO,
        params,
        tokenDetail,
        form,
      });
    },
    callEditUserApi: (userId, requestBody, tokenDetail) => {
      dispatch({
        type: updateUser.UPDATE_USER,
        userId,
        requestBody,
        tokenDetail,
      });
    },
    callElasticApi: (userId, requestBody, tokenDetail) => {
      dispatch({
        type: updateUser.UPDATE_USER_ELASTIC,
        userId,
        requestBody,
        tokenDetail,
      });
    },
    callReset: () => {
      dispatch({
        type: updateUser.RESET_EDIT_REDUCER,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
