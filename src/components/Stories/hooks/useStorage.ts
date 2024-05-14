import AsyncStorage from "@react-native-async-storage/async-storage";


export const useStorage = () => {
const getData = async (): Promise<StorageData[]> => {
    let data;
    try {
        data = await AsyncStorage.getItem("@StoriesApp:userData");
        data = data ? await JSON.parse(data) : [];
        return data;
    } catch (err) {
        throw err;
    }
};

  const setData = async (data: StorageData[]): Promise<void> => {
    try {
      await AsyncStorage.setItem("@StoriesApp:userData", JSON.stringify(data));
    } catch (err) {
      throw err;
    }
  };

  return {
    getData,
    setData,
  };
};
