import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import styled from "styled-components/native";
import { Dimensions, Platform, Text, View } from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
const width = Dimensions.get("window").width - 96;

const MultiSliderComp = (props) => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);

  return (
    <View style={{ width: "100%", marginTop: RFValue(16, 844) }}>
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: RFValue(16, 844),
          color: COLORS.monoBlack900,
        }}
      >
        {props.title}
      </Text>
      <View style={{ alignSelf: "center", alignItems: "center" }}>
        <MultiSlider
          step={props.step ? props.step : null}
          markerStyle={{
            ...Platform.select({
              ios: {
                height: RFValue(24,844),
                width: RFValue(24,844),
                borderRadius: 50,
                backgroundColor: COLORS.primaryTeal500,
                borderWidth:6,
                borderColor:"rgba(196, 196, 196, 0.6)",
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: RFValue(24,844),
                width: RFValue(24,844),
                borderRadius: 50,
                backgroundColor: COLORS.primaryTeal500,
                borderWidth:6,
                borderColor:"rgba(196, 196, 196, 0.6)"
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: RFValue(24,844),
                width: RFValue(24,844),
                borderRadius: 50,
                backgroundColor: COLORS.primaryTeal500,
                borderWidth:6,
                borderColor:"rgba(196, 196, 196, 0.6)"
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: COLORS.primaryTeal500,
          }}
          trackStyle={{
            backgroundColor: COLORS.monoChromeBlack,
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[props.minValue, props.maxValue]}
          sliderLength={width}
          onValuesChange={(value) => {
            props.onValuesChange(value);
          }}
          min={props.min}
          max={props.max}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
          
        />
      </View>

      <View
        style={{
          marginTop: RFValue(8, 844),
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack500,
          }}
        >
          {props.leftFooter}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack500,
          }}
        >
          {props.rightFooter}
        </Text>
      </View>
    </View>
  );
};

export default MultiSliderComp;
