import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Banner from '../../common/banner';
import Header from '../../common/header';
import {
  Block, ImageComponent, Text, Button,
} from '../../components';
import Search from '../../components/search';
import Footer from '../../common/footer';
import Cards from '../../common/cards';
import HeaderMenu from '../../common/headerMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  bannerRequest,
  bestOfferRequest,
  brandOfferRequest,
  filterIdRequest,
  getAllProductsRequest,
  getCategoryListRequest,
  GuestCartIDRequest,
  guestCartRequest,
  topOfferRequest,
} from '../../redux/action';
import { strictValidArrayWithLength, strictValidObjectWithKeys, } from '../../utils/commonUtils';
import { w3, t2 } from '../../components/theme/fontsize';
import { useNavigation } from '@react-navigation/native';
import { light } from '../../components/theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import HorizontalCards from '../../common/horizontal-cards';
import ImageSlider from '../../components/ImageSlider';
import styled from 'styled-components';
import { config } from '../../utils/config';
const Dashboard = () => {
  const navigation = useNavigation();
  const [menu, setmenu] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.profile.user);
  const productsData = useSelector((v) => v.category.productList.data);
  const isLoad = useSelector((v) => v.category.productList.loading);
  const isLoadBanner = useSelector((v) => v.banner.list.loading);
  const bannerData = useSelector((v) => v.banner.list.data);
  const topOffers = useSelector((v) => v.category.top.data.items);
  const topOfferLoad = useSelector((v) => v.category.top.loading);
  const bestOffers = useSelector((v) => v.category.best.data.items);
  const bestOfferLoad = useSelector((v) => v.category.best.loading);
  const newOffers = useSelector((v) => v.category.brands.data.items);
  const newOfferLoad = useSelector((v) => v.category.brands.loading);
  const guestCartToken = useSelector((v) => v.cart.guestcartId.id);
  const cart_list = useSelector((state) => state.cart.list.data);
  const [cartlist, setList] = useState([]);

  const bestOffer = 10;
  const topOffer = 11;
  const brandOffer = 12;
  const currentPage = 1;
  const pageSize = 10;

  const sortingMenu = (val) => {
    dispatch(filterIdRequest(val));
    navigation.jumpTo('Category');
  };

  const checkApi = async () => {
    const guest_token = await AsyncStorage.getItem('guest-token');
    if (!guest_token) {
      dispatch(GuestCartIDRequest());
    }
  };

  useEffect(() => {
    checkApi();
    dispatch(bannerRequest());
    dispatch(topOfferRequest(topOffer));
    dispatch(brandOfferRequest(brandOffer));
    dispatch(bestOfferRequest(bestOffer));
    dispatch(guestCartRequest(guestCartToken));
    dispatch(
      getAllProductsRequest({
        currentPage,
        pageSize,
      }),
    );
    dispatch(getCategoryListRequest());
    // const unsubscribe = navigation.addListener('focus', () => {
    //   checkApi();
    //   dispatch(bannerRequest());
    //   dispatch(topOfferRequest(topOffer));
    //   dispatch(brandOfferRequest(brandOffer));
    //   dispatch(bestOfferRequest(bestOffer));
    //   dispatch(
    //     getAllProductsRequest({
    //       currentPage,
    //       pageSize,
    //     }),
    //   );
    // });

    // return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigateToShipping = () => {
    if (strictValidObjectWithKeys(userData)) {
      navigation.navigate('Shipping', {
        price: cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2),
      });
    } else {
      global.isLoggedIn = true
      navigation.navigate('Login', { isLoggedIn: true });
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
  }, [cart_list]);
  return (
    <Block>
      <Header />

      <Block flex={false} padding={[0, wp(2), 0, wp(2)]}>
        <Search />
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu onPress={sortingMenu} color={menu} />
        {isLoadBanner ? (
          <Block color="transparent" style={{ height: hp(23) }} center middle>
            <ActivityIndicator color={light.secondary} size="large" />
          </Block>
        ) : (
          <View style={{ height: 200, width: '100%' }}>
            <Banner data={bannerData} />
          </View>
        )}
        <Block padding={[0, wp(1)]} flex={false}>
          <Block padding={[0, w3]} row flex={false} space={'between'}>
            <Text body semibold>
              Top Offers
            </Text>
          </Block>

          {topOfferLoad ? (
            <Block color="transparent" style={{ height: hp(30) }} center middle>
              <ActivityIndicator color={light.secondary} size="large" />
            </Block>
          ) : (
            <HorizontalCards
              data={strictValidArrayWithLength(topOffers) && topOffers}
            />
          )}
        </Block>
        <Block padding={[hp(1), wp(1)]} flex={false}>
          <Block padding={[0, w3]} row flex={false} space={'between'}>
            <Text body semibold>
              Best Offers
            </Text>
          </Block>

          {bestOfferLoad ? (
            <Block color="transparent" style={{ height: hp(30) }} center middle>
              <ActivityIndicator color={light.secondary} size="large" />
            </Block>
          ) : (
            <HorizontalCards
              data={strictValidArrayWithLength(bestOffers) && bestOffers}
            />
          )}
        </Block>

        <Block padding={[hp(1), wp(1)]} flex={false}>
          <Block padding={[0, w3]} row flex={false} space={'between'}>
            <Text body semibold>
              New Offers
            </Text>
          </Block>

          {newOfferLoad ? (
            <Block color="transparent" style={{ height: hp(30) }} center middle>
              <ActivityIndicator color={light.secondary} size="large" />
            </Block>
          ) : (
            <HorizontalCards
              data={strictValidArrayWithLength(newOffers) && newOffers}
            />
          )}
        </Block>

        <Block padding={[hp(1), wp(1), 0]} flex={false}>
          <Block padding={[0, w3]} row flex={false} space={'between'}>
            <Text body semibold>
              All Products
            </Text>
            <Text
              onPress={() => navigation.navigate('SeeAllDetails')}
              secondary
              body
              semibold>
              See All
            </Text>
          </Block>

          {isLoad ? (
            <Block color="transparent" style={{ height: hp(30) }} center middle>
              <ActivityIndicator color={light.secondary} size="large" />
            </Block>
          ) : (
            <Cards
              data={strictValidArrayWithLength(productsData) && productsData}
            />
          )}
        </Block>
        <Footer />

      </ScrollView>
      {/* <View></View> */}
      {/* {strictValidArrayWithLength(cartlist) && ( */}
      { cartlist.length > 0 ? <Block
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
            onPress={() => navigation.navigate('Dashboard')}
            textStyle={{ textTransform: 'uppercase' }}
            color="primary">
            Continue Shopping
            </CartButton>
          <CartButton
            onPress={() => {
              navigateToShipping();
            }}
            textStyle={{ textTransform: 'uppercase' }}
            color="secondary">
            Buy Now
            </CartButton>
        </Block>
      </Block> : null}
      {/* )} */}
    </Block>
  );
};
const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});

export default Dashboard;
