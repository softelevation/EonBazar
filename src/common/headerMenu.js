import React from 'react';
import { FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { images } from '../assets';
import { Block, CustomButton, ImageComponent, Text } from '../components';
import { light } from '../components/theme/colors';
import { t1, w3 } from '../components/theme/fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
const HeaderMenu = ({ color, onPress }) => {
  const category = useSelector(
    (state) => state.category.categoryList.data.children_data,
  );
  const _renderItem = ({ item }) => {
    return (
      item.is_active ?
        <CustomButton
          center
          margin={[hp(1), wp(1)]}
          style={{ width: wp(20) }}
          onPress={() => onPress(item)}>
          <Block
            color={color === item.id ? light.warning : light.secondary}
            flex={false}
            borderRadius={60}
            center
            middle
            margin={[0, w3]}
            style={{ height: 40, width: 40 }}>
            {item.image ? (
              <ImageComponent
                isURL
                name={`http://stage.eonbazar.com/${item.image}`}
                height="30"
                width="30"
              />
            ) : (
              <Icon name="bookmark-outline" size={22} color="#fff" />
            )}
          </Block>
          <Text
            center
            margin={[hp(0.5), 0, 0, 0]}
            height={16}
            transform="uppercase"
            size={10}>
            {item.name}
          </Text>
        </CustomButton>
        : null
    );
  };
  return (
    <Block white margin={[0, w3]} padding={[hp(0.5), 0]} flex={false}>
      <FlatList
        contentContainerStyle={flatlistStyle}
        data={category}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={_renderItem}
      />
    </Block>
  );
};
const flatlistStyle = {
  flexDirection: 'row',
};
export default HeaderMenu;
