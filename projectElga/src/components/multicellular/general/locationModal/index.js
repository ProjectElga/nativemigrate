import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../../constants/StorageKeys";
import IMAGES from "../../../../themes/Images";
import * as Location from "expo-location";
import Styles from "./style";
import { locationTypes } from "../../../../reducers/location/location";

const LocationModal = (props) => {
  const checkLocationStatus = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      return true;
    } else {
      return false;
    }
  };
  const [isVisible, setIsVisible] = useState(checkLocationStatus());
  const location = useSelector((state) => state.location);
  const { isLocationSuccess, loading } = location;
  useEffect(() => {
    if (isLocationSuccess) {
      setIsVisible(false);
    } else {
      effect();
    }
  }, [isLocationSuccess]);
  const effect = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      getLocation();
    }
  };
  const getLocation = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        setIsVisible(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("locationModal", location);
      const { coords: { latitude = 0, longitude = 0 } = {} } = location;
      props.callLocationApi(userId, tokenDetail, latitude, longitude);
    })();
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={Styles.wrapper}>
        <View style={Styles.card}>
          <Image source={IMAGES.Location} style={Styles.image} />
          <Text style={Styles.title}>Find Creators Near You!!</Text>
          <Text style={Styles.subTitle}>
            Shaer collects location data to enable you access to find
            creators near you.
          </Text>
          {loading ? (
            <TouchableOpacity style={Styles.buttonWrapper}>
              <LinearGradient
                style={Styles.button}
                colors={["#1877F2", "#FF47ED"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={Styles.buttonText}>Loading...</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Styles.buttonWrapper}
              onPress={getLocation}
            >
              <LinearGradient
                style={Styles.button}
                colors={["#1877F2", "#FF47ED"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={Styles.buttonText}>Allow Location Access</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { location } = state;
  return {
    location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callLocationApi: (userId, tokenDetail, latitude, longitude) => {
      dispatch({
        type: locationTypes.SEND_LOCATION_DATA,
        userId,
        tokenDetail,
        latitude,
        longitude,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LocationModal);
