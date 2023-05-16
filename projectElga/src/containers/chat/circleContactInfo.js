import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import COLORS from "../../themes/colors";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import { circleTypes } from "../../reducers/projects/circle";
import { projectTypes } from "../../reducers/projects/projects";
function CircleInfo(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { contact } = route?.params;
  const circle = useSelector((state) => state.circle);
  const { deleteResponse: { status = false } = {} } = circle;
  const handleDeleteCircleRequest = async (requestUserId, isSent) => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const requestParam = {
      senderUserId: contact[0].id,
      receiverUserId: userId,
    };
    props.deleteCircleApi(requestParam, tokenDetail, isSent);
    props.callprojectApi(userId, tokenDetail, "ONGOING");
    navigation.navigate("Projects");
  }
  const handleSplitText = (text) => {
    if (text?.length > 15) {
      return `${text.substring(0, 15)}...`;
    } else {
      return text;
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: RFValue(20, 844),
        backgroundColor: COLORS.monoWhite900,
        height: "100%",
      }}
    >
      <View
        style={{
          paddingTop: RFValue(64, 844),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: RFValue(24, 844),
            color: COLORS.monoBlack900,
          }}
        >
          User Info
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={Styles.cross}>
            <Icon
              type="feather"
              name="x"
              size={12}
              color={COLORS.monoBlack900}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: RFValue(20, 844), flexDirection: "row" }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate(
            !contact[0].isCreator ? "BrandProfile" : "CreatorProfile",
            {
              selfView: false,
              userId: contact[0].id,
            }
          );
        }}>

          <View
            style={{
              width: RFValue(88, 844),
              height: RFValue(88, 844),
              borderRadius: RFValue(16, 844),
            }}
          >
            <Image
              source={{ uri: contact[0]?.profileImageUrl }}
              style={{ width: "100%", height: "100%", borderRadius: RFValue(16, 844), }}
            />
          </View>
        </TouchableOpacity>

        <View style={{ height: RFValue(88, 844), justifyContent: "center" }}>
          <Text
            style={{
              marginLeft: RFValue(16, 844),
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(20, 844),
              color: COLORS.monoBlack900,
            }}
          >
            {contact[0]?.displayName}
          </Text>
          <Text
            style={{
              marginLeft: RFValue(16, 844),
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(14, 844),
              color: COLORS.monoBlack500,
            }}
          >
            {handleSplitText(`@${contact[0]?.userName}`)}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteCircleRequest()}>
        <View
          style={{
            height: RFValue(52, 844),
            width: "100%",
            //flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.monoGhost500,
            borderColor: COLORS.monoChromeBlack,
            borderWidth: 1,
            borderRadius: RFValue(12, 844),
            marginTop: RFValue(40, 844),
          }}
        >
          <Text
            style={{
              color: COLORS.monoBlack900,
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(14, 844),
            }}
          >
            Remove From Circle
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  cross: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderWidth: 1,
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.monoChromeBlack,
  },
});
const mapStateToProps = (state) => {
  const { discover, getTrendingUser, filter, circle, projects } = state;
  return { discover, getTrendingUser, filter, circle, projects };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCircleApi: (requestParam, tokenDetail, isSent) => {
      dispatch({
        type: circleTypes.DELETE_CIRCLE_DATA,
        requestParam,
        tokenDetail,
        isSent
      });
    },
    callprojectApi: (userId, tokenDetail, listType, name) => {
      dispatch({
        type: projectTypes.GET_PROJECT_LIST,
        userId,
        tokenDetail,
        listType,
        name,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CircleInfo);
