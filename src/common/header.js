import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Block, ImageComponent } from '../components';
import PropTypes from 'prop-types';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { w3 } from '../components/theme/fontsize';
const Header = ({ leftIcon, Logo, rightIcon }) => {
  const nav = useNavigation();
  return (
    <Block
      center
      row
      space={'between'}
      padding={[hp(1), w3]}
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

      <TouchableOpacity  activeOpacity={1} onPress={() => nav.navigate('DashboardLogo')}>
        <ImageComponent name="logo_white_icon" height={30} width={120} />
      </TouchableOpacity>

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
