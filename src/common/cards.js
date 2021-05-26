import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { Block, Text, ImageComponent, CustomButton } from '../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  strictValidArray,
  strictValidArrayWithLength,
  strictValidObjectWithKeys,
} from '../utils/commonUtils';
import {
  addToCartRequest,
  addToGuestCartRequest,
  updateWishlistRequest,
} from '../redux/action';
import { config } from '../utils/config';
import { light } from '../components/theme/colors';
import Toast from './toast';
const Cards = ({ data, maxHeight }) => {
  const nav = useNavigation();
  const [products, setData] = useState([]);
  const quote_id = useSelector((state) => state.cart.cartId.id);
  const userProfile = useSelector((state) => state.user.profile.user);
  const errorCartLoad = useSelector((state) => state.cart.save.error);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );
  const guestCartToken = useSelector((v) => v.cart.guestcartId.id);
  const guestCartError = useSelector((v) => v.cart.guestsave.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const newData = [];
    data &&
      data.map((a) => {
        const special_price = a.custom_attributes.find(
          (v) => v.attribute_code === 'special_price',
        );
        const getImage = a.media_gallery_entries.find(
          (image) =>
            image.media_type === 'image' &&
            strictValidArrayWithLength(image.types),
        );
        newData.push({
          qty: 1,
          name: a.name,
          image: getImage && getImage.file,
          sliderImages: a.media_gallery_entries,
          currency_code: currency || 'BDT',
          price_info: a.price,
          specialPrice: special_price
            ? Math.ceil(special_price.value).toFixed(2)
            : a.price,
          isLoad: false,
          isWishlist: false,
          sku: a.sku,
          id: a.id,
        });
      });
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, errorCartLoad, guestCartError]);

  const addToCart = async (val, index) => {
    if (strictValidObjectWithKeys(userProfile)) {
      const old = products[index];
      const updated = { ...old, isLoad: true };
      const clone = [...products];
      clone[index] = updated;
      setData(clone);

      // setTimeout(() => {
      //   const old = products[index];
      //   const updated = {...old, isLoad: false};
      //   const clone = [...products];
      //   clone[index] = updated;
      //   setData(clone);
      // }, 5000);

      const newData = {
        sku: val.sku,
        qty: val.qty,
        quote_id: quote_id,
      };
      await dispatch(addToCartRequest(newData));
    } else {
      const old = products[index];
      const updated = { ...old, isLoad: true };
      const clone = [...products];
      clone[index] = updated;
      setData(clone);

      // setTimeout(() => {
      //   const old = products[index];
      //   const updated = {...old, isLoad: false};
      //   const clone = [...products];
      //   clone[index] = updated;
      //   setData(clone);
      // }, 5000);

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
  const addToWishlist = async (val, index) => {
    if (strictValidObjectWithKeys(userProfile)) {
      const old = products[index];
      const updated = { ...old, isWishlist: true };
      const clone = [...products];
      clone[index] = updated;
      setData(clone);
      const id = val.id;
      await dispatch(updateWishlistRequest(id));
    } else {
      nav.reset({
        routes: [{ name: 'Login' }],
      });
      // Alert.alert('Error', 'Please login First');
    }
  };

  const updateQty = (qty, index) => {
    const old = products[index];
    const updated = { ...old, qty: qty };
    const clone = [...products];
    clone[index] = updated;
    setData(clone);
  };

  const _renderEmpty = () => {
    return (
      <Block style={{ height: hp(40) }} center middle>
        <Text size={16}>Products Not Found</Text>
      </Block>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <CustomButton
        activeOpacity={1}
        style={{ width: wp(45) }}
        padding={[hp(2)]}
        margin={[hp(0.5), wp(1.8)]}
        primary
        flex={false}>
        {item.isWishlist ? (
          <ActivityIndicator
            size="small"
            color={light.secondary}
            style={{ alignSelf: 'flex-start' }}
          />
        ) : (
          <TouchableOpacity onPress={() => addToWishlist(item, index)}>
            {
              item.isWishlist ?
                <Icon name="ios-heart" color={'red'} size={15} />
                : <Icon name="ios-heart-outline" size={15} />
            }

          </TouchableOpacity>
        )}
        <Icon name="ios-shuffle" size={15} />
        <CustomButton
          activeOpacity={1}
          onPress={() =>
            nav.navigate('Details', {
              item: item,
            })
          }
          margin={[hp(1), 0, 0, 0]}
          center
          flex={false}>
          <ImageComponent name={`${config.Image_Url}${item.image}`} isURL />
          <Text
            numberOfLines={1}
            size={12}
            center
            margin={[hp(2), 0, 0, 0]}
            body>
            {item.name}
          </Text>
          <Text size={12} body margin={[hp(1), 0, 0, 0]} semibold>
            {item.currency_code} {item.price_info}
          </Text>
          {/* {item.price_info !== item.specialPrice && (
            <LineAboveText
              body
              size={12}
              color="grey"
              margin={[hp(0.2), 0, 0, 0]}>
              {item.currency_code} {item.price_info}
            </LineAboveText>
          )} */}
        </CustomButton>
        <Block
          margin={[hp(1), 0, 0, 0]}
          center
          row
          space={'between'}
          flex={false}>
          <Block
            style={{ width: wp(18) }}
            center
            row
            space={'between'}
            borderWidth={1}
            borderRadius={10}
            padding={[hp(0.5)]}
            borderColorDeafult
            flex={false}>
            <TouchableOpacity
              disabled={item.qty === 1}
              onPress={() => updateQty(item.qty - 1, index)}>
              <Icon name="ios-remove-outline" size={20} />
            </TouchableOpacity>

            <Text size={12}>{item.qty}</Text>
            <Icon
              onPress={() => updateQty(item.qty + 1, index)}
              name="add"
              size={20}
            />
          </Block>
          <CustomButton
            onPress={() => addToCart(item, index)}
            secondary
            padding={[hp(1)]}
            borderRadius={20}
            center
            middle
            flex={false}>
            {/* {item.isLoad ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : ( */}
            <MaterialIcon name="shopping-bag" size={20} color="#fff" />
            {/* )} */}
          </CustomButton>
        </Block>
      </CustomButton>
    );
  };
  return (
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={flatlistContentStyle}
      data={products && products}
      renderItem={renderItem}
      onEndReachedThreshold={0}
      ListEmptyComponent={_renderEmpty}
      maxHeight={maxHeight}
    />
  );
};
const LineAboveText = styled(Text)({
  textDecorationLine: 'line-through',
  textDecorationStyle: 'solid',
});
const flatlistContentStyle = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  paddingTop: hp(2),
  flexGrow: 1,
};
export default Cards;
