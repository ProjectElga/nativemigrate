import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { connect, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { makePostApiCallV2 } from "../../../api";
import { linkingStep } from "../../../config/AuthPageInfo";
import STORAGE_KEY from "../../../constants/StorageKeys";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import Styles from "./Styles";
import { profileTypes } from "../../../reducers/profile/profile";

WebBrowser.maybeCompleteAuthSession();

function Header(props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPressBack}>
        <View style={Styles.flexBox}>
          <Icon
            name="chevron-back-outline"
            size={18}
            color={COLORS.monoBlack900}
          />
          <View>
            <Text style={Styles.pageTitle}>{props.pageTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function Footer(props) {
  return (
    <View>
      <View>
        <Text style={Styles.heading}>Step {props.step + 1} :</Text>
        <Text style={[Styles.textBig]}>{props.question}</Text>
      </View>
      <View style={Styles.footerWrapper}>
        <TouchableOpacity
          style={Styles.rejectBtn}
          onPress={props.onPressReject}
        >
          <View>
            <Text style={Styles.rejectBtnText}>No</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.acceptBtn}
          onPress={props.onPressAccept}
        >
          <View>
            {props.loader ? (
              <Text style={Styles.acceptBtnText}>{"Loading ..."}</Text>
            ) : (
              <Text style={Styles.acceptBtnText}>
                {props.acceptBtnText || "Yes"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RejectModal(props) {
  const { modal, onClose } = props;
  return (
    <Modal visible={modal} transparent={true} animationType="fade">
      <View style={Styles.modalWrapper}>
        <View style={Styles.modal}>
          <View style={Styles.box}>
            <Text
              style={Styles.modalTextDetail}
            >{`Refer to the Instructions, \nMake the necessary Changes`}</Text>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={onClose} style={Styles.modalBtn}>
              <View>
                <Text style={Styles.modalBtnText}>Okay</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Details(props) {
  return (
    <ScrollView
      style={Styles.detailsWrapper}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      horizontal={false}
    >
      <View style={Styles.detailsWrapper}>
        <View style={Styles.detailsHeader}>
          <Image
            source={IMAGES.FaceBookInstagram}
            style={Styles.socialMediaLogo}
            resizeMode="contain"
          />
          <Text style={[Styles.text, Styles.detailHeaderText]}>
            Instagram Linking happens through Facebook
          </Text>
        </View>
        <View style={Styles.detailsBody}>
          <Text style={[Styles.text]}>{props.title}</Text>
          <View style={Styles.linkingGifWrapper}>
            <Image
              source={{
                uri: props.image,
              }}
              style={Styles.linkingGif}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
function InstagramLink(props) {
  const navigate = useNavigation();
  const [step, setStep] = useState(0);
  const [loader, setLoader] = useState();
  const [isVisibleReject, setIsVisibleReject] = useState(false);
  const [user, setUser] = useState("");
  const profile = useSelector((state) => state.profile);
  const handleModal = useCallback(() => {
    setIsVisibleReject(!isVisibleReject);
  }, [isVisibleReject]);

  const apiIntegrationLink = async (accessToken, platform, userId) => {
    const {
      profileData: { socialInsights: { youtubeInsight = {} } = {} } = {},
    } = profile;
    setLoader(true);
    let body = {
      userId: userId,
      platform: platform,
      accessToken: accessToken,
    };
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const response = await makePostApiCallV2(
      "/elga-roma/social/link",
      body,
      tokenDetail
    );
    if (response?.status) {
      setLoader(false);
      navigate.navigate("Social", {
        userId: userId,
        tokenDetail: tokenDetail,
        type: "link",
        insta: true,
        youtube: youtubeInsight?.id !== null,
        instaLinkedSuccess:true
      });
    }
    setLoader(false);
  };

  const signInWithFB = async () => {
    // Attempt login with permissions
    // LoginManager.setLoginBehavior('NATIVE_WITH_FALLBACK');
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      "read_insights",
      "pages_show_list",
      "instagram_basic",
      "instagram_manage_insights",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }
    const auth = getAuth();

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(
      data.accessToken
    );
    // Sign-in with credential from the Facebook user.
    signInWithCredential(auth, facebookAuthProvider)
      .then(() => {
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.]
        console.log(error);
      });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    apiIntegrationLink(facebookAuthProvider.accessToken, "INSTAGRAM", userId);
  };
  const handleStep = useCallback(() => {
    if (step < 1) {
      setStep(step + 1);
    }
    if (step === 1) {
      signInWithFB();
      // alert("called")
    }
  }, [step]);
  return (
    <SafeAreaView style={Styles.wrapper}>
      <Header
        onPressBack={
          step === 1 ? () => setStep(step - 1) : () => navigate.goBack()
        }
        pageTitle={"Instagram Linking"}
      />
      <Details
        title={linkingStep[step]?.title}
        image={linkingStep[step].image}
      />
      <Footer
        onPressAccept={handleStep}
        step={step}
        question={linkingStep[step].question}
        loader={loader}
        onPressReject={handleModal}
      />
      <RejectModal modal={isVisibleReject} onClose={handleModal} />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callProfileApi: (userId, tokenDetail, entityId) => {
      dispatch({
        type: profileTypes.GET_PROFILE_DATA,
        userId,
        tokenDetail,
        entityId,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InstagramLink);
