/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
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
import { t1, t2, w2, w3, w4 } from '../../../components/theme/fontsize';
import StarRating from 'react-native-star-rating';
import Footer from '../../../common/footer';
import { useDispatch, useSelector } from 'react-redux';
import { removeWishlistRequest, addToCartRequest, addToGuestCartRequest, wishlistRequest } from '../../../redux/action';
import ActivityLoader from '../../../components/activityLoader';
import { config } from '../../../utils/config';
import { light } from '../../../components/theme/colors';
import ResponsiveImage from 'react-native-responsive-image';
import { images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { strictValidObjectWithKeys } from '../../../utils/commonUtils';

const Wishlist = () => {
  const nav = useNavigation();
  const [wishlistData, setData] = useState([]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list.data);
  const quote_id = useSelector((state) => state.cart.cartId.id);

  const isLoad = useSelector((state) => state.wishlist.list.loading);
  const userProfile = useSelector((state) => state.user.profile.user);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );
  useEffect(() => {
    dispatch(wishlistRequest());
  }, []);

  useEffect(() => {
    const newData = [];
    wishlist &&
      wishlist.map((a) => {
        console.log(a, 'A');
        const { name, special_price, price, thumbnail } = a && a.product;
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
    const updated = { ...old, isLoad: true };
    const clone = [...wishlistData];
    clone[index] = updated;
    setData(clone);
    dispatch(removeWishlistRequest(id));
  };
  const addToCart = async (val, index) => {
    if (strictValidObjectWithKeys(userProfile)) {
      const old = wishlistData[index];
      const updated = { ...old, isAddtoCart: true };
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
      const updated = { ...old, isAddtoCart: true };
      const clone = [...wishlistData];
      clone[index] = updated;
      setData(clone);
      const newData = {
        sku: val.sku,
        qty: val.qty,
        quote_id: guestCartToken,
      };

      await dispatch(
        addToGuestCartRequest({ token: guestCartToken, items: newData }),
      );
    }
  };

  const _renderItem = ({ item, index }) => {
    const { name, special_price, price, image, currency_code } = item;
    return (
      <CustomButton
        onPress={() =>
          nav.navigate('Details', {
            item: item,
          })
        }
        row
        white
        padding={[t1, t1, 0, t1]}
        margin={[t1, 0]}
        flex={false}>
        <Block row padding={[t1, 0]}>
          <ImageComponent
            isURL
            name={`${config.Image_Url}${image}`}
            height="100"
            width="100"
          />
          <Block margin={[t1, w4]}>
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
                containerStyle={{ width: wp(20) }}
              />
              
            </Block>
            {/* <CustomButton
              onPress={() => addToCart(item, index)}
              secondary
              padding={[hp(1)]}
              borderRadius={20}
              center
              middle
              flex={false}>
              {item.isAddtoCart ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <MaterialIcon name="shopping-bag" size={20} color="#fff" />
              )}
            </CustomButton> */}
          </Block>
          <Block flex={false}>
            {item.isLoad ? (
              <ActivityIndicator
                size="small"
                color={light.secondary}
                style={{ alignSelf: 'flex-end' }}
              />
            ) : (
              <CustomButton
                onPress={() => removeItem(item.id, index)}
                flex={false}
                style={{ height: 20, width: 20 }}
                center
                middle
                secondary>
                <ResponsiveImage
                  source={images.close_icon}
                  initHeight="15"
                  initWidth="15"
                  style={{ tintColor: '#fff' }}
                />
              </CustomButton>
            )}
              <CustomButton
            onPress={() => addToCart(item, index)}
            secondary
            style={{ marginTop:40,marginRight:30 }}
            padding={[hp(1)]}
            borderRadius={20}
            center
            right
            flex={false}>
            {item.isAddtoCart ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <MaterialIcon name="shopping-bag" size={20} color="#fff" />
            )}
          </CustomButton>
            <Block alignSelf="center" middle margin={[-hp(2), 0, 0, 0]}>
              <ImageComponent
                name="right_arrow_icon"
                height="10"
                width="10"
                color="#707070"
              />
            </Block>
          </Block>
        </Block>
      </CustomButton>
    );
  };
  const _renderEmpty = () => {
    return (
      <Block style={{ height: hp(20) }} center middle>
        <Text size={14}>You have no items in your wish list.</Text>
      </Block>
    );
  };
  return (
    <Block>
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
              height="15"
              width="17"
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
          />
          <Button
            onPress={() => nav.navigate('Dashboard')}
            style={{ marginTop: t2 }}
            color="secondary">
            Continue Shopping
          </Button>
        </Block>
        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
const LineAboveText = styled(Text)({
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
});
export default Wishlist;
