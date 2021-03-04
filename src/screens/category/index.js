import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Banner from '../../common/banner';
import Cards from '../../common/cards';
import Footer from '../../common/footer';
import Header from '../../common/header';
import {Block, Button, Text} from '../../components';
import Search from '../../components/search';
import {t1, t2, w2, w3} from '../../components/theme/fontsize';
import RNPickerSelect from 'react-native-picker-select';
import HeaderMenu from '../../common/headerMenu';
import {useDispatch, useSelector} from 'react-redux';
import {filterCategoryListRequest} from '../../redux/action';
import {strictValidArray} from '../../utils/commonUtils';
import {light} from '../../components/theme/colors';

const Category = (props) => {
  const dispatch = useDispatch();
  const saveFiltered = useSelector((state) => state.category.filterIds.id);
  const filteredData = useSelector(
    (state) => state.category.filterList.data.items,
  );
  const loading = useSelector((state) => state.category.filterList.loading);
  const category = useSelector(
    (state) => state.category.categoryList.data.children_data,
  );
  const [menu, setmenu] = useState(saveFiltered.id);
  const [name, setname] = useState(saveFiltered.name);
  const sortingMenu = (val) => {
    setmenu(val.id);
    setname(val.name);
  };
  useEffect(() => {
    dispatch(filterCategoryListRequest(menu));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);
  useEffect(() => {
    if (!menu) {
      setmenu(category[0].id);
      setname(category[0].name);
    }
  }, [category]);
  return (
    <Block>
      <Header />
      <Block flex={false} padding={[0, w3, 0, w3]}>
        <Search />
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderMenu onPress={sortingMenu} color={menu} />
        <Banner />
        <Block
          center
          row
          space={'between'}
          margin={[0, w2, 0, w2]}
          flex={false}>
          <Text semibold size={15}>
            {name || ''}
          </Text>
          <ShopByButton color="secondary">Shop by</ShopByButton>
        </Block>
        <Block
          margin={[t2, w2, 0, w2]}
          borderWidth={0.5}
          primary
          row
          center
          space={'between'}
          flex={false}
          padding={[t1, w3]}>
          {filteredData && (
            <Text size={12}>{filteredData && filteredData.length} items</Text>
          )}
          <Block center flex={false} row>
            {/* <Text size={12}>sort by </Text>
            <RNPickerSelect
              placeholder={{
                label: 'position',
                value: '',
              }}
              useNativeAndroidPickerStyle={false}
              style={dropdownStyle}
              // value={values.type}
              // onValueChange={(value) => console.log(value)}
              mode="dropdown"
              items={[
                {label: 'test', value: 'low'},
                {label: 'test', value: 'medium'},
                {label: 'test', value: 'higher'},
              ]}
            /> */}
          </Block>
        </Block>
        {loading ? (
          <Block color="transparent" style={{height: hp(30)}} center middle>
            <ActivityIndicator color={light.secondary} size="large" />
          </Block>
        ) : (
          <Cards data={strictValidArray(filteredData) && filteredData} />
        )}

        <Footer images={false} />
      </ScrollView>
    </Block>
  );
};
const ShopByButton = styled(Button)({
  marginVertical: 0,
  paddingVertical: hp(1),
  paddingHorizontal: widthPercentageToDP(2),
});
const dropdownStyle = {
  placeholder: {
    color: '#000000',
    fontSize: 10,
  },
  inputIOS: {
    paddingLeft: widthPercentageToDP(2),
    paddingRight: widthPercentageToDP(2),
    paddingVertical: hp(0.5),
    borderColor: '#000',
    color: '#000',
    borderWidth: 0.4,
    borderRadius: 5,
  },
  inputAndroid: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: hp(1),
    borderColor: '#323643',
    color: '#000',
    borderWidth: 0.6,
    borderRadius: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
  },
  viewContainer: {
    // marginTop: hp(1),
  },
};
export default Category;
