import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {Text, Block} from '.';
import Icon from 'react-native-vector-icons/Ionicons';
import {t1, t2, t5, w3, w5} from './theme/fontsize';
import {useNavigation} from '@react-navigation/native';
import useDebounce from './debounce';
import AsyncStorage from '@react-native-community/async-storage';
import {config} from '../utils/config';
import ImageComponent from './ImageComponent';
import {useSelector} from 'react-redux';
import {
  strictValidArrayWithLength,
  strictValidStringWithMinLength,
} from '../utils/commonUtils';
import CustomButton from './CustomButton';
import {navigate} from '../routes/NavigationService';
import {light} from './theme/colors';
const Search = ({placeholder}) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const debouncedSearchTerm = useDebounce(text, 500);
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);
  const [load, setload] = useState(true);
  const currency = useSelector(
    (state) => state.currency.currencyDetail.data.base_currency_code,
  );

  const searchCharacters = async (search) => {
    // const token = await AsyncStorage.getItem('token');
    const newToken = '5q0h1829ixf2vdm57k6g3qtzd88wkvr2';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + newToken,
    };
    return fetch(
      `${config.Api_Url}/V1/products?searchCriteria[filter_groups][1][filters][0][field]=status&searchCriteria[filter_groups][1][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%25${search}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`,
      {
        method: 'get',
        headers: headers,
      },
    )
      .then((r) => r.json())
      .then((r) => r.items)
      .catch((error) => {
        console.error(error);
        return [];
      });
  };
  console.log(results);
  const searchCourses = () => {
    setIsSearching(true);
    // Fire off our API call
    searchCharacters(debouncedSearchTerm).then((results) => {
      // Set back to false since request finished
      setIsSearching(false);
      // Set results state
      setResults(results);
      setload(false);
    });
  };
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        searchCourses();
      } else {
        setResults([]);
        setload(true);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );

  // useEffect(() => {
  //   searchCourses();
  // }, []);

  const renderEmpty = () => {
    return (
      <Block padding={[hp(8)]} center middle flex={false}>
        <Text semibold size={18} height={40}>
          No matching products
        </Text>
        <Text size={15} height={20}>
          Try a different search
        </Text>
      </Block>
    );
  };

  const navigateItems = (item) => {
    const special_price = item.custom_attributes.find(
      (v) => v.attribute_code === 'special_price',
    );
    const getImage = item.media_gallery_entries.find(
      (image) => image.media_type === 'image',
    );
    const price = special_price
      ? Math.ceil(special_price.value).toFixed(2)
      : item.price;
    const data = {
      qty: 1,
      name: item.name,
      image: getImage && getImage.file,
      sliderImages: item.media_gallery_entries,
      currency_code: currency || 'BDT',
      price_info: item.price,
      specialPrice: price,
      sku: item.sku,
      id: item.id,
    };
    navigation.navigate('Details', {
      item: data,
    });
  };

  return (
    <>
      <Block
        flex={false}
        center
        row
        white
        border={[10, 10, 10, 10]}
        margin={[hp(1), wp(1)]}
        padding={[hp(0.3), 20, hp(0.3), wp(4)]}>
        <Icon name="ios-search-outline" size={30} color={'grey'} />
        <Input
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="grey"
          value={text}
          onChangeText={setText}
        />
      </Block>

      {isSearching ? (
        <Block center middle flex={false} style={{height: hp(30)}}>
          <ActivityIndicator color={light.secondary} size="large" />
        </Block>
      ) : strictValidArrayWithLength(results) ? (
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={!load && renderEmpty}
          style={
            strictValidArrayWithLength(results)
              ? {height: hp(40), marginVertical: t1}
              : {height: 0}
          }
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index}) => {
            const special_price = item.custom_attributes.find(
              (v) => v.attribute_code === 'special_price',
            );
            const getImage = item.media_gallery_entries.find(
              (image) => image.media_type === 'image',
            );
            const price = special_price
              ? Math.ceil(special_price.value).toFixed(2)
              : item.price;
            return (
              <CustomButton
                onPress={() => navigateItems(item)}
                center
                primary
                row
                padding={[t2]}
                flex={false}>
                {getImage && (
                  <ImageComponent
                    isURL
                    name={`${config.Image_Url}${getImage.file}`}
                    height="60"
                    width="60"
                  />
                )}
                <Block margin={[0, w5]} flex={false}>
                  <Text style={{width: wp(70)}} semibold size={14}>
                    {item.name}
                  </Text>
                  <Text margin={[hp(0.5), 0]} grey size={12}>
                    be the first to review this product
                  </Text>
                  <Text semibold size={14}>
                    {currency || 'BDT'} {price}
                  </Text>
                </Block>
              </CustomButton>
            );
          }}
        />
      ) : (
        <>
          {strictValidStringWithMinLength(debouncedSearchTerm) && renderEmpty()}
        </>
      )}
    </>
  );
};
Search.propTypes = {
  placeholder: PropTypes.string,
};
Search.defaultProps = {
  placeholder: 'what are you looking for ?',
};
const Input = styled.TextInput({
  marginLeft: wp(3),
  fontSize: 16,
  color: 'grey',
});
export default Search;
