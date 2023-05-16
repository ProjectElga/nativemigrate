import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import moment from "moment-timezone";
import momentjs from "moment";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import shadow from "../../../constants/shadow";
export default class PendingCard extends Component {
  handleDate = () => {
    const date = moment(this.props.date).tz("Asia/kolkata").format();
    return momentjs(date).fromNow();
  };
  handleSplitText = (text, limit) => {
    if (text?.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        //key={this.props.key}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <View style={styles.wrapper}>
          <View style={styles.profilePicture}>
            <Image
              source={{ uri: this.props.image }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.rightComponent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "100%" }}>
                <Text style={[styles.title, {
                  color: this.props.read
                    ? COLORS.monoBlack500
                    : COLORS.monoBlack900,
                }]}>{this.handleSplitText(this.props.title, 50)}</Text>
              </View>
            </View>
            <View>
              <Text style={[styles.description, { marginTop: 0, fontSize: RFValue(14, 944) }]}>
                {this.handleDate()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: RFValue(4, 844),
              }}
            >
              {this.props.showProfile ? (
                <>
                  <Text style={[styles.profileName, {
                    color: this.props.read
                      ? COLORS.monoBlack500
                      : COLORS.monoBlack900,
                  }]}>
                    {this.handleSplitText(this.props.profileName, 10)}
                  </Text>

                  <View style={styles.categoryContainer}>
                    <View style={styles.category1}>
                      <Text style={styles.category1Text}>
                        {this.props.subCategory}
                      </Text>
                    </View>
                    <View style={styles.category2}>
                      <Text style={styles.category2Text}>
                        {this.props.mainCategory}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: RFValue(8, 844),
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: RFValue(12, 844),
                      color: COLORS.monoChatGray,
                    }}
                  >
                    {this.props.categories}
                  </Text>
                </View>
              )}
            </View>

            {this.props.showProfile ? (
              <Text style={styles.description} numberOfLines={1}>
                {this.props.subtitleText}
              </Text>
            ) : null}
            {this.props.isHideButton ? null : (
              <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback
                  onPress={
                    this.props.loadingButton1 ? null : this.props.onClickButton1
                  }
                >
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: COLORS.monoBlack900 },
                    ]}
                  >
                    {this.props.loadingButton1 ? (
                      <ActivityIndicator
                        style={[styles.button, styles.loaderSnipper]}
                        size="small"
                        color={COLORS.monoWhite900}
                        animating
                      />
                    ) : (
                      <Text
                        style={[
                          styles.buttonText,
                          { color: COLORS.monoWhite900 },
                        ]}
                      >
                        {this.props.button1}
                      </Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={
                    this.props.loadingButton2 ? null : this.props.onClickButton2
                  }
                >
                  <View
                    style={[
                      styles.button,
                      { backgroundColor: COLORS.monoGhost500 },
                    ]}
                  >
                    {this.props.loadingButton2 ? (
                      <ActivityIndicator
                        style={[styles.button, styles.loaderSnipper]}
                        size="small"
                        color={COLORS.monoWhite900}
                        animating
                      />
                    ) : (
                      <Text
                        style={[
                          styles.buttonText,
                          { color: COLORS.monoBlack700 },
                        ]}
                      >
                        {this.props.button2}
                      </Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    // marginBottom: RFValue(16, 844),
    borderRadius: RFValue(16, 844),
    borderBottomColor: COLORS.monoGhost500,
    borderBottomWidth: 1.5,
    minHeight: RFValue(100, 844),
    zIndex: 0,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
    // marginBottom: RFValue(6, 844),
  },
  rightComponent: {
    marginLeft: RFValue(16, 844),
    width: "73%",
    justifyContent: "space-between",
  },
  image: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(48, 844),
  },
  smallImage: {
    width: RFValue(12, 844),
    height: RFValue(12, 844),
    borderRadius: RFValue(6, 844),
  },
  profileName: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoChatGray,
    alignSelf: "center",
  },
  loaderSnipper: {
    height: 6,
  },
  date: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack700,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(8, 844),
    flexDirection: "row",
  },
  category1: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoBlack500,
    height: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  category1Text: {
    color: COLORS.monoWhite900,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_400Regular",
    marginHorizontal: RFValue(8, 844),
    // marginTop: 1,
  },
  category2: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    height: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    borderWidth: 0.5,
    borderColor: "#EEEEEE",
  },
  category2Text: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_400Regular",
    marginHorizontal: RFValue(8, 844),
    marginTop: 1,
  },

  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: RFValue(12, 844),
  },
  button: {
    paddingVertical: RFValue(12, 844),
    width: "48%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 944),
    marginTop: 4,
    color: COLORS.monoBlack500,
  },
  profilePicture: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(50, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
  },
});
