import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import BottomNavBar from "../../../components/multicellular/general/bottomNavBar/bottomNavBar";
import IMAGES from "../../../themes/Images";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import STRINGS from "../../../constants/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { createCollab } from "../../../reducers/actionButton/collab";
import STORAGE_KEY from "../../../constants/StorageKeys";

class SuccessPage extends Component {
  async componentDidMount() {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    this.props.resetReducer();
    const { route } = this.props;
    const { navScreen, title, budget, description, recieverName, image, message } = route.params;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.props.navigation.navigate(
        navScreen,
        {
          isTpp: false,
          userId: userId,
          tokenDetail: tokenDetail,
          title: title,
          budget: budget,
          description: description,
          recieverName: recieverName,
        }
      );
    }, 2000);
  }

  render() {
    const { image, message } = route.params;
    return (
      <BottomSheetModalProvider>
        <View>
          <View
            style={{
              height: SCREENSIZE.ScreenHeightViewPort,
              backgroundColor: COLORS.monoWhite900,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={IMAGES.confetti}
              style={{ width: "80%", height: "70%" }}
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={image}
                style={{ width: "80%", height: "30%", resizeMode: "contain" }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: RFValue(20, 844),
                color: COLORS.primaryTeal500,
              }}
            >
              {message}
            </Text>
          </View>
          <BottomNavBar />
        </View>
      </BottomSheetModalProvider>
    );
  }
}
const mapStateToProps = (state) => {
  const { collab } = state;
  return { collab };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetReducer: () => {
      dispatch({ type: createCollab.RESET_COLLAB });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);
