import React from 'react';
import {render} from '@testing-library/react-native';
import Section from '../Components/Section';
import {Text, View} from 'react-native';

const mockData = [
  {id: '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  // ... add more mock data as needed
];

const mockRenderItem = ({item}) => (
  <View>
    <Text>{item.name}</Text>
  </View>
);

describe('Section Component', () => {
  it('renders correctly with data', () => {
    const {getByText, getByTestId} = render(
      <Section
        title="Test Section"
        data={mockData}
        renderItem={mockRenderItem}
        loading={false}
      />,
    );

    // Check if the section title is rendered
    const sectionTitle = getByText('Test Section');
    expect(sectionTitle).toBeTruthy();

    // Check if the FlatList is rendered
    const flatList = getByTestId('section-flatlist');
    expect(flatList).toBeTruthy();

    // Additional assertions can be added based on your component's behavior
    // For example, you might want to check if the renderItem function is called for each item in the data
  });

  it('renders loading state when loading is true and no data', () => {
    const {getByTestId} = render(
      <Section
        title="Test Section"
        data={[]}
        renderItem={mockRenderItem}
        loading={true}
      />,
    );

    // Check if the Loading component is rendered
    const loadingComponent = getByTestId('loading-lottie');
    expect(loadingComponent).toBeTruthy();
  });
});
