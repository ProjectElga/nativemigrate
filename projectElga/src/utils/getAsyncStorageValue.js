import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = async(key)=>{
    let items = await AsyncStorage.getItem(key);
    console.log("items async",items)
    return JSON.stringify(items);
  }
const getAsyncStorageValue = (key) => {
    try {
        const data = storage(key);
        return data;
      } catch (error) {
        console.log(error);
      }
};
export default getAsyncStorageValue;
