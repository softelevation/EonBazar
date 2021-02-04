import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Banner from '../../common/banner';
import Header from '../../common/header';
import {Block, Text} from '../../components';
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
  topOfferRequest,
} from '../../redux/action';
import {strictValidArrayWithLength} from '../../utils/commonUtils';
import {w3} from '../../components/theme/fontsize';
import {useNavigation} from '@react-navigation/native';
import {light} from '../../components/theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
import HorizontalCards from '../../common/horizontal-cards';
const Dashboard = () => {
  const navigation = useNavigation();
  const [menu, setmenu] = useState('');
  const dispatch = useDispatch();
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
    dispatch(
      getAllProductsRequest({
        currentPage,
        pageSize,
      }),
    );
    dispatch(getCategoryListRequest());
    const unsubscribe = navigation.addListener('state', () => {
      dispatch(
        getAllProductsRequest({
          currentPage,
          pageSize,
        }),
      );
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Block>
      <Header />
      <Block flex={false} padding={[0, wp(2), 0, wp(2)]}>
        <Search />
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu onPress={sortingMenu} color={menu} />
        {isLoadBanner ? (
          <Block color="transparent" style={{height: hp(23)}} center middle>
            <ActivityIndicator color={light.secondary} size="large" />
          </Block>
        ) : (
          <Banner data={bannerData} />
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
    </Block>
  );
};
export default Dashboard;
