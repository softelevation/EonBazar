import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { Block, ImageComponent } from '../components';
import PropTypes from 'prop-types';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { w3 } from '../components/theme/fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { myOrderRequest } from '../redux/action';
import {
  deleteGuestCartRequest,
  deleteItemRequest,
  getCartDetailsRequest,
  guestCartRequest,
  searchDistrictRequest,
  updateCartRequest,
  updateGuestCartRequest,
} from '../redux/action';
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../utils/commonUtils';
// import {  guestCartRequest } from '../redux/action';

const Header = ({ leftIcon, Logo, rightIcon }) => {
  const nav = useNavigation();
  const navigation = useNavigation();
  const cart_list = useSelector((v) => v.cart.list.data);
  const userData = useSelector((state) => state.user.profile.user);
  const orderData = useSelector((state) => state.order.list.data);
  const errorCartLoad = useSelector((state) => state.cart.updateCart.error);
  const [cartlist, setList] = useState([]);
  const [qtySum, setSum] = useState([]);
  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(false);
  const guestCartToken = useSelector((v) => v.cart.guestcartId.id);


  const currency = useSelector(
    (v) => v.currency.currencyDetail.data.base_currency_code,
  );
  useEffect(() => {
    dispatch(searchDistrictRequest());

    if (strictValidObjectWithKeys(userData)) {
      dispatch(getCartDetailsRequest());
    } else {
      dispatch(guestCartRequest(guestCartToken));
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (strictValidObjectWithKeys(userData)) {
        dispatch(getCartDetailsRequest());
      } else {
        dispatch(guestCartRequest(guestCartToken));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const newData = [];

    cart_list &&
      cart_list.map((a) => {
        console.log(JSON.stringify(a))
        newData.push({
          qty: a.qty,
          name: a.name,
          price: a.price,
          qtyText: a.qty,
          sku: a.sku,
          quote_id: a.quote_id,
          item_id: a.item_id,
          product_type: a.product_type,
          isLoad: false,
          isDelete: false,
          price_copy: a.price * a.qty,
          image: a.extension_attributes.image_url,
        });
      });

    setList(newData);
    var numbers = newData
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {

      sum += numbers[i].qty

    }
    setSum(sum)
  }, [cart_list, errorCartLoad]);

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

      <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('DashboardLogo')}>
        <ImageComponent name="logo_white_icon" height={30} width={120} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => nav.navigate('Cart')}>
        <ImageComponent name="cart_icon" height={25} width={25} color="#fff" />
        {cart_list.length > 0 ? <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            position: 'absolute',
            width: 15,
            height: 15,
            left: wp(4),
            // top: 20,
          }}>
          <Text center color={'white'} size={10}>
            {qtySum}
          </Text>
        </View> : null}
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
