import React, {useState, useEffect,useRef} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
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
import {Block, ImageComponent, Text, Button} from '../../components';
import Search from '../../components/search';
import Footer from '../../common/footer';
import Cards from '../../common/cards';
import HeaderMenu from '../../common/headerMenu';
import {useDispatch, useSelector} from 'react-redux';
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
import {
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../../utils/commonUtils';
import {w3, t2} from '../../components/theme/fontsize';
import {useNavigation} from '@react-navigation/native';
import {light} from '../../components/theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import HorizontalCards from '../../common/horizontal-cards';
import ImageSlider from '../../components/ImageSlider';
import styled from 'styled-components';
import {config} from '../../utils/config';
import OverlayLoader from '../../components/overlayLoader';
const Dashboard = () => {
  const navigation = useNavigation();
  const [menu, setmenu] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.profile.user);
  const productsData = useSelector((v) => v.category.productList.data);
  const isLoad = useSelector((v) => v.category.productList.loading);
  const overlayLoader = useSelector((v) => v.cart.save.loading);
  const overlayGuestLoader = useSelector((v) => v.cart.guestsave.loading);
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
  const [showPrice, setShowPrice] = useState(false);
  const scrollRef = useRef();
  const bestOffer = 10;
  const topOffer = 11;
  const brandOffer = 12;
  const currentPage = 1;
  const pageSize = 1;

  const sortingMenu = (val) => {
    dispatch(filterIdRequest(val));
    global.dashboard = 'dashboard';
    navigation.navigate('SubCategory');
    // navigation.jumpTo('SubCategory');
  };

  const checkApi = async () => {
    if (strictValidObjectWithKeys(userData)) {
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
    const unsubscribe = navigation.addListener('focus', () => {
      // scrollRef.current.scrollTo()
      // alert('aa')
      scrollRef.current && scrollRef.current.scrollTo()
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      checkApi();
      dispatch(bannerRequest());
      dispatch(topOfferRequest(topOffer));
      dispatch(brandOfferRequest(brandOffer));
      dispatch(bestOfferRequest(bestOffer));
      dispatch(
        getAllProductsRequest({
          currentPage,
          pageSize,
        }),
      );
    });

    // return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigateToShipping = () => {
    // alert(JSON.stringify(userData))
    if (strictValidObjectWithKeys(userData)) {
      navigation.navigate('Shipping', {
        price: cartlist.reduce((sum, i) => (sum += i.price_copy), 0).toFixed(2),
      });
    } else {
      global.isLoggedIn = true;
      navigation.navigate('Login', {isLoggedIn: true});
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
    setShowPrice(true);
    setList(newData);
  }, [cart_list]);
  return (
    <Block>
      <Header />
      {(overlayLoader || overlayGuestLoader) && <OverlayLoader />}
      <Block flex={false} padding={[0, wp(2), 0, wp(2)]}>
        <Search />
      </Block>
      <BackButton
          onPress={() => scrollRef.current && scrollRef.current.scrollTo()}
          style={{
            position: 'absolute',
            right: 10,
            top: 80,
            zIndex: 2,
          }}>
          {/* <Text>Top</Text> */}
          <ImageComponent
            name="scroll_icon"
            height="15"
            width="15"
            color="green"
          />
        </BackButton>
      <ScrollView 
       ref={scrollRef}
      showsVerticalScrollIndicator={false}>
        <HeaderMenu onPress={sortingMenu} color={menu} />
        {isLoadBanner ? (
          <Block color="transparent" style={{height: hp(23)}} center middle>
            <ActivityIndicator color={light.secondary} size="large" />
          </Block>
        ) : (
          <View style={{height: 200, width: '100%'}}>
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
            <Block color="transparent" style={{height: hp(30)}} center middle>
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
          {console.log(overlayLoader, 'overlayLoader')}
          {bestOfferLoad ? (
            <Block color="transparent" style={{height: hp(30)}} center middle>
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
            <Block color="transparent" style={{height: hp(30)}} center middle>
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
            <Block color="transparent" style={{height: hp(30)}} center middle>
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
      {cartlist.length > 0 && showPrice ? (
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
              onPress={() => setShowPrice(false)}
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
                  {cartlist.length}
                </Text>
              </View>
            ) : null}
          </Block>
        </Block>
      ) : null}
      {/* )} */}
    </Block>
  );
};
const CartButton = styled(Button)({
  width: widthPercentageToDP(45),
  borderRadius: 30,
});
const BackButton = styled.TouchableOpacity({
  height: 40,
  width: 40,
  borderRadius: 40 / 2,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  marginBottom: hp(1),
});

export default Dashboard;
