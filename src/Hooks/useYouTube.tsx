import {Alert, Linking} from 'react-native';

const useYouTube = () => {
  const openYouTubeLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`This video cannot be opened right now.`);
    }
  };
  return {openYouTubeLink};
};

export default useYouTube;
