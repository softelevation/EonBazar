/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Header from '../../../common/header';
import {
  Block,
  Button,
  CustomButton,
  ImageComponent,
  Text,
} from '../../../components';
import {t1, t2, w2, w3, w4} from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import Footer from '../../../common/footer';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeWishlistRequest,
  addToCartRequest,
  addToGuestCartRequest,
  wishlistRequest,
} from '../../../redux/action';
import ActivityLoader from '../../../components/activityLoader';
import {config} from '../../../utils/config';
import {light} from '../../../components/theme/colors';
import ResponsiveImage from 'react-native-responsive-image';
import {images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {strictValidObjectWithKeys} from '../../../utils/commonUtils';
import OverlayLoader from '../../../components/overlayLoader';

const Wishlist = () => {
  const nav = useNavigation();
  const [wishlistData, setData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.profile.user);
  const wishlist = useSelector((state) => state.wishlist.list.data);
  const quote_id = useSelector((state) => state.cart.cartId.id);

  const isLoad = useSelector((state) => state.wishlist.list.loading);
  const userProfile = useSelector((state) => state.user.profile.user);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );
  const guestCartToken = useSelector((v) => v.cart.guestcartId.id);

  const cart_list = useSelector((state) => state.cart.list.data);
  const [cartlist, setList] = useState([]);
  const overlayLoader = useSelector((v) => v.cart.save.loading);
  const overlayGuestLoader = useSelector((v) => v.cart.guestsave.loading);
  const [qtySum, setSum] = useState([]);

  useEffect(() => {
    dispatch(wishlistRequest());
  }, []);

  useEffect(() => {
    const newData = [];
    wishlist &&
      wishlist.map((a) => {
        const {name, special_price, price, thumbnail} = a && a.product;
        newData.push({
          qty: 1,
          name: name,
          image: thumbnail,
          currency_code: currency || 'BDT',
          price: price,
          price_info: price,
          special_price: special_price,
          isLoad: false,
          isAddtoCart: false,
          id: a.wishlist_item_id,
          sku: a.product.sku,
        });
      });
    setData(newData);
  }, [wishlist]);

  const removeItem = (id, index) => {
    const old = wishlistData[index];
    const updated = {...old, isLoad: true};
    const clone = [...wishlistData];
    clone[index] = updated;
    setData(clone);
    dispatch(removeWishlistRequest(id));
  };
  const addToCart = async (val, index) => {
    if (strictValidObjectWithKeys(userProfile)) {
      const old = wishlistData[index];
      const updated = {...old, isAddtoCart: true};
      const clone = [...wishlistData];
      clone[index] = updated;
      setData(clone);
      const newData = {
        sku: val.sku,
        qty: val.qty,
        quote_id: quote_id,
      };
      await dispatch(addToCartRequest(newData));
    } else {
      const old = wishlistData[index];
      const updated = {...old, isAddtoCart: true};
      const clone = [...wishlistData];
      clone[index] = updated;
      setData(clone);
      const newData = {
        sku: val.sku,
        qty: val.qty,
        quote_id: guestCartToken,
      };

      await dispatch(
        addToGuestCartRequest({token: guestCartToken, items: newData}),
      );
    }
  };

  const navigateToShipping = () => {
    if (strictValidObjectWithKeys(userData)) {
      // nav.navigate('BillingAddress', {
      nav.navigate('Shipping', {
        price: cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2),
      });
    } else {
      global.isLoggedIn = true;
      nav.navigate('Login', {isLoggedIn: true});
    }
  };
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
    var numbers = newData;
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
      sum += numbers[i].qty;
    }
    setSum(sum);
  }, [cart_list]);

  const _renderItem = ({item, index}) => {
    const {name, special_price, price, image, currency_code} = item;
    return (
      <CustomButton
        onPress={() =>
          nav.navigate('Details', {
            item: item,
          })
        }
        row
        color="#fff"
        center
        space="between"
        padding={[t1, wp(1), 0, t1]}
        margin={[t1, 0]}
        flex={false}>
        <Block flex={false} row padding={[t1, 0]}>
          <ImageComponent
            isURL
            name={`${config.Image_Url}${image}`}
            height={100}
            width={100}
          />
          <Block
            style={{width: wp(53)}}
            flex={false}
            margin={[t1, 0, t1, wp(2)]}>
            <Text color="#000000" size={14}>
              {name}
            </Text>
            <Text secondary size={10} margin={[t1, 0, 0, 0]} bold>
              {currency_code} {Number(price).toFixed(2)}
            </Text>

            <Block margin={[t1, 0]} flex={false}>
              <StarRating
                disabled={false}
                starSize={15}
                maxStars={5}
                fullStarColor={'#78A942'}
                rating={item.rating || 0}
                containerStyle={{width: wp(20)}}
              />
            </Block>
          </Block>
        </Block>
        <Block center flex={false}>
          {item.isLoad ? (
            <ActivityIndicator
              size="small"
              color={light.secondary}
              style={{alignSelf: 'flex-end'}}
            />
          ) : (
            <CustomButton
              onPress={() => removeItem(item.id, index)}
              flex={false}
              style={{height: 20, width: 20}}
              center
              middle
              secondary>
              <ResponsiveImage
                source={images.close_icon}
                initHeight="15"
                initWidth="15"
                style={{tintColor: '#fff'}}
              />
            </CustomButton>
          )}
          <CustomButton
            onPress={() => addToCart(item, index)}
            secondary
            style={{marginTop: hp(4), marginRight: wp(1)}}
            padding={[hp(0.8)]}
            borderRadius={20}
            // center
            // right
            flex={false}>
            <MaterialIcon name="shopping-bag" size={20} color="#fff" />
          </CustomButton>
        </Block>
      </CustomButton>
    );
  };
  const _renderEmpty = () => {
    return strictValidObjectWithKeys(userProfile) ? (
      <Block style={{height: hp(20)}} center middle>
        <Text size={14}>You have no items in your wish list.</Text>
      </Block>
    ) : (
      <Block style={{height: hp(20)}} center middle>
        <Text size={14}>Click here login to access wishlist.</Text>
      </Block>
    );
  };
  return (
    <Block>
      {(overlayLoader || overlayGuestLoader) && <OverlayLoader />}

      <Header />
      {isLoad && <ActivityLoader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block row middle center margin={[t2, 0]}>
          <Block
            flex={false}
            borderWidth={1}
            center
            middle
            borderRadius={20}
            margin={[0, w2]}
            borderColor="#78A942"
            padding={[hp(0.6)]}>
            <ImageComponent
              name="wishlist_icon"
              height={15}
              width={17}
              color="#78A942"
            />
          </Block>
          <Text bold transform="uppercase">
            Wish list
          </Text>
        </Block>
        <Block margin={[t1, w3]}>
          <FlatList
            data={wishlistData}
            ListEmptyComponent={_renderEmpty}
            renderItem={_renderItem}
            keyExtractor={(item) => item.id}
          />
          <Button
            onPress={() =>
              strictValidObjectWithKeys(userProfile)
                ? nav.reset({
                    routes: [{name: 'DashboardLogo'}],
                  })
                : nav.navigate('Login')
            }
            style={{marginTop: t2}}
            color="secondary">
            {strictValidObjectWithKeys(userProfile)
              ? ' Continue Shopping'
              : 'Login'}
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
      {cartlist.length > 0 ? (
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
            {cartlist.length > 0 ? (
              <View
                style={{
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  right: 30,
                  top: 20,
                }}>
                <Text center color={'white'} size={10}>
                  {qtySum}
                </Text>
              </View>
            ) : null}
          </Block>
        </Block>
      ) : null}
    </Block>
  );
};
const LineAboveText = styled(Text)({
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
});
const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});
export default Wishlist;
