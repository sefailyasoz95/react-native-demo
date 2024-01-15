import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <LottieView
      testID="loading-lottie"
      autoPlay={true}
      loop={true}
      resizeMode="contain"
      source={require('../Assets/Animations/loading-animation.json')}
      style={{width: 100, height: 100, alignSelf: 'center'}}
    />
  );
};

export default Loading;
