import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
function Skeleton(props) {
  const opacity = useRef(new Animated.Value(0.3));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.8,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);
  return (
    <Animated.View
      style={[
        props.styles,
        {
          opacity: opacity.current,
          backgroundColor: "#E7E5E5",
        },
      ]}
    ></Animated.View>
  );
}

export default Skeleton;
