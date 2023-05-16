import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Styles from "./Style";
import IdentityBox from "../../../components/multicellular/identity/identityBox";
import { SignupTypes } from "../../../reducers/auth/signup";
import { connect, useSelector } from "react-redux";
import COLORS from "../../../themes/colors";
import SVGS from "../../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import AuthHeader from "../../../components/multicellular/auth/header";
import NextButton from "../../../components/multicellular/general/nextButton";
import * as Analytics from "expo-firebase-analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
function Identity(props) {
  const { identity, signup } = useSelector((state) => state);
  const { loginAccessToken, userId, username } = signup;
  const [userIdentity, setUserIdentity] = useState();
  const { isSuccessfull, loading } = identity;
  const [isCreator, setIsCreator] = useState(true);

  const handleClick = async () => {
    const displayName = await AsyncStorage.getItem(
      STORAGE_KEY.USER_DISPLAY_NAME
    );
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const isCreatorBool = isCreator == 1 ? true : false;
    Analytics.logEvent("onboard_identity", {
      contentType: "identity",
      userId: userId,
      displayName: displayName,
      isCreator: isCreatorBool,
    });
    props.navigation.navigate("UserCategory", {
      identity: userIdentity,
    });
  };
  useEffect(() => {
    props.resetLoggedIn();
  }, []);
  const height = Dimensions.get("window").height;
  return (
    <View style={Styles.wrapper}>
      <View>
        <AuthHeader
          title="Profession"
          subtitle="Choose your Persona"
          description="Create the best Optimised experience for you"
        />
        <View style={{ marginHorizontal: RFValue(-20, 844) }}>
          <IdentityBox
            active={userIdentity === 1 ? true : false}
            title="Creator - Creative Professional"
            loading={loading && isCreator}
            onPress={loading && !isCreator ? null : () => setUserIdentity(1)}
            bgColor={COLORS.primaryTeal400}
            svg={SVGS.CREATOR}
          />

          <IdentityBox
            title="Brand - Agency - Others"
            active={userIdentity == 2 ? true : false}
            loading={loading && !isCreator}
            onPress={loading && !isCreator ? null : () => setUserIdentity(2)}
            bgColor="#FF9068"
            svg={SVGS.BRAND}
          />
        </View>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          width: "40%",
        }}
      >
        <NextButton
          disabled={userIdentity ? false : true}
          opacity={userIdentity ? 1 : 0.7}
          onPress={handleClick}
        />
      </View>
    </View>
  );
}
const mapStateToProps = (state) => {
  const { identity } = state;
  return identity;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetLoggedIn: () => {
      dispatch({ type: SignupTypes.RESET_ISLOGGED_IN });
    },
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withNavigation(Identity));

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
