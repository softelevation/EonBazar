/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Header from '../../common/header';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Text,
  Block,
  ImageComponent,
  CustomButton,
  Input,
  Button,
} from '../../components';
import {t1, t2, t4, w2, w3, w4} from '../../components/theme/fontsize';
import EmptyFile from '../../components/emptyFile';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../../utils/commonUtils';
import {
  deleteGuestCartRequest,
  deleteItemRequest,
  getCartDetailsRequest,
  guestCartRequest,
  searchDistrictRequest,
  updateCartRequest,
  updateGuestCartRequest,
} from '../../redux/action';
import ActivityLoader from '../../components/activityLoader';
import {light} from '../../components/theme/colors';
const Cart = () => {
  const userData = useSelector((state) => state.user.profile.user);
  const cart_list = useSelector((state) => state.cart.list.data);
  const isLoad = useSelector((state) => state.cart.list.loading);
  const guestLoad = useSelector((state) => state.cart.guestlist.loading);
  const navigation = useNavigation();
  const errorCartLoad = useSelector((state) => state.cart.updateCart.error);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );
  const guestCartToken = useSelector((v) => v.cart.guestcartId.id);

  const nav = useNavigation();
  const [cartlist, setList] = useState([]);
  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(false);

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
  }, [cart_list, errorCartLoad]);

  const changeQty = (qty, index, item) => {
    // if (Number(qtyText) === 0 || Number(qtyText) === '') {
    //   const old = cartlist[index];
    //   const updated = {...old, qtyText: qty, price_copy: price};
    //   const clone = [...cartlist];
    //   clone[index] = updated;
    //   setList(clone);
    //   Alert.alert('Please Enter Valid Quanity');
    //   return;
    // }
    //else {
    // setrefreshing(true);

    console.log(item);
    const id = item.item_id;
    const old = cartlist[index];
    const updated = {...old, qty: qty, price_copy: item.price * qty};
    const clone = [...cartlist];
    clone[index] = updated;
    setList(clone);
    const data = {
      sku: item.sku,
      qty: qty,
      quote_id: item.quote_id,
    };
    // if (strictValidObjectWithKeys(userData)) {
    //   dispatch(updateCartRequest({data, id}));
    // } else {
    //   dispatch(
    //     updateGuestCartRequest({token: guestCartToken, id: id, items: data}),
    //   );
    // }
    // }
  };

  const updateProducts = (item, index) => {
    const old = cartlist[index];
    const updated = {...old, isLoad: true};
    const clone = [...cartlist];
    clone[index] = updated;
    setList(clone);
    const data = {
      sku: item.sku,
      qty: item.qty,
      quote_id: item.quote_id,
    };
    const id = item.item_id;
    if (strictValidObjectWithKeys(userData)) {
      dispatch(updateCartRequest({data, id}));
    } else {
      dispatch(
        updateGuestCartRequest({token: guestCartToken, id: id, items: data}),
      );
    }
  };

  const ChangeQtyText = (text, index) => {
    const old = cartlist[index];
    const updated = {...old, qtyText: text};
    const clone = [...cartlist];
    clone[index] = updated;
    setList(clone);
  };

  const deleteProduct = (id, index) => {
    const old = cartlist[index];
    const updated = {...old, isDelete: true};
    const clone = [...cartlist];
    clone[index] = updated;
    setList(clone);
    if (strictValidObjectWithKeys(userData)) {
      dispatch(deleteItemRequest(id));
    } else {
      dispatch(deleteGuestCartRequest({token: guestCartToken, id: id}));
    }
  };

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
    if (strictValidObjectWithKeys(userData)) {
      dispatch(getCartDetailsRequest());
    } else {
      dispatch(guestCartRequest(guestCartToken));
    }
  };
  const navigateToShipping = () => {
    if (strictValidObjectWithKeys(userData)) {
      nav.navigate('Shipping', {
        price: cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2),
      });
    } else {
      global.isLoggedIn=true
      navigation.navigate('Login', { isLoggedIn:true });
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <Block row flex={false} padding={[t2, w2]}>
        <Block flex={false}>
          {item.isDelete ? (
            <ActivityIndicator color={light.secondary} size="small" />
          ) : (
            <CustomButton
              onPress={() => deleteProduct(item.item_id, index)}
              flex={false}
              style={{height: 20, width: 20}}
              center
              middle
              secondary>
              <ImageComponent
                name="close_icon"
                height="15"
                width="15"
                color="#fff"
              />
            </CustomButton>
          )}
          {item.isLoad ? (
            <ActivityIndicator
              style={{marginTop: t1}}
              color={light.secondary}
              size="small"
            />
          ) : (
            <CustomButton
              onPress={() => updateProducts(item, index)}
              margin={[t1, 0, 0, 0]}
              flex={false}
              style={{height: 20, width: 20}}
              center
              middle
              secondary>
              <ImageComponent
                name="refresh_icon"
                height="12"
                width="12"
                color="#fff"
              />
            </CustomButton>
          )}

          <CustomButton
            margin={[t1, 0, 0, 0]}
            flex={false}
            style={{height: 20, width: 20}}
            center
            middle
            secondary>
            <Icon name="edit" size={12} color="#fff" />
          </CustomButton>
        </Block>
        <ImageComponent isURL name={item.image} />
        <Block flex={false} margin={[0, w3]}>
          <Text style={{width: widthPercentageToDP(38)}} size={13}>
            {item.name}
          </Text>
        </Block>
        <Block flex={false}>
          <Text bold secondary size={14}>
            {currency} {item.price_copy.toFixed(2)}
          </Text>
          {/* <Block row flex={false}>
            <Text margin={[t1, 0]} size={14}>
              Qty:
            </Text>
            <InputArea
              keyboardType="numeric"
              placeholder={'Qty'}
              onBlur={(e) =>
                changeQty(
                  e.nativeEvent.text,
                  item.item_id,
                  index,
                  item.price,
                  item.qtyText,
                  item.qty,
                  item,
                )
              }
              maxLength={3}
              onChangeText={(a) => ChangeQtyText(a, index)}
              value={`${item.qtyText}`}
            />
          </Block> */}
          <Block
            margin={[heightPercentageToDP(1.5), 0, 0]}
            style={{width: widthPercentageToDP(18)}}
            center
            row
            space={'between'}
            borderWidth={1}
            borderRadius={10}
            padding={[heightPercentageToDP(0.5)]}
            borderColorDeafult
            flex={false}>
            <TouchableOpacity
              disabled={item.qty === 1}
              onPress={() => changeQty(item.qty - 1, index, item)}>
              <Icons name="ios-remove-outline" size={20} />
            </TouchableOpacity>

            <Text size={12}>{item.qty}</Text>
            <Icons
              onPress={() => changeQty(item.qty + 1, index, item)}
              name="add"
              size={20}
            />
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block>
      <Header />
      {!refreshing && (isLoad || guestLoad) && <ActivityLoader />}

      <Block white padding={[t2, 0]}>
        <Block center row flex={false}>
          <Text size={14} margin={[t1, w3]} secondary bold>
            Your Cart
          </Text>
          <Text size={12}>
            {`${
              (strictValidArrayWithLength(cartlist) && cartlist.length) || 0
            } item`}
          </Text>
        </Block>
        <Block
          margin={[t2, 0, 0, 0]}
          borderColorDeafult
          borderWidth={[0, 0, 0.5, 0]}
          flex={false}
        />

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={strictValidArrayWithLength(cartlist) && cartlist}
          renderItem={_renderItem}
          ListEmptyComponent={<EmptyFile />}
          contentContainerStyle={{flexGrow: 1}}
        />
      </Block>
      {strictValidArrayWithLength(cartlist) && (
        <Block
          borderWidth={[0.5, 0, 0, 0]}
          borderColorDeafult
          flex={false}
          primary>
          <Block center flex={false} row space={'between'} margin={[t2, w3]}>
            <Text transform="uppercase" bold size={24}>
              Cart Subtotal :
            </Text>

            <Text bold secondary>
              BDT{' '}
              {cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2)}
            </Text>
          </Block>

          <Block row space={'around'} flex={false} margin={[0, w3, t2, w3]}>
            <CartButton
              onPress={() => nav.navigate('DashboardLogo')}
              textStyle={{textTransform: 'uppercase'}}
              color="primary">
           Continue Shopping
            </CartButton>
            <CartButton
              onPress={() => {
                navigateToShipping();
              }}
              textStyle={{textTransform: 'uppercase'}}
              color="secondary">
              Buy Now
            </CartButton>
            {cartlist.length > 0 ? <View style={{ backgroundColor: 'red', justifyContent: 'center', padding: 5, borderRadius: 10, position: 'absolute', width: 16, height: 16, right: 30, top: 20, }}>
            <Text center color={'white'} size={10}>{cartlist.length}</Text>
          </View> : null}
          </Block>
        </Block>
      )}
    </Block>
  );
};
const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});
const InputArea = styled(TextInput)({
  borderBottomWidth: 1,
  width: widthPercentageToDP(7),
  marginLeft: w3,
  paddingVertical:
    Platform.OS === 'ios' ? heightPercentageToDP(1) : heightPercentageToDP(0.1),
});
export default Cart;
