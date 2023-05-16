import React, {
  Component,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Text,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { BottomSheet } from "react-native-elements";

import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import IMAGES from "../../../../themes/Images";
import Icon from "react-native-vector-icons/Ionicons";
const SelectTag = (props) => {
  const tags = props.tags;
  const [showModal, setShowModal] = useState(false);
  const [activeTag, setActiveTag] = useState("");

  const handlePresentModalPress = () => {
    setShowModal(true);
  };
  const handleDismissModalPress = () => {
    setShowModal(false);
  };

  const bottomPage = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          handleDismissModalPress();
        }}
      >
        <BottomSheet isVisible={showModal}>
          <View
            style={{
              paddingTop: RFValue(12, 844),
              paddingBottom: RFValue(20, 844),
              paddingHorizontal: RFValue(24, 844),
              backgroundColor: COLORS.monoWhite900,
              borderTopLeftRadius: RFValue(24, 844),
              borderTopRightRadius: RFValue(24, 844),
            }}
          >
            <View
              style={{
                borderWidth: 2,
                width: RFValue(40, 844),
                alignSelf: "center",
                borderColor: COLORS.monoBlack700,
                borderRadius: RFValue(24, 844),
              }}
            ></View>
            {tags.map((obj, i) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setActiveTag(obj);
                    props.onPress(obj);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <RadioButton
                      labelHorizontal={true}
                      key={i}
                      style={{ marginTop: RFValue(20, 844) }}
                    >
                      {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={activeTag == obj}
                        onPress={() => {
                          setActiveTag(obj);
                          props.onPress(obj);
                        }}
                        buttonOuterColor={COLORS.monoGhost500}
                        buttonInnerColor={
                          activeTag == obj
                            ? COLORS.primaryTeal400
                            : COLORS.monoBlack500
                        }
                        buttonSize={10}
                        buttonOuterSize={20}
                      />

                      <Text
                        style={{
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: RFValue(16, 844),
                          color: COLORS.monoBlack700,
                          marginLeft: RFValue(24, 844),
                        }}
                      >
                        {obj}
                      </Text>
                    </RadioButton>

                    <TouchableWithoutFeedback
                      onPress={() => {
                        handleDismissModalPress();

                        props.onPressInfo ? props.onPressInfo() : null;
                      }}
                    >
                      <Image
                        source={IMAGES.Info}
                        style={{
                          width: RFValue(20, 844),
                          height: RFValue(20, 844),
                          marginTop: 12,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePresentModalPress();
      }}
    >
      <View
        style={{
          borderColor: props.backgroundColor
            ? props.backgroundColor
            : COLORS.monoBlack700,
          borderWidth: 2,
          backgroundColor: COLORS.monoWhite900,
          borderRadius: RFValue(20, 844),
          paddingTop: 4,
          paddingBottom: Platform.OS == "ios" ? 4 : 3,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: RFValue(12, 844),
            color: props.textColor ? props.textColor : COLORS.monoBlack700,
          }}
        >
          {activeTag == "" ? props.title : activeTag}
        </Text>

        <Icon
          color={COLORS.monoBlack700}
          name="chevron-down"
          type="feather"
          size={14}
          style={{ marginLeft: 4, marginBottom: Platform.OS == "ios" ? 0 : 2 }}
        />
        {bottomPage()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SelectTag;
