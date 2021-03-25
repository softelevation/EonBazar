import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import {Block, ImageComponent, Text} from '../components';
import {images} from '../assets';
import ResponsiveImage from 'react-native-responsive-image';
import styled from 'styled-components';

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#78A942',
    paddingHorizontal: wp(7),
    paddingVertical: hp(1),
  },
});

const tabImages = {
  Dashboard: 'heart',
  Category: 'category_icon',
  image: 'DashboardLogo',
  Cart: 'your_order_icon',
  Login: 'profile_icon',
  Profile: 'profile_icon',
};
const renderHeight = (type) => {
  switch (type) {
    case 'profile_icon':
      return 22;
    case 'category_icon':
      return 21;
    default:
      return 23;
  }
};
const renderWidth = (type) => {
  switch (type) {
    case 'profile_icon':
      return 20;
    case 'category_icon':
      return 21;
    case 'your_order_icon':
      return 25;
    default:
      return 23;
  }
};

const BottomTab = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.ButtonContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <MainView
            activeOpacity={0.7}
            style={
              tabImages[label] === undefined
                ? {
                    marginTop: -hp(4),
                  }
                : {marginTop: 0}
            }
            accessibilityRole="button"
            testID={options.tabBarTestID}
            onLongPress={onLongPress}
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}>
            <>
              {tabImages[label] === undefined ? (
                <CenterIcon
                  flex={false}
                  shadow
                  // white
                  center
                  middle
                  borderRadius={60}>
                  <ImageComponent
                    name="logo_center_icon"
                    height={80}
                    width={80}
                  />
                </CenterIcon>
              ) : (
                <Icons
                  source={images[tabImages[label]]}
                  initHeight={renderHeight(tabImages[label])}
                  initWidth={renderWidth(tabImages[label])}
                />
              )}
            </>
          </MainView>
        );
      })}
    </View>
  );
};

BottomTab.propTypes = {
  state: PropTypes.shape(PropTypes.object),
};
BottomTab.defaultProps = {
  state: 'Search here',
};

const Icons = styled(ResponsiveImage)({
  tintColor: '#fff',
});
const CenterIcon = styled(Block)({
  height: 70,
  width: 70,
});
const MainView = styled(TouchableOpacity)({
  alignItems: 'center',
  // marginBottom: -hp(1),
  padding: 5,
});
export default BottomTab;
