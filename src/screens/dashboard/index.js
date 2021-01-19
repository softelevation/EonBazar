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
  filterIdRequest,
  getAllProductsRequest,
  getCategoryListRequest,
  GuestCartIDRequest,
  guestCartRequest,
} from '../../redux/action';
import {strictValidArrayWithLength} from '../../utils/commonUtils';
import ActivityLoader from '../../components/activityLoader';
import {w3} from '../../components/theme/fontsize';
import {useNavigation} from '@react-navigation/native';
import {light} from '../../components/theme/colors';
import AsyncStorage from '@react-native-community/async-storage';
const Dashboard = () => {
  const navigation = useNavigation();
  const [menu, setmenu] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const productsData = useSelector((v) => v.category.productList.data);
  const isLoad = useSelector((v) => v.category.productList.loading);

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
        <Banner />
        <Block padding={[0, wp(1)]} flex={false}>
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
              value={currentPage}
              setValue={(val) => setCurrentPage(val)}
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
