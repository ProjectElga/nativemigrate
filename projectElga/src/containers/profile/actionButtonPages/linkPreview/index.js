import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
import ProfileHeader from "../../../../components/multicellular/profile/header/header";
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import Styles from "./Style";
import SaveButtons from "../../../../components/multicellular/profile/saveButton/saveButtons";
import { RFValue } from "react-native-responsive-fontsize";

import InputBox from "../../../../components/multicellular/profile/actionButtonInput/InputFieldLink";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProfileButton from "../../../../components/multicellular/profile/button/profileButton";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import LinkCard from "../../../../components/multicellular/profile/linkCard";
import { validate } from "../../brandProfile/Validation";
import SVGS from "../../../../constants/SvgUri";
import SvgUri from "expo-svg-uri";
import { linksTypes } from "../../../../reducers/profile/addLinks";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);

class LinkPreview extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      linkDescription: "",
      url: "",
      errors: "",
      isPreview: false,
      previewLinkObj: {},
    };
  }
  async componentWillReceiveProps(nextProps, nextState) {
    const { isAdddedSuccess, isDeleteSuccess } = nextProps.addLinks;
    const { profileData } = nextProps.profile;
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (isAdddedSuccess) {
      this.setState({
        title: "",
        linkDescription: "",
        url: "",
        errors: "",
        isPreview: false,
        previewLinkObj: {},
      });
      this.props.getLinksApi(userId, tokenDetail);
      this.props.navigation.navigate("Explore", {
        activeTab: "Links",
      });
    }
  }
  refreshIconClick = () => {
    this.setState({
      title: "",
      linkDescription: "",
      url: "",
      errors: "",
      isPreview: false,
      previewLinkObj: {},
    });
  };
  renderPostPreview = () => {
    const { previewLinkObj } = this.state;
    return (
      <View>
        <LinkCard
          isPreviewLink={true}
          isHideTopBar={true}
          data={previewLinkObj}
        />
      </View>
    );
  };
  isValidate = () => {
    let errors = "";
    errors = validate(
      this.state.title,
      this.state.linkDescription,
      this.state.url
    );
    if (errors !== "") {
      this.setState({ errors: errors });
      return false;
    }

    return true;
  };
  handleSubmit = async (url) => {
    const res = await fetch(url);

    const html = await res.text();

    const $ = cheerio.load(html);
    const extract = {
      url,
      title: $("title").first().text(),
      favicon:
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="icon"]').attr("href"),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      video:
        $('meta[property="og:video"]').attr("content") ||
        $('meta[property="og:video:url"]').attr("content"),
    };
    return extract;
  };
  handleAddLinks = async () => {
    const { url } = this.state;

    const isValid = this.isValidate();

    if (isValid) {
      const extractedValues = await this.handleSubmit(url);

      if (Object.keys(extractedValues).length === 0) {
        errors = "Unable to fetch the details from link!!";
        this.setState({ errors: errors });
      } else {
        const { title, linkDescription } = this.state;
        const { profileData: { displayName } = {} } = this.props.profile;
        const requestBody = {
          author: await AsyncStorage.getItem(STORAGE_KEY.USERNAME),
          title: extractedValues?.title,
          customTitle: title,
          description: extractedValues?.description,
          customDescription: linkDescription,
          favIcon: extractedValues?.favicon,
          imageUrl: extractedValues?.image,
          contentUrl: url,
          websiteName: url,
          author: displayName,
        };
        this.setState({ previewLinkObj: requestBody, isPreview: true });
      }
    }
  };
  handlePostLinks = async () => {
    const { url } = this.state;
    const isValid = this.isValidate();
    if (isValid) {
      this.setState({ linkingLoader: true });
      const extractedValues = await this.handleSubmit(url);
      if (Object.keys(extractedValues).length === 0) {
        errors = "Unable to fetch the details from link!!";
        this.setState({ errors: errors });
        this.setState({ linkingLoader: false });
      } else {
        const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
        const tokenDetail = await AsyncStorage.getItem(
          STORAGE_KEY.ACCESS_TOKEN
        );
        const { title, linkDescription } = this.state;

        const requestBody = {
          author: await AsyncStorage.getItem(STORAGE_KEY.USERNAME),
          title: extractedValues?.title,
          customTitle: title,
          description: extractedValues?.description,
          customDescription: linkDescription,
          favIcon: extractedValues?.favicon,
          imageUrl: extractedValues?.image,
          contentUrl: url,
          websiteName: url,
        };
        const requestParam = {
          id: userId,
        };

        this.props.addLinksApi(requestParam, requestBody, tokenDetail);
      }
    }
  };
  renderHeader = () => {
    return (
      <ProfileHeader
        text="Post Link"
        showBackIcon={true}
        fontSize={RFValue(24, 844)}
        onBackPress={() => {
          this.props.navigation.goBack(null);
        }}
        rightComponent={() => {
          return (
            <View style={Styles.headerComponentContainer}>
              <TouchableOpacity onPress={this.refreshIconClick}>
                <View style={Styles.refreshIcon}>
                  <SvgUri
                    width={16}
                    height={16}
                    svgXmlData={SVGS.REFRESH_TOKEN}
                    zindex
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  this.state.isPreview
                    ? this.handlePostLinks
                    : this.handleAddLinks
                }
              >
                <View style={Styles.saveButton}>
                  <Text style={Styles.saveTextHeader}>
                    {this.state.isPreview ? "Post" : "Preview"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };
  renderPrePreview = () => {
    return (
      <LinearGradient
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={["#DD5E89", "#F7BB97"]}
        style={Styles.addImageContainer}
      >
        <View>
          <Text style={Styles.saveText}>Preview Link</Text>
        </View>
      </LinearGradient>
    );
  };

  renderDescription = () => {
    return <View>{this.renderLinks()}</View>;
  };
  renderPostLinkCard = () => {
    const { url, title, linkDescription } = this.state;
    return (
      <View
        style={{
          backgroundColor: COLORS.monoWhite900,
          borderRadius: RFValue(16, 844),
        }}
      >
        <View>
          <InputBox
            width={"100%"}
            multiline={false}
            placeholder="Paste the link here (eg: Youtube or Instagram Post)"
            noDivider={true}
            value={url}
            onChangeText={(text) => {
              this.setState({ url: text });
            }}
          />
          {/* <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.monoBrightGray,
              width: "90%",
              alignSelf: "center",
            }}
          ></View>
          <InputBox
            width={"100%"}
            multiline={false}
            placeholder="Enter Title"
            noDivider={true}
            value={title}
            onChangeText={(text) => {
              this.setState({ title: text });
            }}
          /> */}
          <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.monoBrightGray,
              width: "90%",
              alignSelf: "center",
            }}
          ></View>
          <InputBox
            borderRadius={RFValue(16, 844)}
            multiline={true}
            width={"100%"}
            height={RFValue(80, 844)}
            placeholder="Description"
            noDivider={true}
            value={linkDescription}
            onChangeText={(text) => {
              this.setState({
                linkDescription: text,
              });
            }}
          />
        </View>
      </View>
    );
  };
  renderLinks = () => {
    const { linksData, gtLinksloading } = this.props.addLinks;
    return (
      <View
        style={{ marginTop: RFValue(16, 844), marginBottom: RFValue(20, 844) }}
      >
        {this.renderPostLinkCard()}
      </View>
    );
  };
  renderInfo = () => {
    const array = [
      "Copy links of your projects/work/content on other platforms to share it with your creator community",
      "Paste the Link on the 'Paste Link' Section",
      "Share additional Information/thoughts under description section",
    ];

    return (
      <View style={Styles.infoSection}>
        <Text style={Styles.title}>How it Works</Text>
        <View style={Styles.linkingGifWrapper}>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/elga-roma-717ed.appspot.com/o/Assets%2FPost%20Link.gif?alt=media&token=f7ab079b-e82b-4866-9add-035710006206",
            }}
            style={Styles.linkingGif}
            resizeMode="contain"
          />
        </View>
        <View>
          {array.map((item) => {
            return (
              <View style={Styles.detailTextWrapper}>
                <View style={Styles.detailCard}>
                  <Text style={Styles.detailText}>{`\u2022`}</Text>
                </View>
                <View>
                  <Text style={Styles.detailText}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{ backgroundColor: COLORS.monoWhite900, height: "100%" }}>
          <KeyboardAwareScrollView
            style={Styles.wrapper}
            behavior="padding"
            enabled
          >
            <View
              style={{
                paddingRight: RFValue(8, 844),
                paddingLeft: RFValue(16, 844),
              }}
            >
              {this.renderHeader()}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="never"
              showsVerticalScrollIndicator={false}
              overScrollMode="always"
              contentContainerStyle={Styles.bodyWrapper}
            >
              <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                {this.state.isPreview
                  ? this.renderPostPreview()
                  : this.renderPrePreview()}
              </View>
              {this.renderDescription()}
              <View style={{ paddingHorizontal: RFValue(16, 844) }}>
                {this.renderInfo()}
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    signup,
    profile,
    citation,
    saved,
    instagram,
    circle,
    youtube,
    media,
    addLinks,
    collab,
  } = state;
  return {
    signup,
    profile,
    citation,
    saved,
    instagram,
    circle,
    youtube,
    media,
    addLinks,
    collab,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addLinksApi: (requestParam, requestBody, tokenDetail) => {
      dispatch({
        type: linksTypes.ADD_LINKS,
        requestParam,
        requestBody,
        tokenDetail,
      });
    },
    resetaddLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_ADD_LINKS });
    },
    resetdeleteLinksReducer: () => {
      dispatch({ type: linksTypes.RESET_DELETE_LINKS });
    },
    getLinksApi: (userId, tokenDetail) => {
      dispatch({ type: linksTypes.GET_LINKS, userId, tokenDetail });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LinkPreview);
