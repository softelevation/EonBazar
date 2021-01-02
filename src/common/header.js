import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, ImageComponent, Text} from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
const Header = ({leftIcon, Logo, rightIcon}) => {
  const nav = useNavigation();
  return (
    <Block
      center
      row
      space={'between'}
      padding={[hp(1)]}
      secondary
      flex={false}>
      {leftIcon ? (
        <TouchableOpacity
          onPress={() => nav.dispatch(DrawerActions.openDrawer())}>
          <ImageComponent name="menu_icon" height={25} width={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => nav.goBack()}>
          <ImageComponent name="back_icon" height={25} width={25} />
        </TouchableOpacity>
      )}

      <ImageComponent name="logo_white_icon" height={30} width={120} />
      <TouchableOpacity onPress={() => nav.navigate('Cart')}>
        <ImageComponent name="cart_icon" height={25} width={25} color="#fff" />
      </TouchableOpacity>
    </Block>
  );
};

Header.defaultProps = {
  Logo: 'Eonbazar',
  rightIcon: 'md-cart-outline',
  leftIcon: true,
};
Header.propTypes = {
  Logo: PropTypes.string,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
};
export default Header;
