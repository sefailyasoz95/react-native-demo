import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from '../Components/Loading';

describe('Loading Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Loading />);

    // Check if the LottieView is rendered
    const lottieView = getByTestId('loading-lottie');
    expect(lottieView).toBeTruthy();
  });
});
