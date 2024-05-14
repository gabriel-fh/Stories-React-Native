import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageData = {
  id: string;
  stories: {
    id: string;
  }[];
};

export const useStorage = () => {
  const getData = async (): Promise<void> => {
    let data;
    try {
      data = await AsyncStorage.getItem("@StoriesApp:userData");
      data = data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Erro ao buscar dados do AsyncStorage", err);
    }
  };

  const setData = async (data: StorageData): Promise<void> => {
    try {
      await AsyncStorage.setItem("@StoriesApp:userData", JSON.stringify(data));
    } catch (err) {
      console.error("Erro ao salvar dados no AsyncStorage", err);
    }
  };

  return {
    getData,
    setData,
  };
};
