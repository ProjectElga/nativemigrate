import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../../../components/multicellular/discover/header";
import COLORS from "../../../themes/colors";
import IMAGES from "../../../themes/Images";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import { withNavigationFocus } from "react-navigation";
import STRINGS from "../../../constants/Strings";
import { createCollab } from "../../../reducers/actionButton/collab";
import NothingHere from "../../../components/multicellular/general/nothingHere/nothingHere";

class Collaborates extends Component {
  constructor() {
    super();
  }
  componentDidMount = async () => {
    const { route } = this.props;
    const { params = {} } = route;
    const { userId } = params;
    const localUserId = userId
      ? userId
      : await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let reqparams = {
      id: localUserId,
    };
    this.props.callCollabApi(reqparams, tokenDetail);
  };
  handleSplitText = (text) => {
    if (text?.length > 35) {
      return text.substring(0, 35) + "...";
    } else {
      return text;
    }
  };
  renderFile = (data) => {
    const { subCategoryNames = [] } = data;
    return (
      <View style={Styles.fileCard}>
        <Image
          source={{ uri: data?.profileImageUrl }}
          style={[
            Styles.fileImage,
            {
              borderTopLeftRadius: RFValue(16, 844),
              borderBottomLeftRadius: RFValue(16, 844),
            },
          ]}
        />
        <View style={Styles.fileTextContainer}>
          <Text style={Styles.fileNameText}>{data?.displayName}</Text>
          {subCategoryNames && subCategoryNames?.length > 0 ?
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {subCategoryNames?.map((key, index) => {
                return (
                  <View>
                    {index < 2 ? (
                      <Text
                        style={[
                          Styles.userNameText,
                        ]}
                      >
                        {key.name}
                        {index <= subCategoryNames.length - 2 ? ", " : " "}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
              {subCategoryNames.length > 2 ? (
                <Text
                  style={[
                    Styles.userNameText,
                    { color: COLORS.primaryTeal500 },
                  ]}
                >
                  +{subCategoryNames.length - 1}
                </Text>
              ) : null}
            </View> : null}
          <Text style={Styles.fileSizeText}>{this.handleSplitText(data?.bio)}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {
      collab: { collabData = {} },
    } = this.props;
    return (
      <View
        style={{
          paddingHorizontal: RFValue(16, 844),
          paddingTop: RFValue(48, 844),
          backgroundColor: COLORS.monoWhite900,
          height: "100%",
        }}
      >
        <Header
          isDetail={true}
          pageTitle={"Collaborators"}
          onPressBack={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={{ marginTop: 8 }}>
          {collabData &&
            collabData.length > 0 &&
            collabData.map((key, index) => {
              return (
                <View>
                  {this.renderFile(key)}
                </View>
              );
            }) ||
            <NothingHere
              text="Nothing Here! Comeback later 👋"
              image={IMAGES.NoPending}
              height={300}
            />
          }
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { collab } = state;
  return { collab };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callCollabApi: (params, tokenDetail) => {
      dispatch({
        type: createCollab.GET_COLLAB,
        params,
        tokenDetail,
      });
    },
  };
};
const Styles = StyleSheet.create({
  fileContainer: {
    flexDirection: "row",
    marginTop: RFValue(24, 844),
    paddingRight: RFValue(8, 844),
    paddingLeft: RFValue(24, 844),
  },
  userNameText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack500,
  },
  fileCard: {
    width: "100%",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginRight: RFValue(16, 844),
    height: RFValue(94, 844),
    marginTop: RFValue(12, 844),
  },
  fileImage: { width: undefined, height: RFValue(94, 844), aspectRatio: 1 / 1 },
  fileNameText: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
  },
  fileTextContainer: {
    marginLeft: RFValue(16, 844),
    paddingVertical: RFValue(8, 844),
    // justifyContent: "space-evenly",
  },
  fileSizeText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoBlack700,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((Collaborates));
