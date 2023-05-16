import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../../App';
import STORAGE_KEY from '../constants/StorageKeys';

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEY.IS_NEW_USER);
    await AsyncStorage.removeItem(STORAGE_KEY.USER_ID);
    await AsyncStorage.removeItem(STORAGE_KEY.ISCREATOR);
    navigate('LoginScreen');
}

export default logout; 