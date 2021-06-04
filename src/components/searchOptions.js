import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {ActivityIndicator, FlatList, Platform, ScrollView} from 'react-native';
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
  strictValidString,
  strictValidStringWithMinLength,
} from '../utils/commonUtils';
import CustomButton from './CustomButton';
import _ from 'lodash';
import {light} from './theme/colors';

const SearchOptions = ({placeholder, data, setResults, results}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [districts, setDistrictCity] = useState();
  const [searchText, setSearchText] = useState(results || '');

  useEffect(() => {
    setDistrictCity(data);
    if (strictValidString(searchText)) {
      prepareServiceList(searchText);
    }
  }, [data, results]);

  useEffect(() => {
    setDistrictCity(data);
    setSearchText(results);
  }, [results]);

  const contains = ({name}, query) => {
    const formattedTitle = name.toLowerCase();
    if (formattedTitle.startsWith(query)) {
      return true;
    }
    return false;
  };

  const prepareServiceList = (s) => {
    const formattedQuery = s.toLowerCase();
    const filteredData = _.filter(data, (displayTitle) => {
      return contains(displayTitle, formattedQuery);
    });
    setDistrictCity(filteredData);
    setSearchText(s);
  };

  const renderEmpty = () => {
    return (
      <Block padding={[hp(2)]} center middle flex={false}>
        <Text size={15} height={20}>
          Try a different search
        </Text>
      </Block>
    );
  };

  const navigateItems = (item) => {
    setSearchText(item.name);
    setResults(item);
    setIsSearching(false);
    console.log(item, 'item');
  };

  return (
    <>
      <CustomButton
        activeOpacity={1}
        flex={false}
        center
        row
        white
        border={[10, 10, 10, 10]}
        borderWidth={1}
        borderColorDeafult
        margin={[hp(1), 0, 0]}
        padding={Platform.OS === 'ios' ? [hp(1), wp(0.3)] : [hp(0.5), wp(0.3)]}>
        <Input
          onFocus={() => setIsSearching(true)}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="grey"
          value={searchText}
          style={{width: '95%', fontSize: 14}}
          onChangeText={(a) => prepareServiceList(a)}
        />
      </CustomButton>

      {isSearching && strictValidArrayWithLength(districts) && (
        <FlatList
          data={districts}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={renderEmpty}
          contentContainerStyle={{flexGrow: 1}}
          // getItemLayout={(data, index) => ({
          //   length: 30,
          //   offset: 30 * index,
          //   index,
          // })}
          renderItem={({item, index}) => {
            return (
              <CustomButton
                onPress={() => navigateItems(item)}
                center
                primary
                row
                borderWidth={1}
                borderColorDeafult
                padding={[hp(1), wp(3)]}
                margin={[hp(1), 0, 0]}
                flex={false}>
                <Text style={{width: wp(70)}} semibold size={14}>
                  {item.name}
                </Text>
              </CustomButton>
            );
          }}
        />
      )}
    </>
  );
};
SearchOptions.propTypes = {
  placeholder: PropTypes.string,
};
SearchOptions.defaultProps = {
  placeholder: 'what are you looking for ?',
};
const Input = styled.TextInput({
  marginLeft: wp(3),
  fontSize: 16,
  color: 'grey',
});
export default SearchOptions;
