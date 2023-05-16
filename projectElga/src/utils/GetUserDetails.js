import AsyncStorage from '@react-native-async-storage/async-storage';
import STORAGE_KEY from '../constants/StorageKeys';

const getUserDetails = async ()=>{
    const userDetails = {
        accessToken: await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
        refreshToken: await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN),
        isNew: await AsyncStorage.getItem(STORAGE_KEY.IS_NEW_USER),
        userId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),

    }
    console.log("userDetails>>",userDetails)
    return userDetails;
}

export default getUserDetails;