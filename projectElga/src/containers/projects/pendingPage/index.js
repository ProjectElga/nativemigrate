import SvgUri from "expo-svg-uri";
import { connect } from "react-redux";
import moment from "moment";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  TextInput,
} from "react-native";

import SVGS from "../../../constants/SvgUri";
import SCREENSIZE from "../../../constants/ScreenSize";
import ENUM from "../../../constants/Enum";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../themes/Images";
import { Icon } from "react-native-elements";
import ProfileButton from "../../../components/multicellular/profile/button/profileButton";
import styles from "./Style";

import { projectDetailTypes } from "../../../reducers/projects/projectDetail";

import PendingLoader from "../pendingLoader";
import { citationTypes } from "../../../reducers/profile/citations";
import CitationCard from "../../../components/multicellular/profile/citationCard/citationCard";
import Skeleton from "../../../components/multicellular/general/skeleton/skeleton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import { projectActionTypes } from "../../../reducers/projects/projectAction";
import PushNotification from "../../../components/multicellular/notification";
import decodeToken from "../../../utils/decodeToken";
class PendingPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      budget: "",
      recieverName: "",
      description: "",
      isPending: false,
      comment: "",
    };
  }

  getCurrentDate = (date) => {
    return moment(date).format("Do MMM, YYYY");
  };
  fetchParticipantsImage = (array) => {
    const text = array
      .map(function (elem, index) {
        if (index === 0) {
          return elem.profileImageUrl;
        }
      })
      .join("");
    return text;
  };
  async componentWillReceiveProps(nextProps, nextState) {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const { isAcceptSuccess, acceptData = [] } = nextProps.projectAction;
    const { isAdddedSuccess } = nextProps.citation;
    const {
      projectDetailData: { participants = [], name = "" },
    } = nextProps.projectDetail;
    const { profileData = {} } = nextProps.profile;
    if (isAdddedSuccess) {
      this.setState({ comment: "" });
      const fetchToken = participants[0]?.expoToken;
      fetchToken?.map((item) => {
        const token = decodeToken(item);
        PushNotification(
          token,
          `Follow Up`,
          `${profileData?.displayName} is following up on project ${name}`
        );
      });
      this.props.resetAddCitation();
    }
    if (isAcceptSuccess) {
      const expoToken = decodeToken(acceptData);
      PushNotification(
        expoToken,
        `Project Request Accepted`,
        `${profileData?.displayName} joined ${name}. Greet them with a Hi!!`
      );
      this.props.navigation.goBack(null);
      this.props.callAcceptProjectResetReducer();
    }
  }
  fetchParticipantsSingle = (array, createdById) => {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { sentSection } = params;
    if (sentSection === ENUM.SENT) {
      const text = array
        .map(function (elem, index) {
          if (index === 0) {
            return elem.displayName;
          }
        })
        .join("");
      return text;
    }
    let indexOfUser = array.findIndex((x) => x.id === createdById);
    const text = array
      .map(function (elem, index) {
        if (index === indexOfUser) {
          return elem.displayName;
        }
      })
      .join("");
    return text;
  };
  fetchParticipantsId = (array) => {
    const text = array
      .map(function (elem, index) {
        if (index === 0) {
          return elem.id;
        }
      })
      .join(",");
    return text;
  };
  renderFile = () => {
    return (
      <View style={styles.fileCard}>
        <Image source={IMAGES.bg1} style={styles.fileImage} />
        <View style={styles.fileTextContainer}>
          <Text style={styles.fileNameText}>File_name_47.jpg</Text>
          <Text style={styles.fileSizeText}>2,000 KB</Text>
        </View>
        <View style={{ padding: RFValue(12, 844) }}>
          <Icon
            color={COLORS.monoBlack500}
            name="arrow-down"
            type="feather"
            size={16}
          />
        </View>
      </View>
    );
  };
  async componentDidMount() {
    const {
      citation: { citationData = [], loading },
    } = this.props;
    const { route = {}, navigation } = this.props;
    const { params = {} } = route;
    const {
      title,
      budget,
      description,
      id,
      isPending,
      sentSection,
      recieverId,
      recieverName
    } = params;
    // const title = this.props.navigation.getParam("title");
    // const budget = this.props.navigation.getParam("budget");
    // const description = this.props.navigation.getParam("description");
    const projectId = id;
    // const isPending = this.props.navigation.getParam("isPending");
    // const sentSection = this.props.navigation.getParam("sentSection");
    // const recieverId = this.props.navigation.getParam("recieverId");
    const localId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);

    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    this.props.callprojectDetailApi(
      localId,
      projectId,
      tokenDetail,
      sentSection,
      recieverId
    );
    if (title && budget && description) {
      this.setState({
        title: title,
        budget: budget,
        isPending: isPending,
        description: description,
        recieverName: recieverName,
      });
    } else null;
  }
  handleSubmitComment = async () => {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { id, } = params;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const {
      projectDetailData: { participants = [] },
    } = this.props.projectDetail;
    const comment = this.state.comment;
    const recieverId = this.fetchParticipantsId(participants);
    const requestParam = {
      id: recieverId,
      commentType: "COLLABORATION",
    };
    const requestBody = {
      comment: comment,
      entityId: id,
    };

    this.props.addCitationApi(requestParam, requestBody, tokenDetail);
  };

  renderCitations = () => {
    const {
      citation: { citationData = [], loading },
    } = this.props;
    return loading ? (
      <View style={styles.citationWrapper}>
        <View style={styles.skeletonCitationWrapper}>
          <View>
            <Skeleton styles={styles.skeletonCitationImage} />
          </View>
          <View style={styles.skeletonWrapper}>
            <Skeleton styles={[styles.skeletonPicCard, { width: "50%" }]} />
            <Skeleton styles={[styles.skeletonPicCard, { width: "90%" }]} />
          </View>
        </View>
      </View>
    ) : citationData && citationData.length > 0 ? (
      <View style={styles.citationWrapper}>
        <Text
          style={{
            color: COLORS.monoBlack900,
            fontFamily: "Poppins_600SemiBold",
            fontSize: RFValue(16, 844),
            marginTop: RFValue(24, 844),
          }}
        >
          Messages
        </Text>
        {citationData.map((value, index) => (
          <View style={{ width: "100%" }} key={index}
          >
            <CitationCard
              disabled={false}
              image={value.userImageUrl}
              userName={value.displayName}
              previewComment={value.comment}
              fullComment={value.comment}
              data={value}
              isComment
            />
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1.5,
                borderBottomColor: COLORS.monoGhost500,
                //,
              }}
            ></View>
          </View>
        ))}
      </View>
    ) : null;
  };
  renderHeader = () => {
    const {
      projectDetailData: { name = "" },
    } = this.props.projectDetail;
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Project Details</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        >
          <View
            style={{
              width: RFValue(40, 844),
              height: RFValue(40, 844),
              borderRadius: RFValue(20, 844),
              borderWidth: 1,
              borderColor: COLORS.monoChromeBlack,
              alignItems: "center",
              justifyContent: "center",
              marginRight: RFValue(24, 844),
            }}
          >
            <SvgUri
              width={20}
              height={20}
              svgXmlData={SVGS.GREYCLOSE}
              onPress
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  renderNameDateCategory = () => {
    const {
      projectDetailData: {
        priceDetails = {},
        type = "",
        sentOn = "",
        participants = [],
        createdById = "",
        name = "",
      },
    } = this.props.projectDetail;

    const { isPending } = this.state;
    return (
      <>
        <View style={styles.dateCategoryContainer}>
          <Text
            style={{
              fontSize: RFValue(16, 844),
              fontFamily: "Poppins_500Medium",
              color: COLORS.monoBlack900,
            }}
          >
            {name}
          </Text>
        </View>

        <View style={[styles.dateCategoryContainer, { marginTop: 4 }]}>
          <View style={styles.category1}>
            <Text style={styles.category1Text}>
              {priceDetails?.entityType?.toLowerCase()}
            </Text>
          </View>
          <View style={styles.category2}>
            <Text style={styles.category2Text}>{type ? type?.toLowerCase() === "collaboration" ? "Project" : type?.toLowerCase() :type?.toLowerCase()}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <Image
            source={{
              uri: isPending
                ? sender?.profileImageUrl
                : this.fetchParticipantsImage(participants),
            }}
            style={styles.smallImage}
          />
          <Text style={styles.profileName}>
            {`${this.fetchParticipantsSingle(
              participants,
              createdById
            )} | ${this.getCurrentDate(sentOn)}`}
          </Text>
        </View>
      </>
    );
  };
  renderDescription = () => {
    const {
      projectDetailData: { description = "" },
    } = this.props.projectDetail;

    return (
      <View style={{ marginTop: RFValue(16, 844) }}>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  };
  renderBudget = () => {
    const {
      projectDetailData: {
        priceDetails: { details = "", entityType = "" } = {},
      },
    } = this.props.projectDetail;
    if (details) {
      return (
        <View style={styles.projectDetailContainer}>
          <Text style={styles.budgetText}>Budget: {details}</Text>
          {/* <Text style={styles.budget}></Text> */}
        </View>
      );
    } else null;
  };
  renderFiles = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.fileScroll}
      >
        <View style={fileContainer}>
          {this.renderFile()}
          {this.renderFile()}
          {this.renderFile()}
        </View>
      </ScrollView>
    );
  };
  renderChatDate = () => {
    return (
      <View style={styles.dateContainer}>
        <View style={styles.divider}></View>
        <Text style={styles.date}>08-09-2021 | 08:02 PM</Text>
      </View>
    );
  };
  renderChat = () => {
    return (
      <View style={{ flexDirection: "row", marginTop: RFValue(28, 844) }}>
        <Image
          source={IMAGES.Sample_profile}
          style={{ width: RFValue(32, 844), height: RFValue(32, 844) }}
        />
        <View style={{ marginLeft: RFValue(12, 844) }}>
          <Text style={styles.nameText}>Bhagat Krishna</Text>
          <Text style={styles.msgText}>
            Hi, Kindly accept the deliverables attached
          </Text>
        </View>
      </View>
    );
  };
  fetchParticipantsSingleId = (array) => {
    const text = array
      ?.map(function (elem, index) {
        if (index === 0) {
          return elem.id;
        }
      })
      .join(",");
    return text;
  };
  handleAcceptButton = async () => {
    const {
      profile: { profileData = {} },
    } = this.props;
    Analytics.logEvent(`Pending_Accept`, {
      contentType: "Pending",
      userId: profileData?.id,
      displayName: profileData?.displayName,
      isCreator: profileData?.isCreator,
    });
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { data, } = params;
    const value = data;

    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    this.props.callApitoAcceptProject(
      userId,
      tokenDetail,
      this.fetchParticipantsSingleId(value.participants),
      value.id
    );
  };
  handleRejectButton = async () => {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { data, } = params;
    const value = data;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.callApitoRejectProject(
      userId,
      tokenDetail,
      this.fetchParticipantsSingleId(value.participants),
      value.id,
      true
    );
  };
  renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <ProfileButton
          height={RFValue(50, 844)}
          bg={COLORS.monoBlack900}
          text="Accept"
          textColor={COLORS.monoWhite900}
          width="48%"
          onPress={() => this.handleAcceptButton()}
        //children={<SvgUri width="16" height="26" svgXmlData={SVGS.PAGE} />}
        //isIcon
        />
        <ProfileButton
          bg={COLORS.monoGhost500}
          text="Decline"
          textColor={COLORS.monoBlack500}
          width="48%"
          height={RFValue(50, 844)}
          onPress={() => {
            Analytics.logEvent(`Pending_Decline`, {
              contentType: "Pending",
              userId: profileData?.id,
              displayName: profileData?.displayName,
              isCreator: profileData?.isCreator,
            });
            // this.props.navigation.navigate("CollabRequest");
          }}
        //isIcon
        //children={<SvgUri width="16" height="26" svgXmlData={SVGS.EDIT} />}
        />
      </View>
    );
  };
  userCard = (value) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: RFValue(20, 844),
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: RFValue(48, 844),
              height: RFValue(48, 844),
              borderRadius: RFValue(24, 844),
            }}
          >
            <Image
              source={{ uri: value?.profileImageUrl }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: RFValue(24, 844),
              }}
            />
          </View>
          <View style={{ marginLeft: RFValue(24, 844) }}>
            <Text
              style={{
                color: COLORS.monoBlack900,
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
              }}
            >
              {value?.displayName}
            </Text>
            <Text
              style={{
                color: COLORS.monoBlack500,
                fontFamily: "Poppins_500Medium",
                fontSize: RFValue(14, 844),
              }}
            >
              @{value?.userName}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  renderChatBox = () => {
    const {
      citation: { citationData = [], loading },
    } = this.props;
    return citationData?.length > 2 ? (
      <View style={styles.chatFooter} />
    ) : (
      <View style={styles.bottomotherSubView}>
        {/* <TouchableOpacity
          onPress={() => {
            null;
          }}
        >
          <Image source={IMAGES.plusBtn} style={styles.plusBtn} />
        </TouchableOpacity> */}
        <TextInput
          textAlignVertical="center"
          value={this.state.comment}
          onChangeText={(val) => this.setState({ comment: val })}
          placeholder="Type your message here"
          style={styles.msgInput}
          multiline={true}
        />
        <TouchableOpacity
          disabled={this.state.comment ? false : true}
          style={styles.sendBtn}
          onPress={this.handleSubmitComment}
        >
            <View style={styles.sendBtnImg}>
                  <SvgUri svgXmlData={SVGS.WHITE_SEND} />
                </View>
          {/* <Image
            source={require("../../../assets/images/images/send.png")}
            style={styles.sendBtnImg}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { identity } = params;
    const { projectDetailData = {}, loading } = this.props.projectDetail;
    const {
      projectDetailData: {
        sender = {},
        priceDetails = {},
        type = "",
        sentOn = "",
        participants = [],
      },
    } = this.props.projectDetail;
    const { isPending } = this.state;
    if (loading) {
      return <PendingLoader />;
    } else {
      return (
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            backgroundColor: COLORS.monoWhite900,

            paddingTop: RFValue(48, 844),
          }}
        >
          {this.renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            style={{ height: "70%", paddingHorizontal: RFValue(24, 844) }}
          >
            <View style={styles.wrapper}>
              <View
                style={{ flexDirection: "row", marginTop: RFValue(12, 844) }}
              >
                <View
                  style={{
                    //marginLeft: RFValue(16, 844),
                    width: "80%",
                  }}
                >
                  {this.renderNameDateCategory()}
                </View>
              </View>
              {this.renderDescription()}

              <View style={{ marginTop: RFValue(16, 844) }}>
                {this.renderBudget()}
                {/* <View
                  style={{
                    width: "100%",
                    borderColor: COLORS.monoGhost500,
                    borderWidth: 1,
                    marginTop: RFValue(24, 844),
                  }}
                ></View> */}
                {/* <View style={{ marginTop: RFValue(24, 844) }}>
                  <Text
                    style={{
                      color: COLORS.monoBlack900,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: RFValue(16, 844),
                    }}
                  >
                    {projectDetailData?.participants?.length} Participants
                  </Text>

                  <View>
                    {/* {this.userCard(projectDetailData?.loggedUser)} */}
                {/* {projectDetailData?.participants?.map((value, index) => {
                      return this.userCard(value);
                    })} */}
                {/* </View>
                </View> */}
                {/* {this.renderFiles()} */}
                {/* {this.renderChat()} */}

                {this.renderCitations()}
              </View>
            </View>
          </ScrollView>
          {identity == 1 ? this.renderButtons() : this.renderChatBox()}
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => {
  const { projectDetail, citation, projectAction, profile } = state;
  return { projectDetail, citation, projectAction, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callprojectDetailApi: (
      id,
      projectId,
      tokenDetail,
      sentSection,
      recieverId
    ) => {
      dispatch({
        type: projectDetailTypes.GET_PROJECT_DETAIL_LIST,
        id,
        projectId,
        tokenDetail,
        sentSection,
        recieverId,
      });
    },
    callApitoAcceptProject: (userId, tokenDetail, senderUserId, projectId) => {
      dispatch({
        type: projectActionTypes.ACCEPT_PROJECT,
        userId,
        tokenDetail,
        senderUserId,
        projectId,
      });
    },
    callApitoRejectProject: (
      userId,
      tokenDetail,
      senderUserId,
      projectId,
      isReject
    ) => {
      dispatch({
        type: projectActionTypes.ACCEPT_PROJECT,
        userId,
        tokenDetail,
        senderUserId,
        projectId,
        isReject,
      });
    },
    callAcceptProjectResetReducer: () => {
      dispatch({ type: projectActionTypes.RESET_ACCEPT_PROJECT });
    },
    resetAddCitation: () => {
      dispatch({ type: citationTypes.RESET_ADD_CITATION });
    },
    addCitationApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: citationTypes.ADD_CITATION,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingPage);
